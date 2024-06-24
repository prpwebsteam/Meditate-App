import React, { useEffect, useMemo, useContext, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WorkoutDetailStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu } from '../../components';
import images from '../../index';
import { Fonts, SF, SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { SoundContext } from '../../utils/SoundContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MeditationScreen = (props) => {
  const { Colors } = useTheme();
  const WorkoutDetailStyles = useMemo(() => WorkoutDetailStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [wishlist, setWishlist] = useState([]);
  const [timerDuration, setTimerDuration] = useState(null);
  const [remainingTime, setRemainingTime] = useState(timerDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const timerRef = useRef(null);

  const { isPlaying, currentTrack, playTrack, pauseTrack, resumeTrack, setTrackList } = useContext(SoundContext);
  const [similarTracks, setSimilarTracks] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`https://chitraguptp85.sg-host.com/wp-json/meditate/v2/songs?tag=meditation`);

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

        setSimilarTracks(tracks);
        setTrackList(tracks);
      } else {
        console.error('Failed to fetch songs or invalid response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const postToWishlist = async () => {
    if (!currentTrack) {
      console.error("No track is currently playing");
      return;
    }

    try {
      const response = await axios.post('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/wishlist', {
        song_id: currentTrack.id,
        title: currentTrack.title,
        singer: currentTrack.singer,
        url: currentTrack.url,
        thumbnail: currentTrack.thumbnail
      });

      if (response.status === 200) {
        setWishlist((prevWishlist) => [...prevWishlist, currentTrack.id]);
      } else {
        console.error('Failed to add track to wishlist. Response status:', response.status, 'Response data:', response.data);
      }
    } catch (error) {
      console.error('Error adding track to wishlist:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartStopTimer = () => {
    if (isTimerRunning) {
      clearInterval(timerRef.current);
      pauseTrack();
      setIsTimerRunning(false);
    } else {
      if (!timerDuration) {
        Alert.alert("No duration selected", "Please select a duration before starting the timer.");
        return;
      }

      Alert.alert(
        "Timer Starting",
        "The timer will start. Please do not switch the tab or screen.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              if (selectedTrack) {
                playTrack(selectedTrack, true);
              }
              timerRef.current = setInterval(() => {
                setRemainingTime((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    pauseTrack();
                    setIsTimerRunning(false);
                    return 0;
                  }
                  return prevTime - 1;
                });
              }, 1000);
              setIsTimerRunning(true);
            },
          },
        ]
      );
    }
  };

  const handleTimerSelect = (duration) => {
    setTimerDuration(duration);
    setRemainingTime(duration);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (remainingTime === 0 && isPlaying) {
      pauseTrack();
      setIsTimerRunning(false);
    }
  }, [remainingTime]);

  const styles = useMemo(() =>
    StyleSheet.create({
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
      rightImageStyle2: {
        width: SW(10),
        height: SW(10),
        marginRight: SW(20),
        position: 'absolute',
        top: SH(15),
        right: SW(7),
      },
      headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      musicCard: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        height: 200,
      },
      scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: SH(100), // Add padding to the bottom
      },
      similarMusicContainer: {
        paddingBottom: SH(20), // Ensure last song is fully visible
      },
      timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SH(20),
      },
      timerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: SW(10),
        width: SW(60),
        height: SW(60),
        marginTop: 10,
      },
      timerButtonText: {
        color: Colors.theme_backgound,
        fontSize: SW(42),
        fontWeight: 'bold',
      },
      timerDurationButton: {
        marginVertical: SH(10),
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        backgroundColor: Colors.secondary,
        borderRadius: SW(5),
      },
      timerDurationButtonText: {
        color: Colors.white,
        fontSize: SW(16),
      },
      dropdown: {
        height: SH(50),
        width: SW(200),
        marginBottom: SH(20),
        backgroundColor: Colors.theme_backgound,
        borderRadius: 10,
      },
      dropdownText: {
        color: Colors.white,
        fontSize: SW(16),
        textAlign: 'center',
      },
      centerMainView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 214, 0.2)',
        width: "100%",
        alignSelf: 'center',
        borderRadius: SW(20),
        paddingHorizontal: SW(10),
      },
      trackIcon: {
        width: SH(30),
        height: SH(30),
        marginLeft: 10,
      },
      trackIcon2: {
        width: SH(30),
        height: SH(30),
      },
      boxText: {
        color: Colors.theme_backgound,
        fontSize: SF(20),
        fontFamily: Fonts.RobotoCondensed_Regular,
        paddingTop: SW(30),
        paddingHorizontal: SW(10)
      },
      boxText2: {
        color: Colors.theme_backgound,
        fontSize: SF(24),
        fontFamily: Fonts.RobotoCondensed_Regular,
        paddingHorizontal: SW(10),
        paddingBottom: SW(20),
        fontWeight: '600',
      },
      selectedTrack: {
        backgroundColor: '#313131',
        opacity: 1,
      },
      unselectedTrack: {
        opacity: 1,
      },
    }), [Colors]);

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage} >
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={1} />
        <ScrollView style={{ backgroundColor: 'transparent', padding: SW(30) }} contentContainerStyle={styles.scrollContentContainer}>
          <Text style={[styles.boxText2]}>{t("Meditation")}</Text>
          <View style={styles.centerMainView}>
            <Text style={[styles.boxText]}>{t("Select Timer")}</Text>
            <View style={styles.timerContainer}>
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={timerDuration}
                  onValueChange={(itemValue) => handleTimerSelect(itemValue)}
                  style={{
                    height: SH(40),
                    color: Colors.white,
                    borderRadius: 10
                  }}
                >
                  <Picker.Item label="Select Time" value={null} enabled={false} />
                  <Picker.Item label="5 min" value={300} />
                  <Picker.Item label="10 min" value={600} />
                  <Picker.Item label="15 min" value={900} />
                  <Picker.Item label="20 min" value={1200} />
                  <Picker.Item label="25 min" value={1500} />
                  <Picker.Item label="30 min" value={1800} />
                </Picker>
              </View>
              <AnimatedCircularProgress
                size={200}
                width={10}
                fill={remainingTime ? (remainingTime / timerDuration) * 100 : 0}
                tintColor={Colors.primary}
                backgroundColor={Colors.theme_backgound}>
                {
                  () => (
                    <View>
                      <Text style={styles.timerButtonText}>{formatTime(remainingTime)}</Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
              <TouchableOpacity onPress={handleStartStopTimer} style={styles.timerButton}>
                {isTimerRunning ? (
                  <Image source={images.pause} style={styles.trackIcon2} />
                ) : (
                  <Image source={images.play} style={styles.trackIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Spacing space={SH(20)} />
          <View>
            <Text style={[WorkoutDetailStyles.boxText]}>{t("Select Music")}</Text>
            <View style={[WorkoutDetailStyles.similarMusicContainer, styles.similarMusicContainer]}>
              {similarTracks.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedTrack(item)}
                  style={[
                    WorkoutDetailStyles.trackItem,
                    selectedTrack?.id === item.id ? styles.selectedTrack : styles.unselectedTrack
                  ]}
                >
                  {item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={WorkoutDetailStyles.trackThumbnail} />
                  ) : (
                    <Image source={images.dummyImage2} style={WorkoutDetailStyles.trackThumbnail} />
                  )}
                  <View style={WorkoutDetailStyles.trackInfo}>
                    <Text style={WorkoutDetailStyles.trackTitle}>{item.title}</Text>
                    <Text style={WorkoutDetailStyles.singer}>{item.artist?.title || "Unknown Artist"}</Text>
                  </View>
                  {currentTrack?.id === item.id && isPlaying ? (
                    <Image source={images.pause} style={WorkoutDetailStyles.trackIcon} />
                  ) : (
                    <Image source={images.play} style={WorkoutDetailStyles.trackIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground> 
    </Container>
  );
};

export default MeditationScreen;
