import React, { useEffect, useMemo, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { WorkoutDetailStyle } from '../../styles';
import { Button, Container, Spacing, LottieIcon } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { SoundContext } from '../../utils/SoundContext';

const WorkoutDetailScreen = (props) => {
  const { Colors } = useTheme();
  const WorkoutDetailStyles = useMemo(() => WorkoutDetailStyle(Colors), [Colors]);
  const { navigation, route } = props;
  const { categoryId, categoryName } = route.params;
  const { t } = useTranslation();
  const [wishlist, setWishlist] = useState([]);

  const { isPlaying, currentTrack, playTrack, pauseTrack, resumeTrack, playNextTrack, playPreviousTrack, setTrackList, currentTime, duration, fastForward, rewind } = useContext(SoundContext);
  const [similarTracks, setSimilarTracks] = useState([]);

  useEffect(() => {
    console.log("currentTrack:", currentTrack);
  }, [currentTrack]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`https://chitraguptp85.sg-host.com/wp-json/meditate/v2/songs?category_id=${categoryId}`);
      console.log("response:", response);
      if (response.status === 200 && Array.isArray(response.data)) {
        const tracks = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          singer: item.singer || "Unknown Artist",
          url: item.song?.add_new || null,
          thumbnail: item.song?.thumbnail_image || null,
        })).filter(track => track.url);

        setSimilarTracks(tracks);
        setTrackList(tracks);
        if (tracks.length > 0) {
          playTrack(tracks[0]);
        }
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
    console.log("Current track being added to wishlist:", currentTrack);

    try {
      const response = await axios.post('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/wishlist', {
        song_id: currentTrack.id,
        title: currentTrack.title,
        singer: currentTrack.singer,
        url: currentTrack.url,
        thumbnail: currentTrack.thumbnail
      });

      if (response.status === 200) {
        console.log('Track added to wishlist:', response.data);
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
  }, [categoryId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
      }
    }), [Colors]);

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage} >
        <View style={styles.overlay} />
        <View style={WorkoutDetailStyles.viewImageBoxChallengeInnerView}>
          <View style={WorkoutDetailStyles.leftArrowView}>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
              <Image source={images.backArrow} style={WorkoutDetailStyles.leftArrow} />
            </TouchableOpacity>
            <Text style={[WorkoutDetailStyles.ImageTitle]}>{categoryName}</Text>
          </View>
          <ScrollView style={{ backgroundColor: 'transparent', padding: SW(30), marginBottom: 100 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={WorkoutDetailStyles.centerMainView}>
              <TouchableOpacity onPress={postToWishlist} style={styles.rightImageStyle2}>
                <Image source={wishlist.includes(currentTrack?.id) ? images.wishlist11 : images.wishlist1} style={{ width: SW(20), height: SW(20) }} />
              </TouchableOpacity>
              <View style={styles.musicCard}>
                {currentTrack?.thumbnail ? (
                  <Image source={{ uri: currentTrack.thumbnail }} style={WorkoutDetailStyles.imageStyle} />
                ) : (
                  <LottieIcon source={images.lotus_complex} style={WorkoutDetailStyles.imageStyle} />
                )}
              </View>
              <Spacing space={SH(20)} />
              <Text style={[WorkoutDetailStyles.boxText]}>{categoryName}</Text>
              <Spacing space={SH(10)} />
              <Text style={[WorkoutDetailStyles.boxTextLight]}>{currentTrack ? currentTrack.title : t("For_Relaxation")}</Text>
              {currentTrack && (
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.ABOUT_US_SCREEN, { singer: currentTrack.singer })}>
                  <Text style={[WorkoutDetailStyles.singer, { textDecorationLine: 'underline' }]}>{currentTrack.singer}</Text>
                </TouchableOpacity>
              )}
              <Spacing space={SH(20)} />
              <View style={WorkoutDetailStyles.playView}>
                <TouchableOpacity onPress={rewind}>
                  <Image source={images.rewind_button} style={WorkoutDetailStyles.playViewIcon2} />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPreviousTrack}>
                  <Image source={images.backward} style={WorkoutDetailStyles.playViewIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={isPlaying ? pauseTrack : resumeTrack} style={WorkoutDetailStyles.playCenter}>
                  <Image
                    source={isPlaying ? images.pause : images.play}
                    style={isPlaying ? WorkoutDetailStyles.playViewIconCenterPause : WorkoutDetailStyles.playViewIconCenter}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={playNextTrack}>
                  <Image source={images.forward} style={WorkoutDetailStyles.playViewIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={fastForward}>
                  <Image source={images.forward_button} style={WorkoutDetailStyles.playViewIcon2} />
                </TouchableOpacity>
              </View>
              <Spacing space={SH(20)} />
              <View style={WorkoutDetailStyles.playTimeView}>
                <Text style={WorkoutDetailStyles.playTimeText}>{formatTime(currentTime || 0)}</Text>
                <Text style={[WorkoutDetailStyles.playTimeText, WorkoutDetailStyles.off_gray]}>{formatTime(duration)}</Text>
              </View>
              <View style={WorkoutDetailStyles.counterMainViewStart}>
                <View style={[WorkoutDetailStyles.counterMainViewStartActive, { width: `${(currentTime / (duration || 1)) * 100}%` }]}></View>
              </View>
              <Spacing space={SH(20)} />
            </View>
            <Spacing space={SH(20)} />
            <View>
              <Text style={[WorkoutDetailStyles.boxText]}>{t("Similar Music")}</Text>
              <View style={WorkoutDetailStyles.similarMusicContainer}>
                {similarTracks.map((item) => (
                  <TouchableOpacity key={item.id} onPress={() => playTrack(item)} style={WorkoutDetailStyles.trackItem}>
                    {item.thumbnail && (
                      <Image source={{ uri: item.thumbnail }} style={WorkoutDetailStyles.trackThumbnail} />
                    )}
                    <View style={WorkoutDetailStyles.trackInfo}>
                      <Text style={WorkoutDetailStyles.trackTitle}>{item.title}</Text>
                      <Text style={WorkoutDetailStyles.singer}>{item.singer}</Text>
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
            <Spacing space={SH(20)} />
          </ScrollView>
          <View style={WorkoutDetailStyles.stickyButton}>
            <Button title={t("Explore_Similar")} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
};

export default WorkoutDetailScreen;
