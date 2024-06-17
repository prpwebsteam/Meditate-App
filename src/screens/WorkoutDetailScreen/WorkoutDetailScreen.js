import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { WorkoutDetailStyle } from '../../styles';
import { Button, Container, Spacing, LottieIcon } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import Sound from 'react-native-sound';

const WorkoutDetailScreen = (props) => {
  const { Colors } = useTheme();
  const WorkoutDetailStyles = useMemo(() => WorkoutDetailStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();

  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      sound.current.pause();
      setIsPlaying(false);
    } else {
      if (sound.current) {
        sound.current.play((success) => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          setIsPlaying(false);
          setCurrentTime(0); // Reset to start
        });
        setIsPlaying(true);
      }
    }
  };

  const handlePlayTrack = (track) => {
    if (sound.current) {
      sound.current.release();
    }
    sound.current = new Sound(track.url, null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setDuration(sound.current.getDuration());
      sound.current.play((success) => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
        setCurrentTime(0); // Reset to start
      });
      setIsPlaying(true);
    });
    setCurrentTrack(track);
  };

  useEffect(() => {
    sound.current = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setDuration(sound.current.getDuration());
    });

    return () => {
      if (sound.current) {
        sound.current.release();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound.current && isPlaying) {
        sound.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const similarTracks = [
    { id: '1', title: 'Relaxing Music 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '2', title: 'Relaxing Music 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '3', title: 'Relaxing Music 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '4', title: 'Relaxing Music 4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '5', title: 'Relaxing Music 5', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: '6', title: 'Relaxing Music 6', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    // Add more tracks as needed
  ];

  return (
    <Container>
      <View style={WorkoutDetailStyles.viewImageBoxChallengeInnerView}>
        <View>
          <Spacing space={SH(10)} />
          <View style={WorkoutDetailStyles.leftArrowView}>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
              <LottieIcon source={images.leftArrowWhite} style={WorkoutDetailStyles.leftArrow} />
            </TouchableOpacity>
            <Text style={[WorkoutDetailStyles.ImageTitle]}>{t("Breathing_Practices")}</Text>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: 'transparent', padding: SW(30), marginBottom: 100 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={WorkoutDetailStyles.centerMainView}>
            <View>
              <LottieIcon source={images.lotus_complex} style={WorkoutDetailStyles.imageStyle} />
            </View>
            <Spacing space={SH(20)} />

            <Text style={[WorkoutDetailStyles.boxText]}>{t("Breathing_Practices")}</Text>
            <Spacing space={SH(10)} />
            <Text style={[WorkoutDetailStyles.boxTextLight]}>{t("For_Relaxation")}</Text>
            <Spacing space={SH(40)} />

            <View style={WorkoutDetailStyles.playView}>
              <Image source={images.forward_button} style={WorkoutDetailStyles.playViewIcon} />
              <TouchableOpacity onPress={handlePlayPause} style={WorkoutDetailStyles.playCenter}>
                <Image source={isPlaying ? images.pause : images.play} style={WorkoutDetailStyles.playViewIconCenter} />
              </TouchableOpacity>
              <Image source={images.rewind_button} style={WorkoutDetailStyles.playViewIcon} />
            </View>
            <Spacing space={SH(40)} />
            <View style={WorkoutDetailStyles.playTimeView}>
              <Text style={WorkoutDetailStyles.playTimeText}>{formatTime(currentTime)}</Text>
              <Text style={[WorkoutDetailStyles.playTimeText, WorkoutDetailStyles.off_gray]}>{formatTime(duration)}</Text>
            </View>
            <View style={WorkoutDetailStyles.counterMainViewStart}>
              <View style={[WorkoutDetailStyles.counterMainViewStartActive, { width: `${(currentTime / duration) * 100}%` }]}></View>
            </View>
            <Spacing space={SH(20)} />
          </View>
          <Spacing space={SH(20)} />

          {/* Similar Music Block */}
          <View>
            <Text style={[WorkoutDetailStyles.boxText]}>{t("Similar Music")}</Text>
            <View style={WorkoutDetailStyles.similarMusicContainer}>
              {similarTracks.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handlePlayTrack(item)} style={WorkoutDetailStyles.trackItem}>
                  <Text style={WorkoutDetailStyles.trackTitle}>{item.title}</Text>
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
    </Container>
  );
};

export default WorkoutDetailScreen;
