import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Messages from "@/components/Messages";
import { indexStyles } from "@/styles/indexStyles";

export default function Index() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [totalConnectedUsers, setTotalConnectedUsers] = useState(0);
  const messageRef = useRef<MessagesRef>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      messageRef.current?.sendMessage(message);
      setMessage("");
    }
  };

  const handleChangeMessage = (text: string) => {
    setMessage(text);
    // Burada typing eventi gönderilebilir
  };

  const handleUpdateConnectedUsers = (count: number) => {
    console.log("Updating connected users:", count); // Debug için
    setTotalConnectedUsers(count);
  };

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
              value="Anonymus"
              onChangeText={() => {}}
              style={indexStyles.primaryText}
              editable={false}
            />
          </View>

          <Pressable
            onPress={() => setDarkMode(!darkMode)}
            style={indexStyles.headerRight}
          >
            <MaterialIcons
              name={darkMode ? "dark-mode" : "light-mode"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View style={indexStyles.primarySection}>
          <Messages
            ref={messageRef}
            onUpdateConnectedUsers={handleUpdateConnectedUsers}
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

        <Text style={indexStyles.connectedUsers}>
          Online Users: {totalConnectedUsers}
        </Text>
      </View>
    </LinearGradient>
  );
}
