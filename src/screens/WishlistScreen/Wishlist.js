import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { Container } from '../../components';
import { SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import images from '../../index';
import { RouteName } from '../../routes';

const Wishlist = ({ navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const storedWishlist = await AsyncStorage.getItem('wishlist');
            const wishlistItems = storedWishlist ? JSON.parse(storedWishlist) : [];
            console.log("storedWishlist:", storedWishlist);
            console.log("parsed wishlistItems:", wishlistItems);
            fetchSongsDetails(wishlistItems);
        } catch (error) {
            console.error('Error fetching wishlist from AsyncStorage:', error);
        }
    };

    const fetchSongsDetails = async (wishlistItems) => {
        try {
            const songDetailsPromises = wishlistItems.map(async (itemId) => {
                const response = await axios.get(`https://chitraguptp85.sg-host.com/wp-json/meditate/v2/song?song_id=${itemId}`);
                console.log('response.data for item:', itemId, response.data);
                return response.data[0]; // Since response.data is an array, access the first item
            });

            const songsDetails = await Promise.all(songDetailsPromises);

            const formattedSongs = songsDetails.map(song => ({
                id: song.id,
                title: song.title,
                url: song.song?.add_new || null,
                thumbnail: song.song?.thumbnail_image || null,
                artist: {
                    image: song.artist?.image || null,
                    title: song.artist?.title || 'Unknown Artist',
                    description: song.artist?.description ? song.artist.description.replace(/<\/?[^>]+(>|$)/g, "") : null,
                }
            })).filter(track => track.url);

            console.log("formattedSongs:", formattedSongs);
            setWishlist(formattedSongs);
        } catch (error) {
            console.error('Error fetching song details:', error);
        }
    };

    const removeItemFromWishlist = async (id) => {
        try {
            const updatedWishlist = wishlist.filter(item => item.id !== id);
            setWishlist(updatedWishlist);
            const updatedWishlistIds = updatedWishlist.map(item => item.id);
            await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlistIds));
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    useEffect(() => {
        console.log("wishlist:__________", wishlist);
    }, [wishlist]);

    const onTagPressHandle = (track) => {
        navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN, { track });
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
            color: Colors.btn_color,
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
            borderBottomWidth: 1,
            borderBottomColor: '#313131',
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
            color: Colors.btn_color,
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
            backgroundColor: Colors.theme_backgound,
            justifyContent: 'flex-start',
            width: '100%',
            paddingVertical: 10,
            paddingTop: 10,
            paddingHorizontal: 20,
        },
        backArrow: {
            width: SH(20),
            tintColor: '#fff',
            height: SH(20),
            marginRight: SW(10),
            marginTop: 5,
        },
        headerTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        thumbnail: {
            width: 50,
            height: 50,
            borderRadius: 10,
            marginRight: 10,
        },
        trackInfo: {
            flex: 1,
        },
        trackTitle: {
            fontSize: SF(16),
            fontWeight: 'bold',
            color: Colors.theme_backgound,
        },
        trackArtist: {
            fontSize: SF(14),
            color: Colors.theme_backgound,
        },
        emptyMessage: {
            fontSize: SF(18),
            color: Colors.white,
            textAlign: 'center',
            marginTop: SH(20),
        },
    }), [Colors]);

    return (
        <Container>
            <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.backArrow} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('Wishlist')}</Text>
                </View>
                <View style={styles.container}>
                    {wishlist?.length === 0 ? (
                        <Text style={styles.emptyMessage}>{t('No items added in wishlist')}</Text>
                    ) : (
                        <FlatList
                            data={wishlist}
                            keyExtractor={(item) => item?.id?.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.wishlistItem} onPress={() => onTagPressHandle(item)}>
                                    <Image source={item.thumbnail ? { uri: item.thumbnail } : images.dummyImage} style={styles.thumbnail} />
                                    <View style={styles.trackInfo}>
                                        <Text style={styles.trackTitle}>{item.title}</Text>
                                        <Text style={styles.trackArtist}>{item.artist?.title || 'Unknown Artist'}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => removeItemFromWishlist(item.id)} style={styles.removeButton}>
                                        <Text style={styles.removeButtonText}>{t("Remove")}</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )}
                            style={styles.list}
                        />
                    )}
                </View>
            </ImageBackground>
        </Container>
    );
};

export default Wishlist;
