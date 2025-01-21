import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
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
  const [totalConnectedUsers, setTotalConnectedUsers] = useState(0);
  const messageRef = useRef<MessagesRef>(null);

  const handleChangeUsername = (newUsername: string) => {
    setUsername(newUsername);
    socket?.emit("set_username", newUsername);
    messageRef.current?.setUsername(newUsername);
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
      <View style={indexStyles.innerContainer}>
        <View style={indexStyles.header}>
          <View style={indexStyles.headerLeft}>
            <Image
              source={require("../assets/random.png")}
              style={indexStyles.profilePic}
            />
            <TextInput
              value={username}
              onChangeText={handleChangeUsername}
              style={indexStyles.primaryText}
              placeholder="Enter username..."
            />
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
              onBlur={() => socket?.emit("typing_stop")}
              onSubmitEditing={handleSendMessage}
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
      </View>
    </LinearGradient>
  );
}
