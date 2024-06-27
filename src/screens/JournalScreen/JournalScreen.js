import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from '../../components';
import images from '../../images';
import { VectoreIcons } from '../../components';

const TodoScreen = () => {
    const [todoEntry, setTodoEntry] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todoEntries');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
                
        console.log("todoEntries:-",storedTodos);
            }
        } catch (error) {
            console.error('Failed to load todos.', error);
        }
    };

    const saveTodo = async () => {
        try {
            const newTodo = { text: todoEntry, date: new Date().toLocaleDateString() };
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);
            await AsyncStorage.setItem('todoEntries', JSON.stringify(newTodos));
            setTodoEntry('');
        } catch (error) {
            console.error('Failed to save the todo.', error);
        }
    };

    const deleteTodo = async (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        await AsyncStorage.setItem('todoEntries', JSON.stringify(newTodos));
    };

    const renderTodoItem = ({ item, index }) => (
        <View style={styles.entryItem}>
            <View style={{ width: '90%' }}>
                <Text style={styles.entryText}>{item.text}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteTodo(index)}>
                <VectoreIcons icon="MaterialCommunityIcons" name="trash-can-outline" color="#f79f80" size={20} />
            </TouchableOpacity>
        </View>
    );

    return (
        <Container>
            <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
                    <FlatList
                        data={todos}
                        renderItem={renderTodoItem}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={styles.list}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a journal..."
                            value={todoEntry}
                            onChangeText={setTodoEntry}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={saveTodo}>
                            <Text style={styles.addButtonText}>Add a Journal</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    list: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    inputContainer: {
        padding: 20,
        paddingBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#f79f80',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    entryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        backgroundColor: 'rgba(217, 217, 214, 0.2)',
        borderRadius: 5,
        marginBottom: 10,
    },
    entryText: {
        fontSize: 16,
    },
    dateText: {
        fontSize: 12,
        color: '#888',
    },
});

export default TodoScreen;
