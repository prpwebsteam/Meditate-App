import React, { useMemo, useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ScrollView, Image, ImageBackground, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { HomeStyle } from '../../styles';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { Container, Spacing, BottomTabMenu, WorkOutView } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { Colors, SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { SoundContext } from '../../utils/SoundContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  useEffect(() => {
    console.log("tagData:-------", tagData);
    console.log("workoutData:-------", workoutData);
  }, [tagData, workoutData]);

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/tags');
      console.log('Tags API Response:', response);

      const defaultImages = [
        'http://chitraguptp85.sg-host.com/wp-content/uploads/2024/06/med-6.png',
        'http://chitraguptp85.sg-host.com/wp-content/uploads/2024/06/buddha-statue-mediation-relaxation-scaled.jpg',
        'http://chitraguptp85.sg-host.com/wp-content/uploads/2024/06/3d-rendering-buddha-statute-sunset-scaled.jpg'
      ];

      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTagData(response.data.map((tag, index) => ({
            id: tag.id.toString(),
            title: tag.name,
            description: tag.description,
            imageUrl: defaultImages[index % defaultImages.length],
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
    try {
      const recentTracks = await AsyncStorage.getItem('recentlyPlayedTracks');
      setRecentlyPlayed(recentTracks ? JSON.parse(recentTracks) : []);
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchRecentlyPlayed();
  }, []);

  const onpressHandle = (id, title, track, fromRecentlyPlayed = false) => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN, { categoryId: id, categoryName: title, track, fromRecentlyPlayed });
  };

  const onTagPressHandle = (tagId, tagName) => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN, { tagId, tagName });
  };

  const handleQuizAnswerChange = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmitQuiz = () => {
    console.log("Quiz Answers:", quizAnswers);
    setIsModalVisible(false);
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
      button: {
        backgroundColor: Colors.theme_backgound,
        padding: SH(10),
        borderRadius: SH(5),
        alignItems: 'center',
        marginTop: SH(20),
      },
      buttonText: {
        color: Colors.white,
        fontSize: SF(16),
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      modalContent: {
        width: '90%',
        backgroundColor: '#313131',
        borderRadius: SH(10),
        padding: SH(20),
        height: '60%',
      },
      questionText: {
        fontSize: SF(18),
        color: Colors.white,
        fontWeight: 'bold',
        marginBottom: SH(10),
      },
      optionText: {
        fontSize: SF(16),
        color: Colors.white,
        marginBottom: SH(10),
      },
      buttonContainer: {
        alignItems: 'center',
      },
      button: {
        backgroundColor: Colors.theme_backgound,
        paddingVertical: SH(10),
        marginTop: SH(20),
        paddingHorizontal: SH(20),
        borderRadius: SH(5),
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: Colors.white,
        fontSize: SF(16),
        fontWeight: 'bold',
      },
      recentlyPlayedItem: {
        width: 150,
        height: 150,
        marginRight: 10,
        marginLeft: 10,
        paddingBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
      recentlyPlayedText: {
        color: Colors.white,
        fontSize: SF(14),
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
      },
    }), [Colors]);

  const progress = (currentTime / (duration || 1)) * 100;

  const questions = [
    { id: 'q1', text: 'How do you feel today?', options: ['Happy', 'Sad', 'Neutral'] },
    { id: 'q2', text: 'Rate your energy level', options: ['1', '2', '3', '4', '5'] },
    { id: 'q3', text: 'How do you feel today?', options: ['Happy', 'Sad', 'Neutral'] },
    { id: 'q4', text: 'Rate your energy level', options: ['1', '2', '3', '4', '5'] },
    { id: 'q5', text: 'How do you feel today?', options: ['Happy', 'Sad', 'Neutral'] },
    { id: 'q6', text: 'Rate your energy level', options: ['1', '2', '3', '4', '5'] },
  ];

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
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(RouteName.QUIZ_SCREEN)}>
                <Text style={styles.buttonText}>{t("Take Quiz")}</Text>
              </TouchableOpacity>
            </View>
            <Spacing space={SH(40)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Latest Categories")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.ALL_CATEGORY_SCREEN)}>
                <Text style={[HomeStyles.HomeCommonTitle, HomeStyles.viewAllColor]}>{t("View_All")}</Text>
              </TouchableOpacity>
            </View>
            <Spacing space={SH(20)} />
            <View style={HomeStyles.RecentAllView}>
              <FlatList
                data={workoutData.slice(0, 3)}
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
              data={recentlyPlayed}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onpressHandle(item.id, item.title, item, true)}
                  style={styles.recentlyPlayedItem}
                >
                  <ImageBackground
                    source={item.thumbnail ? { uri: item.thumbnail } : images.dummyImage}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <Text style={styles.recentlyPlayedText}>{item.title}</Text>
                  </ImageBackground>
                </TouchableOpacity>
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

            <Spacing space={SH(20)} />

            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Select Tag")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <FlatList
              data={tagData}
              renderItem={({ item }) => (
                <WorkOutView
                  onPress={() => onTagPressHandle(item.id, item.title)}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <Spacing space={SH(20)} />

          </View>
        </ScrollView>
        <Spacing space={SH(80)} />
        {currentTrack && (
          <View style={styles.musicBar}>
            <View style={styles.musicCard}>
              {currentTrack.thumbnail ? (
                <Image source={{ uri: currentTrack.thumbnail }} style={styles.musicBarThumbnail} />
              ) : (
                <Image source={images.dummyImage} style={styles.musicBarThumbnail} />
              )}
            </View>
            <View style={styles.musicBarTextContainer}>
              <Text style={styles.musicBarText}>{currentTrack.title}</Text>
              <Text style={styles.text}>{currentTrack?.artist?.title || 'Unknown Artist'}</Text>
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
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {questions.map((question, index) => (
                  <View key={index} style={{ marginBottom: SH(30) }}>
                    <Text style={styles.questionText}>{`Q${index + 1}: ${question.text}`}</Text>
                    {question.id === 'q1' || question.id === 'q3' || question.id === 'q5' ? (
                      <View style={{ color: Colors.black, backgroundColor: '#d3d3d3', borderRadius: 10, marginRight: 10 }}>
                        <Picker
                          selectedValue={quizAnswers[question.id]}
                          onValueChange={(itemValue) => handleQuizAnswerChange(question.id, itemValue)}
                          style={{ color: Colors.black, fontWeight: 'bold' }}
                        >
                          {question.options.map((option, optionIndex) => (
                            <Picker.Item key={optionIndex} label={option} value={option} />
                          ))}
                        </Picker>
                      </View>
                    ) : question.id === 'q2' || question.id === 'q4' || question.id === 'q6' ? (
                      question.options.map((option, optionIndex) => (
                        <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(10) }}>
                          <CheckBox
                            value={quizAnswers[question.id] === option}
                            onValueChange={() => handleQuizAnswerChange(question.id, option)}
                          />
                          <Text style={styles.optionText}>{option}</Text>
                        </View>
                      ))
                    ) : null}
                  </View>
                ))}
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmitQuiz}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Container>
  );
};

export default HomeScreen;
