import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { Colors, SH, SW } from '../../utils';
import { BottomTabMenu, Container } from '../../components';
import images from '../../index';
import { Authentication } from '../../styles';

const AboutUsScreen = ({ route, navigation }) => {
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const { singer, singerImage, singerTitle, singerDescription, songTitle } = route.params;
  const Authentications = Authentication(Colors);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = singerDescription?.length > 100 ? `${singerDescription.substring(0, 100)}...` : singerDescription;

  return (
    <Container>
      <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu/>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.backArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: Colors.white }]}>{t("About Artist")}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <View style={styles.container}>
              {singerImage ? (
                <Image source={{ uri: singerImage }} style={styles.singerImage} resizeMode="cover" />
              ) : (
                <Image source={images.defaultSingerImage} style={styles.singerImage} resizeMode="cover" />
              )}
              <View style={styles.textContainer}>
                <Text style={[styles.songTitle, { color: Colors.white }]}>{songTitle}</Text>
                <Text style={[styles.singerTitle, { color: Colors.theme_backgound }]}>{singerTitle}</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.description, { color: Colors.gray }]}>
                About Artist: {showFullDescription ? singerDescription : truncatedDescription}
              </Text>
              {singerDescription?.length > 100 && (
                <TouchableOpacity onPress={toggleDescription}>
                  <Text style={[styles.moreText, { color: Colors.theme_backgound }]}>
                    {showFullDescription ? t("Less") : t("More")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SW(20),
    flexDirection: 'row',
    marginBottom: SH(10),
    paddingHorizontal: 20,
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
  },
  singerImage: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    width: 150,
    height: 150,
    marginRight: 20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  singerTitle: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontSize: SH(16),
    marginBottom: SH(10),
  },
  songTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    fontSize: SH(22),
    marginTop: SH(15),
  },
  descriptionContainer: {
    paddingHorizontal: SW(20),
    paddingVertical: SH(10),
    marginBottom: SH(100),
  },
  description: {
    fontSize: SH(16),
    textAlign: 'left',
    lineHeight: SH(22),
  },
  moreText: {
    fontSize: SH(16),
    textAlign: 'left',
    paddingVertical: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default AboutUsScreen;
