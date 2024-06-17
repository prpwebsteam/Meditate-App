import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, WorkOutView } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, SW, SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const HomeScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();

  const [workoutData, setWorkoutData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/categories');
      console.log('API Response:', response);
  
      if (response.status === 200) {
        // Check if response data is an array and has expected properties
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWorkoutData(response.data.map((category, index) => ({
            id: index.toString(),
            title: category.name,
            imageUrl: '',
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
  

  useEffect(()=>{
    console.log("workoutData:--------",workoutData)
  }, [workoutData])
  useEffect(() => {
    fetchCategories();
  }, []);

  const onpressHandle = (id) => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN);
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
    }), [Colors]);

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={0} />
        <ScrollView>
          <View style={HomeStyles.textcenterview}>
            <Spacing space={SH(20)} />
            <View style={HomeStyles.userIconView}>
              <View style={HomeStyles.userIconBox}>
                <Image source={images.userIcon} style={HomeStyles.userIcon} resizeMode='cover' />
              </View>
              <Text style={HomeStyles.userTitle}>{t("Hey_Pinal")}</Text>
            </View>
            <Spacing space={SH(10)} />
            <View style={styles.reportContainer}>
              <View style={styles.yourReport}><Text style={styles.reportTitle}>Your Report</Text></View>
              <View style={styles.reportContent}>
                <View style={styles.reportItem}>
                  <Text style={styles.reportValue}>40 mins</Text>
                  <Text style={styles.reportLabel}>Today</Text>
                </View>
                <View style={styles.reportDivider} />
                <View style={styles.reportItem}>
                  <Text style={styles.reportValue}>2.2 hours</Text>
                  <Text style={styles.reportLabel}>This Week</Text>
                </View>
                <View style={styles.reportDivider} />
                <View style={styles.reportItem}>
                  <Text style={styles.reportValue}>30 hours</Text>
                  <Text style={styles.reportLabel}>Total</Text>
                </View>
              </View>
            </View>
            <Spacing space={SH(30)} />
            <View style={HomeStyles.textView}>
              <Text style={HomeStyles.heading}>{t("your_mood")}</Text>
            </View>
            <Spacing space={SH(40)} />
            <View style={HomeStyles.HomeCommonView}>
              <Text style={HomeStyles.HomeCommonTitle}>{t("Latest_Practices")}</Text>
              <Text style={[HomeStyles.HomeCommonTitle, HomeStyles.viewAllColor]}>{t("View_All")}</Text>
            </View>
            <Spacing space={SH(20)} />
            <View style={HomeStyles.RecentAllView}>
              <FlatList
                data={workoutData}
                renderItem={({ item }) => (
                  <WorkOutView
                    onPress={() => onpressHandle(item.id)}
                    item={item}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal={false}
                numColumns={2}
              />
            </View>
          </View>
        </ScrollView>
        <Spacing space={SH(80)} />
      </ImageBackground>
    </Container>
  );
};

export default HomeScreen;
