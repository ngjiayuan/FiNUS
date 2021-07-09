import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Switch,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { RecordsContext } from "../../service/data/records.context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function SettingScreen() {
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "Original Title",
  //     body: "And here is the body!",
  //     data: { someData: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

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

  const { reminder, editReminder } = useContext(RecordsContext);
  const holder = reminder ? true : false;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isEnabled, setIsEnabled] = useState(holder);
  const [date, setDate] = useState(reminder ? new Date(reminder) : new Date());
  const [submitted, setSubmitted] = useState(false);
  const toggleSwitch = () => {
    setSubmitted(false);
    if (isEnabled) {
      editReminder(null);
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

  useEffect(() => {
    isEnabled ? null : cancelDailyReminder();
  }, [isEnabled]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onPress={toggleSwitch}>
          <Text>
            {"set a daily reminder" +
              (reminder
                ? "   " +
                  (date.getHours() < 10
                    ? "0" + date.getHours()
                    : date.getHours()) +
                  " : " +
                  (date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes())
                : "")}
          </Text>
        </Button>
        <Switch
          trackColor={{ false: "#767577", true: "#00b05e" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ margin: 20 }}
        />
      </View>

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
            <DateTimePicker
              style={{
                width: "100%",
              }}
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
              }}
            />
            <Button
              icon="send"
              onPress={() => {
                setSubmitted(true);
                setDailyReminder(date.getHours(), date.getMinutes());
                editReminder(date);
              }}
            >
              submit
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
// <View
//   style={{
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-around",
//   }}
// >
//   <Text>Your expo push token: {expoPushToken}</Text>
//   <View style={{ alignItems: "center", justifyContent: "center" }}>
//     <Text>
//       Title: {notification && notification.request.content.title}{" "}
//     </Text>
//     <Text>Body: {notification && notification.request.content.body}</Text>
//     <Text>
//       Data:{" "}
//       {notification && JSON.stringify(notification.request.content.data)}
//     </Text>
//   </View>
//   <Button
//     title="Press to Send Notification"
//     onPress={async () => {
//       await sendPushNotification(expoPushToken);
//     }}
//   />
// </View>

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
