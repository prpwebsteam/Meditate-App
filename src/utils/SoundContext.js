import React, { createContext, useState, useRef, useEffect } from 'react';
import Sound from 'react-native-sound';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Initialize duration with 0
  const [trackList, setTrackList] = useState([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const sound = useRef(null);
  const interval = useRef(null);

  const playTrack = (track, loop = false) => {
    if (sound.current) {
      sound.current.stop(() => {
        sound.current.release();
        initializeAndPlayTrack(track, loop);
      });
    } else {
      initializeAndPlayTrack(track, loop);
    }
  };

  const initializeAndPlayTrack = (track, loop) => {
    sound.current = new Sound(track?.url, null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.current.setNumberOfLoops(loop ? -1 : 0);
      sound.current.setSpeed(playbackSpeed);
      sound.current.play((success) => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
        clearInterval(interval.current);
      });
      setIsPlaying(true);
      startProgressUpdater();
      setDuration(sound.current.getDuration()); // Update duration here
    });
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(0); // Reset duration while the new track is loading
  };

  const startProgressUpdater = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      if (sound.current && sound.current.isLoaded()) {
        sound.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }
    }, 1000);
  };

  const pauseTrack = () => {
    if (sound.current) {
      sound.current.pause();
      setIsPlaying(false);
      clearInterval(interval.current);
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
        clearInterval(interval.current);
      });
      setIsPlaying(true);
      startProgressUpdater();
    }
  };

  const playNextTrack = () => {
    if (trackList.length > 0) {
      const currentIndex = trackList.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % trackList.length;
      playTrack(trackList[nextIndex]);
    }
  };

  const playPreviousTrack = () => {
    if (trackList.length > 0) {
      const currentIndex = trackList.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
      playTrack(trackList[prevIndex]);
    }
  };

  const seekTo = (time) => {
    if (sound.current) {
      sound.current.setCurrentTime(time);
      setCurrentTime(time);
    }
  };

  const fastForward = () => {
    if (sound.current) {
      const newTime = Math.min(currentTime + 30, duration);
      seekTo(newTime);
    }
  };

  const rewind = () => {
    if (sound.current) {
      const newTime = Math.max(currentTime - 30, 0);
      seekTo(newTime);
    }
  };

  const setSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (sound.current) {
      sound.current.setSpeed(speed);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      if (sound.current) {
        sound.current.release();
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{
      isPlaying,
      currentTrack,
      playTrack,
      pauseTrack,
      resumeTrack,
      setTrackList,
      playNextTrack,
      playPreviousTrack,
      currentTime,
      duration,
      fastForward,
      rewind,
      setSpeed,
      playbackSpeed
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContext, SoundProvider };
