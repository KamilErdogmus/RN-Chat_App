import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/Colors";
import Messages from "@/components/Messages";

export default function Index() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  return (
    <LinearGradient colors={["#f6f8fd", "#f0f2f8"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../assets/random.png")}
              style={styles.profilePic}
            />
            <TextInput
              value="Anonymus"
              onChangeText={() => {}}
              style={styles.primaryText}
            />
          </View>

          <Pressable
            onPress={() => setDarkMode(!darkMode)}
            style={styles.headerRight}
          >
            <MaterialIcons
              name={darkMode ? "dark-mode" : "light-mode"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View style={styles.primarySection}>
          <Messages />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your message here..."
              placeholderTextColor="#666"
              value={message}
              onChangeText={setMessage}
              style={styles.input}
              multiline
              maxLength={500}
            />
            <Pressable style={styles.sendButton}>
              <MaterialIcons name="send" size={24} color="#6C5CE7" />
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  primarySection: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F0F0F0",
    padding: 16,
  },
  innerContainer: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    flex: 1,
    backgroundColor: COLORS.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    ...(Platform.OS === "web" && {
      borderRadius: 20,
      margin: 20,
      minHeight: 700,
      maxHeight: "95vh",
    }),
  } as ViewStyle,
  inputContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerRight: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  } as TextStyle,
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#000000",
    fontFamily: "SpaceMono",
  },

  sendButton: {
    marginLeft: 10,
    padding: 5,
  },
});
