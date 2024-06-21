import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BottomTabMenu, Container, Spacing, WorkOutView } from '../../components';
import axios from 'axios';
import { ImageBackground, TouchableOpacity } from 'react-native';
import images from '../../index';
import { SH, SW } from '../../utils';
import { RouteName } from '../../routes';

const AllCategoryScreen = ({ navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const [workoutData, setWorkoutData] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/categories');
            if (response.status === 200) {
                setWorkoutData(response.data.map((category) => ({
                    id: category.id.toString(),
                    title: category.name,
                    imageUrl: category.thumbnail,
                    description: category.description,
                })));
            } else {
                console.error('Failed to fetch categories. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onpressHandle = (id, title) => {
        navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN, { categoryId: id, categoryName: title });
    };

    const styles = useMemo(() =>
        StyleSheet.create({
            backgroundImage: {
                flex: 1,
                width: '100%',
                height: '100%',
            },
            overlay: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            header: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.theme_backgound,
                paddingVertical: 10,
                paddingTop: 10,
                paddingHorizontal: 20,
            },
            backArrow: {
                width: SH(20),
                height: SH(20),
                marginTop: 3,
                marginRight: SW(10),
            },
            title: {
                fontSize: SH(24),
                color: Colors.white,
            },
            container: {
                flex: 1,
                padding: 20,
            },
        }), [Colors]);

    return (
        <Container>
            <ImageBackground source={images.background1} style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <BottomTabMenu selected={0} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.backArrow} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t("All Categories")}</Text>
                </View>
                <Spacing space={20} />
                <View style={styles.container}>
                    <FlatList
                        data={workoutData}
                        renderItem={({ item }) => (
                            <WorkOutView
                                onPress={() => onpressHandle(item.id, item.title)}
                                item={item}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal={false}
                        numColumns={2}
                    />
                </View>
            </ImageBackground>
        </Container>
    );
};

export default AllCategoryScreen;
