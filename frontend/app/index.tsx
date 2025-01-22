import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Messages from "@/components/Messages";
import { indexStyles } from "@/styles/indexStyles";
import { useSocket } from "@/hooks/useSocket";

export default function Index() {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(
    `Anonymous${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
  );
  const [tempUsername, setTempUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [totalConnectedUsers, setTotalConnectedUsers] = useState(0);
  const messageRef = useRef<MessagesRef>(null);

  const handleUsernameSubmit = (e: any) => {
    if (e && Platform.OS === "web") {
      e.preventDefault();
    }

    const trimmedUsername = tempUsername.trim();

    if (!trimmedUsername) {
      Platform.OS === "web"
        ? alert("Username cannot be empty!")
        : Alert.alert("Error", "Username cannot be empty!");
      return;
    }

    if (trimmedUsername === username) {
      setIsEditingUsername(false);
      setTempUsername("");
      return;
    }

    setUsername(trimmedUsername);
    socket?.emit("set_username", trimmedUsername);
    messageRef.current?.setUsername(trimmedUsername);
    setIsEditingUsername(false);
    setTempUsername("");
  };

  const handleUsernameEdit = () => {
    setTempUsername(username);
    setIsEditingUsername(true);
  };

  const handleChangeMessage = (text: string) => {
    setMessage(text);
    socket?.emit(text.trim() ? "typing_start" : "typing_stop");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    messageRef.current?.sendMessage(message);
    setMessage("");
    socket?.emit("typing_stop");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey && Platform.OS === "web") {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("set_username", username);
    messageRef.current?.setUsername(username);

    return () => {
      socket.emit("typing_stop");
    };
  }, [socket, username]);

  return (
    <LinearGradient
      colors={["#f6f8fd", "#f0f2f8"]}
      style={indexStyles.container}
    >
      <SafeAreaView style={indexStyles.innerContainer}>
        <View style={indexStyles.header}>
          <View style={indexStyles.headerLeft}>
            <Image
              source={require("../assets/random.png")}
              style={indexStyles.profilePic}
            />
            {isEditingUsername ? (
              <View style={indexStyles.usernameEditContainer}>
                <TextInput
                  value={tempUsername}
                  onChangeText={setTempUsername}
                  style={indexStyles.usernameInput}
                  autoFocus
                  onBlur={() => {
                    setIsEditingUsername(false);
                    setTempUsername("");
                  }}
                  onSubmitEditing={(e) => handleUsernameSubmit(e)}
                  blurOnSubmit={false}
                />
                <Pressable
                  style={({ pressed }) => [
                    indexStyles.usernameSubmitButton,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={handleUsernameSubmit}
                >
                  <MaterialIcons name="check" size={20} color="#6C5CE7" />
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={handleUsernameEdit}>
                <Text style={indexStyles.primaryText}>{username}</Text>
              </Pressable>
            )}
          </View>
          <Text style={indexStyles.connectedUsers}>
            Online Users: {totalConnectedUsers}
          </Text>
        </View>
        <View style={indexStyles.primarySection}>
          <Messages
            ref={messageRef}
            onUpdateConnectedUsers={setTotalConnectedUsers}
          />
          <View style={indexStyles.inputContainer}>
            <TextInput
              placeholder="Type your message here..."
              placeholderTextColor="#666"
              value={message}
              onChangeText={handleChangeMessage}
              style={indexStyles.input}
              multiline
              maxLength={500}
              onKeyPress={Platform.OS === "web" ? handleKeyPress : undefined}
              onSubmitEditing={
                Platform.OS !== "web" ? handleSendMessage : undefined
              }
              onBlur={() => socket?.emit("typing_stop")}
            />
            <Pressable
              style={[
                indexStyles.sendButton,
                { opacity: message.trim() ? 1 : 0.5 },
              ]}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <MaterialIcons name="send" size={24} color="#6C5CE7" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
