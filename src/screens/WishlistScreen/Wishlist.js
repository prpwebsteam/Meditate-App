import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { Container } from '../../components';
import { SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../index';

const Wishlist = ({ navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const [wishlist, setWishlist] = useState([
        { id: 1, name: 'Dummy Song 1' },
        { id: 2, name: 'Dummy Song 2' },
        { id: 3, name: 'Dummy Song 3' }
    ]);
    const [item, setItem] = useState('');

    const addItemToWishlist = () => {
        if (item) {
            const newItem = { id: wishlist.length + 1, name: item };
            setWishlist([...wishlist, newItem]);
            setItem('');
        }
    };

    const removeItemFromWishlist = (id) => {
        const newWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(newWishlist);
    };

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: SW(20),
            paddingVertical: SW(10),
            alignItems: 'center',
        },
        title: {
            fontSize: SF(24),
            fontWeight: 'bold',
            color: Colors.white,
        },
        input: {
            height: SH(40),
            borderColor: Colors.border,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: SH(20),
            color: Colors.text,
            backgroundColor: Colors.card,
            width: '100%',
        },
        addButton: {
            backgroundColor: Colors.primary,
            paddingVertical: SH(10),
            borderRadius: 5,
            marginBottom: SH(20),
            alignItems: 'center',
            width: '100%',
        },
        addButtonText: {
            color: Colors.white,
            fontSize: SF(16),
        },
        list: {
            width: '100%',
        },
        wishlistItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: SH(10),
            backgroundColor: Colors.card,
            borderRadius: 5,
            marginBottom: SH(10),
        },
        itemText: {
            fontSize: SF(16),
            fontWeight: 'bold',
            color: Colors.theme_backgound,
        },
        removeButton: {
            backgroundColor: Colors.theme_backgound,
            paddingVertical: SH(5),
            paddingHorizontal: 10,
            borderRadius: 5,
        },
        removeButtonText: {
            color: Colors.white,
            fontSize: SF(14),
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
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            paddingHorizontal: 10,
            marginBottom: SH(30),
        },
        backArrow: {
            width: SH(20),
            height: SH(20),
            marginRight: SW(10),
            marginTop: 5
        },
        headerTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    }), [Colors]);

    return (
        <Container>
            <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={images.backArrow} style={styles.backArrow} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{t('Wishlist')}</Text>
                    </View>
                    <FlatList
                        data={wishlist}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.wishlistItem}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <TouchableOpacity onPress={() => removeItemFromWishlist(item.id)} style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>{t("Remove")}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        style={styles.list}
                    />
                </View>
            </ImageBackground>
        </Container>
    );
};

export default Wishlist;
