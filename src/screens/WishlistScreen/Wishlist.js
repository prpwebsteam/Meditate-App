import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { Container } from '../../components';
import { SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import images from '../../index';

const Wishlist = ({ navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const [wishlist, setWishlist] = useState([]);
    const [item, setItem] = useState('');

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const userId = 9;
            const url = `https://chitraguptp85.sg-host.com/wp-json/meditate/v2/wishlist?user_id=${userId}`;
            console.log(`Fetching songs from URL: ${url}`);

            const response = await axios.get(url);

            if (response.status === 200 && Array.isArray(response.data)) {
                const tracks = response.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    url: item.song?.add_new || null,
                    thumbnail: item.song?.thumbnail_image || null,
                    artist: {
                        image: item.artist?.image || null,
                        title: item.artist?.title || null,
                        description: item.artist?.description ? item.artist.description.replace(/<\/?[^>]+(>|$)/g, "") : null,
                    }
                })).filter(track => track.url);

                setWishlist(tracks);
            } else {
                console.error('Failed to fetch songs or invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const removeItemFromWishlist = async (id) => {
        try {
            const response = await axios.put('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/wishlist', null, {
                params: {
                    user_id: 9,
                    song_id: id,
                },
            });

            if (response.status === 200) {
                setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== id));
            } else {
                console.error('Failed to remove track from wishlist. Response status:', response.status, 'Response data:', response.data);
            }
        } catch (error) {
            console.error('Error removing track from wishlist:', error);
        }
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
            tintColor: '#794619',
            height: SH(20),
            marginRight: SW(10),
            marginTop: 5
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
                    {wishlist.length === 0 ? (
                        <Text style={styles.emptyMessage}>{t('No items added in wishlist')}</Text>
                    ) : (
                        <FlatList
                            data={wishlist}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.wishlistItem}>
                                    <Image source={item.thumbnail ? { uri: item.thumbnail } : images.dummyImage} style={styles.thumbnail} />
                                    <View style={styles.trackInfo}>
                                        <Text style={styles.trackTitle}>{item.title}</Text>
                                        <Text style={styles.trackArtist}>{item.artist?.title || 'Unknown Artist'}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => removeItemFromWishlist(item.id)} style={styles.removeButton}>
                                        <Text style={styles.removeButtonText}>{t("Remove")}</Text>
                                    </TouchableOpacity>
                                </View>
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
