import React, { useMemo, useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ScrollView, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, WorkOutView, WorkOutView2 } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { SoundContext } from '../../utils/SoundContext';

const HomeScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();

  const { isPlaying, currentTrack, pauseTrack, resumeTrack, currentTime, duration } = useContext(SoundContext);

  const [workoutData, setWorkoutData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    console.log("workoutData:", workoutData);
    console.log("tagData:", tagData);
  }, [workoutData,tagData]);

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/tags');
      console.log('Tags API Response:', response);

      const defaultImage = 'http://chitraguptp85.sg-host.com/wp-content/uploads/2024/06/Birthday-Bash-Dilliwaali-Zaalim-Girlfriend-128-Kbps-mp3-image.jpg';

      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTagData(response.data.map((tag) => ({
            id: tag.id.toString(),
            title: tag.name,
            description: tag.description,
            imageUrl: defaultImage,
          })));
        } else {
          console.error('Empty or invalid tags response data:', response.data);
        }
      } else {
        console.error('Failed to fetch tags. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting(t("Good Morning"));
    } else if (hours < 18) {
      setGreeting(t("Good Afternoon"));
    } else {
      setGreeting(t("Good Evening"));
    }
  }, [t]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/categories');
      console.log('API Response:', response);

      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWorkoutData(response.data.map((category) => ({
            id: category.id.toString(),
            title: category.name,
            imageUrl: category.thumbnail,
            description: category.description,
          })));
        } else {
          console.error('Empty or invalid response data:', response.data);
        }
      } else {
        console.error('Failed to fetch categories. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRecentlyPlayed = async () => {
    const recentData = [
      { id: '1', title: 'Workout 1', imageUrl: '' },
      { id: '2', title: 'Workout 2', imageUrl: '' },
      { id: '3', title: 'Workout 3', imageUrl: '' },
      { id: '1', title: 'Workout 1', imageUrl: '' },
      { id: '2', title: 'Workout 2', imageUrl: '' },
      { id: '3', title: 'Workout 3', imageUrl: '' },
    ];
    setRecentlyPlayed(recentData);
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchRecentlyPlayed();
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
      reportContainer: {
        backgroundColor: 'rgba(217, 217, 214, 0.2)',
        borderRadius: SH(10),
      },
      reportTitle: {
        color: Colors.white,
        fontSize: SF(18),
        marginBottom: SH(5),
      },
      reportContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: SH(10),
      },
      reportItem: {
        alignItems: 'center',
        padding: SH(10),
      },
      reportValue: {
        fontSize: SF(16),
        fontWeight: 'bold',
        color: Colors.theme_dark_gray,
      },
      reportLabel: {
        fontSize: SF(12),
        color: Colors.theme_dark_gray,
      },
      reportDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.theme_dark_gray,
      },
      yourReport: {
        backgroundColor: Colors.theme_backgound_second,
        borderTopLeftRadius: SH(10),
        borderTopRightRadius: SH(10),
        padding: SH(10),
      },
      musicBar: {
        position: 'absolute',
        bottom: '13%',
        width: '95%',
        padding: SH(10),
        marginLeft: SH(10),
        marginRight: SH(10),
        backgroundColor: 'rgba(217, 217, 214, 0.6)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      musicBarThumbnail: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 10,
      },
      musicBarTextContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      musicBarText: {
        color: Colors.black,
        fontSize: SF(14),
        fontWeight: 'bold',
      },
      text: {
        color: Colors.black,
        fontSize: SF(12),
        marginTop: -4,
      },
      musicBarButton: {
        padding: SH(5),
      },
      playViewIconCenter: {
        width: SW(20),
        height: SH(20),
      },
      playViewIconCenterPause: {
        width: SW(20),
        height: SH(20),
      },
      progressBarContainer: {
        height: SH(4),
        width: '97%',
        backgroundColor: Colors.black,
        borderRadius: SH(2),
        overflow: 'hidden',
        marginTop: SH(5),
      },
      progressBar: {
        height: '100%',
        backgroundColor: Colors.theme_backgound,
      },
    }), [Colors]);

  const progress = (currentTime / (duration || 1)) * 100;

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={0} />
        <ScrollView>
          <View style={HomeStyles.textcenterview}>
            <Spacing space={SH(20)} />
            <View style={HomeStyles.userIconView}>
              <Text style={HomeStyles.userTitle}>{t("Hey Bhairav, ")}{greeting}</Text>
            </View>
            <Spacing space={SH(20)} />
            <Spacing space={SH(30)} />
            <View style={HomeStyles.textView}>
              <Text style={HomeStyles.heading}>{t("your_mood")}</Text>
            </View>
            <Spacing space={SH(40)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Select Tag")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <FlatList
              data={tagData}
              renderItem={({ item }) => (
                <WorkOutView
                  onPress={() => onpressHandle(item.id, item.title)}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <Spacing space={SH(20)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Latest Categories")}</Text>
              <Text style={[HomeStyles.HomeCommonTitle, HomeStyles.viewAllColor]}>{t("View_All")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <View style={HomeStyles.RecentAllView}>
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
            <Spacing space={SH(20)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Recently Played")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <FlatList
              data={workoutData}
              renderItem={({ item }) => (
                <WorkOutView
                  onPress={() => onpressHandle(item.id, item.title)}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <Spacing space={SH(20)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Your Favorites")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <FlatList
              data={workoutData}
              renderItem={({ item }) => (
                <WorkOutView
                  onPress={() => onpressHandle(item.id, item.title)}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
        </ScrollView>
        <Spacing space={SH(80)} />
        {currentTrack && (
          <View style={styles.musicBar}>
            {currentTrack.thumbnail && (
              <Image source={{ uri: currentTrack.thumbnail }} style={styles.musicBarThumbnail} />
            )}
            <View style={styles.musicBarTextContainer}>
              <Text style={styles.musicBarText}>{currentTrack.title}</Text>
              <Text style={styles.text}>Unknown Artist</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.musicBarButton}
              onPress={isPlaying ? pauseTrack : resumeTrack}
            >
              <Image
                source={isPlaying ? images.pause : images.play}
                style={isPlaying ? styles.playViewIconCenterPause : styles.playViewIconCenter}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </Container>
  );
};

export default HomeScreen;
