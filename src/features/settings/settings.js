import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useContext } from "react";
import { View, Switch, Platform, Divider } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { RecordsContext } from "../../service/data/records.context";
import { SafeArea } from "../../components/SafeArea";
import { HeaderView, HeaderText } from "../../components/HeaderComponent";
import {
  DailyReminderContainer,
  DailyReminderButtonContainer,
  DailyReminderButton,
  DailyReminderSwitchContainer,
  DailyReminderSwitch,
  Title,
  ClearButton,
  LogoutButton,
} from "./settings.components";
import { Spacer } from "../../components/Spacer";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function SettingsScreen() {
  const { onLogout } = useContext(AuthenticationContext);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("To allow notifications, change permission status in Settings");
        setIsEnabled(false);
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const { reminder, editReminder, clear, clearBudget } =
    useContext(RecordsContext);
  const holder = reminder ? true : false;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isEnabled, setIsEnabled] = useState(holder);
  const [date, setDate] = useState(reminder ? new Date(reminder) : new Date());
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const toggleSwitch = () => {
    setSubmitted(false);
    if (isEnabled) {
      editReminder(null);
    } else {
      setShow(true);
    }
    setIsEnabled((previousState) => !previousState);
  };

  const setDailyReminder = (hour, minute) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "It's Bookkeeping Time!",
        body: "Success is not an accident; it's something we have to create on purpose! :D",
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
  };

  const cancelDailyReminder = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };

  const FormattedTime = (hour, min) => {
    const formattedHour = hour < 10 ? "0" + hour : hour;
    const formattedMin = min < 10 ? "0" + min : min;
    return formattedHour + " : " + formattedMin;
  };

  useEffect(() => {
    isEnabled ? null : cancelDailyReminder();
  }, [isEnabled]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, [isEnabled]);

  return (
    <SafeArea>
      <HeaderView>
        <HeaderText>Settings</HeaderText>
      </HeaderView>

      <Spacer size="xxlarge" />

      <Title>Notifications</Title>

      <DailyReminderContainer>
        <DailyReminderButtonContainer>
          <DailyReminderButton
            onPress={toggleSwitch}
            icon="bell"
            color="black"
            labelStyle={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
            }}
            uppercase={false}
          >
            {reminder
              ? "current daily reminder   " +
                FormattedTime(date.getHours(), date.getMinutes())
              : "set a daily reminder"}
          </DailyReminderButton>
        </DailyReminderButtonContainer>
        <DailyReminderSwitchContainer>
          <DailyReminderSwitch
            trackColor={{ false: "#767577", true: "#00b05e" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </DailyReminderSwitchContainer>
      </DailyReminderContainer>

      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        {isEnabled && !submitted && !reminder && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {show && (
              <DateTimePicker
                style={{
                  width: "100%",
                }}
                value={date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShow(Platform.OS === "ios");
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
              />
            )}
            <Button
              icon="check"
              onPress={() => {
                setSubmitted(true);
                setDailyReminder(date.getHours(), date.getMinutes());
                editReminder(date);
              }}
              uppercase={false}
              labelStyle={{
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
              }}
            >
              {date &&
                "confirm time:   " +
                  FormattedTime(date.getHours(), date.getMinutes())}
            </Button>
          </View>
        )}
      </View>
      <Spacer size="xxlarge" />
      <Title>Data</Title>
      <ClearButton
        icon="delete"
        color="white"
        labelStyle={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
        }}
        onPress={clear}
        uppercase={false}
      >
        clear all data
      </ClearButton>
      <Spacer />
      <ClearButton
        icon="delete"
        color="white"
        labelStyle={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
        }}
        onPress={clearBudget}
        uppercase={false}
      >
        clear budget
      </ClearButton>
      <Spacer size="xxlarge" />
      <Title>Account</Title>
      <LogoutButton
        icon="logout"
        color="white"
        labelStyle={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
        }}
        onPress={() => onLogout()}
        uppercase={false}
      >
        logout/switch
      </LogoutButton>
    </SafeArea>
  );
}
