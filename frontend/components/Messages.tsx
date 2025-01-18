import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { getData } from "@/service/api";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  username: string;
  timestamp: string;
}

const Messages = () => {
  const [data, setData] = useState(null);
  const [typing, setTyping] = useState<boolean>(true);
  const flatListRef = useRef<FlatList<Message>>(null);
  const [messages, setMessages] = useState([
    { id: "1", text: "111", isUser: true, username: "You", timestamp: "09:00" },
    {
      id: "2",
      text: "222s2",
      isUser: true,
      username: "You",
      timestamp: "09:01",
    },
    {
      id: "3",
      text: "444",
      isUser: false,
      username: "John",
      timestamp: "09:02",
    },
    {
      id: "4",
      text: "555",
      isUser: false,
      username: "John",
      timestamp: "09:03",
    },
    {
      id: "5",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "6",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "7",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "8",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "9",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "11",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "112",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "113",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "114",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
    {
      id: "121",
      text: "666",
      isUser: false,
      username: "John",
      timestamp: "09:04",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setData(response.data);
        console.log("başarılı");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = ({
    item,
  }: {
    item: {
      text: string;
      isUser: boolean;
      username: string;
      timestamp: string;
    };
  }) => (
    <View
      style={[
        styles.messageWrapper,
        item.isUser ? styles.userMessageWrapper : styles.otherMessageWrapper,
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          item.isUser
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isUser ? styles.userMessageText : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.bullet}>&bull;</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingBottom: typing ? 80 : 30 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        ListFooterComponent={
          typing ? (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>✍️ John is typing...</Text>
            </View>
          ) : null
        }
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        onLayout={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        ref={flatListRef}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 10,
  },
  messageWrapper: {
    marginVertical: 5,
    maxWidth: "70%",
  },
  userMessageWrapper: {
    alignSelf: "flex-end",
  },
  otherMessageWrapper: {
    alignSelf: "flex-start",
  },
  messageContainer: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userMessageContainer: {
    backgroundColor: "#DCF8C6",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  otherMessageContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#000000",
  },
  userMessageText: {
    color: "#000000",
  },
  otherMessageText: {
    color: "#000000",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 4,
  },
  username: {
    fontSize: 12,
    color: "#666666",
    marginRight: 4,
  },
  bullet: {
    fontSize: 12,
    color: "#666666",
    marginHorizontal: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  typingContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 8,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
  typingText: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },
});
