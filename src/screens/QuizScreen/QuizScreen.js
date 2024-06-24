import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
import { Colors, SW, SH, SF } from '../../utils';
import { useTranslation } from 'react-i18next';
import { BottomTabMenu, Container } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SoundContext } from '../../utils/SoundContext';

const QuizScreen = ({ navigation }) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/quiz');
                if (response.status === 200) {
                    const { questions, related_songs } = response.data;
                    const quizQuestionsWithRelatedSongs = questions.map(question => ({
                        ...question,
                        related_songs: related_songs[question.id] || []
                    }));
                    setQuizQuestions(quizQuestionsWithRelatedSongs);
                } else {
                    console.error('Failed to fetch quiz questions. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching quiz questions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizQuestions();
    }, []);

    const handleQuizAnswerChange = (questionId, answer) => {
        setQuizAnswers({
            ...quizAnswers,
            [questionId]: answer,
        });
    };

    const handleSubmitQuiz = () => {
        const relatedSongsMap = quizQuestions.reduce((acc, question) => {
            if (question.related_songs) {
                acc[question.id] = question.related_songs;
            }
            return acc;
        }, {});

        // Filter correct answers
        const correctAnswers = quizQuestions.filter((question) => {
            const correctOptionKey = `option${question.questions.answer}`;
            return quizAnswers[question.id] === correctOptionKey;
        });

        // Collect related songs from correct answers
        const relatedSongs = correctAnswers.reduce((acc, question) => {
            const questionRelatedSongs = relatedSongsMap[question.id] || [];
            return acc.concat(questionRelatedSongs);
        }, []);

        navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN, { relatedSongs });
    };

    if (isLoading) {
        return (
            <Container>
                <ImageBackground source={images.background1} style={styles.backgroundImage}>
                    <View style={styles.overlay} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={images.backArrow} style={styles.backArrow} />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: '#fff' }]}>{t("Quiz")}</Text>
                    </View>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>{t('Loading...')}</Text>
                    </View>
                </ImageBackground>
            </Container>
        );
    }

    return (
        <Container>
            <ImageBackground source={images.background1} style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.backArrow} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: '#fff' }]}>{t("Quiz")}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.container2}>
                        {quizQuestions.map((question, index) => (
                            <View key={question.id} style={styles.questionContainer}>
                                <Text style={styles.questionText}>{`Q${index + 1}: ${question.title}`}</Text>
                                {Object.keys(question.questions).filter(key => key.startsWith('option')).map((optionKey, optionIndex) => (
                                    <View key={optionIndex} style={styles.optionContainer}>
                                        <CheckBox
                                            value={quizAnswers[question.id] === optionKey}
                                            onValueChange={() => handleQuizAnswerChange(question.id, optionKey)}
                                            style={styles.CheckBox}
                                        />
                                        <Text style={styles.optionText}>{question.questions[optionKey]}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmitQuiz}>
                                <Text style={styles.buttonText}>{t('Submit')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SH(20),
        marginBottom: 20
    },
    container2: {
        flex: 1,
        padding: SH(20),
        paddingBottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f79f80',
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
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    CheckBox:{
color:'#fff',
borderColor:'#FFF'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: SF(18),
        color: '#fff',
    },
    questionContainer: {
        marginBottom: SH(30),
    },
    questionText: {
        fontSize: SF(18),
        color: 'white',
        fontWeight: 'bold',
        marginBottom: SH(10),
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(10),
    },
    optionText: {
        fontSize: SF(16),
        color: 'white',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#d3d3d3',
        paddingVertical: SH(10),
        paddingHorizontal: SH(20),
        borderRadius: SH(5),
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: SF(16),
        fontWeight: 'bold',
    },
});

export default QuizScreen;
