import React, { createContext, useState, useRef } from 'react';
import Sound from 'react-native-sound';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const sound = useRef(null);

  const playTrack = (track) => {
    if (sound.current) {
      sound.current.stop(() => {
        sound.current.release();
        sound.current = new Sound(track.url, null, (error) => {
          if (error) {
            console.log('Failed to load the sound', error);
            return;
          }
          sound.current.play((success) => {
            if (success) {
              console.log('Successfully finished playing');
            } else {
              console.log('Playback failed due to audio decoding errors');
            }
            setIsPlaying(false);
          });
          setIsPlaying(true);
        });
        setCurrentTrack(track);
      });
    } else {
      sound.current = new Sound(track.url, null, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.current.play((success) => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          setIsPlaying(false);
        });
        setIsPlaying(true);
      });
      setCurrentTrack(track);
    }
  };

  const pauseTrack = () => {
    if (sound.current) {
      sound.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = () => {
    if (sound.current) {
      sound.current.play((success) => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const updateCurrentTime = (time) => {
    if (sound.current) {
      sound.current.setCurrentTime(time);
      setCurrentTime(time);
    }
  };

  return (
    <SoundContext.Provider value={{ isPlaying, currentTrack, playTrack, pauseTrack, resumeTrack, setCurrentTime: updateCurrentTime }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContext, SoundProvider };
