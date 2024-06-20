import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { SH, SW } from '../../utils';
import { Button, Container, Spacing, Input } from '../../components';
import images from '../../index';
import { Authentication } from '../../styles';

const AboutUsScreen = ({ route, navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const { singer, singerImage } = route.params; // Assume singerImage is also passed in route params
    const Authentications = useMemo(() => Authentication(Colors), [Colors]);

    return (
        <Container>
            <ImageBackground source={images.background1} resizeMode='cover' style={Authentications.setbgMainView}>
                <View style={styles.overlay} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.backArrow} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: Colors.white }]}>{t("About Us")}</Text>
                </View>
                <View style={styles.container}>
                    <Image source={images.honey} style={styles.singerImage} resizeMode="contain" />
                    <Text style={[styles.singerName, { color: Colors.white }]}>{singer}</Text>
                    <Text style={[styles.description, { color: Colors.white }]}>
                        {t("Hirdesh Singh, known professionally as Yo Yo Honey Singh, or simply Honey Singh, is an Indian rapper, singer, music producer and actor. He started in 2003 as a session and recording artist, and became a bhangra, hip hop, and Punjabi music producer. ")}
                    </Text>
                </View>
            </ImageBackground>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SW(20),
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(20),
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    backArrow: {
        width: SH(20),
        height: SH(20),
        marginRight: SW(10),
    },
    title: {
        fontSize: SH(24),
        fontWeight: 'bold',
    },
    singerImage: {
        width: SW(200),
        height: SW(200),
        borderRadius: 10,
        marginBottom: SH(20),
    },
    singerName: {
        fontSize: SH(20),
        marginBottom: SH(10),
        fontWeight: 'bold'
    },
    description: {
        fontSize: SH(16),
        textAlign: 'justify'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
});

export default AboutUsScreen;
