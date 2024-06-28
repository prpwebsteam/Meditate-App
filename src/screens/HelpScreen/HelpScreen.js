import React, { useState, useMemo } from "react";
import { View, ScrollView, TextInput, ImageBackground, Alert, Text } from "react-native"; // Import Alert and Text
import { HelpStyle, HomeStyle } from '../../styles';
import { Button, Container, SweetAlertModal } from '../../components';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../index';

const DoctoreHelpScreen = () => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const HelpStyles = useMemo(() => HelpStyle(Colors), [Colors]);
  const { t } = useTranslation();

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onPressHandle = () => {
    // Check if subject or message is empty
    if (!subject.trim() || !message.trim()) {
      Alert.alert(
        "",
        "Subject or message cannot be empty",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }

    sendEmail();
    setSubject('');
    setMessage('');
    setSuccessModalVisible(true);
  }

  const sendEmail = async () => {
    try {
      const apiUrl = 'https://chitraguptp85.sg-host.com/wp-json/meditate/v2/send-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject,
          message: message,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Container>
      <ImageBackground source={images.background1} style={HelpStyles.backgroundImage}>
        <View style={HelpStyles.overlay} />
        <ScrollView>
          <View style={HomeStyles.textcenterview}>
            <View style={HelpStyles.settopspace}>
              <Text style={HelpStyles.descriptionText}>
                {t("If you have any questions or need assistance, please fill out the form below with the subject and your message. We will get back to you as soon as possible.")}
              </Text>
            </View>
            <View style={HelpStyles.settopspace}>
              <TextInput
                style={[HelpStyles.setsubinputwidth, { color: 'white' }]}
                placeholder={t("Subject")}
                placeholderTextColor="white"
                onChangeText={text => setSubject(text)}
                value={subject}
              />
            </View>
            <View style={HelpStyles.settopspace}>
              <TextInput
                style={[HelpStyles.settextinputwidth, { color: 'white' }]}
                placeholder={t("Type_Message")}
                placeholderTextColor="white"
                multiline
                numberOfLines={4}
                onChangeText={text => setMessage(text)}
                value={message}
              />
            </View>
          </View>
        </ScrollView>
        <View style={HelpStyles.textcenterview}>
          <View style={HelpStyles.setbuttonstyle}>
            {/* Button to send email */}
            <Button
              title={t("Send_Mail")}
              onPress={onPressHandle}
            />
          </View>
        </View>
        <SweetAlertModal
          message={t("Email_Has")}
          modalVisible={successModalVisible}
          setModalVisible={setSuccessModalVisible}
          onPress={() => setSuccessModalVisible(false)}
          success={true}
          buttonText={t("OK")}
        />
      </ImageBackground>
    </Container>
  );
};

export default DoctoreHelpScreen;
