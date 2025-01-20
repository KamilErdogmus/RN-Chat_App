import { Text, View, FlatList } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getData } from "@/service/api";
import { useSocket } from "@/hooks/useSocket";
import { dummyMessages } from "@/constants/dummy";
import { messagesStyles } from "@/styles/messagesStyles";

const Messages = forwardRef<MessagesRef, MessagesProps>(
  ({ onUpdateConnectedUsers }, ref) => {
    const { socket, isConnected } = useSocket();
    const [data, setData] = useState(null);
    const [typing, setTyping] = useState<boolean>(false);
    const [totalConnectedUsers, setTotalConnectedUsers] = useState(0);
    const flatListRef = useRef<FlatList<IMessage>>(null);
    const [messages, setMessages] = useState<IMessage[]>(dummyMessages);

    useImperativeHandle(ref, () => ({
      sendMessage,
    }));

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
      if (!socket) return;

      socket.on("users_count", (count: number) => {
        console.log("Users count received:", count);
        setTotalConnectedUsers(count);
        onUpdateConnectedUsers?.(count);
      });

      socket.on("receive_message", (message: IMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("user_typing", (data: { username: string }) => {
        setTyping(true);
        setTimeout(() => setTyping(false), 3000);
      });

      return () => {
        socket.off("users_count");
        socket.off("receive_message");
        socket.off("user_typing");
      };
    }, [socket, onUpdateConnectedUsers]);

    useEffect(() => {
      if (messages.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }, [messages]);

    const sendMessage = (text: string) => {
      if (!socket || !text.trim()) return;

      const newMessage: IMessage = {
        id: Date.now().toString(),
        text,
        isUser: true,
        username: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send_message", newMessage);
    };

    const sendTyping = () => {
      if (!socket) return;
      socket.emit("typing", { username: "You" });
    };

    const renderMessage = ({ item }: { item: IMessage }) => (
      <View
        style={[
          messagesStyles.messageWrapper,
          item.isUser
            ? messagesStyles.userMessageWrapper
            : messagesStyles.otherMessageWrapper,
        ]}
      >
        <View
          style={[
            messagesStyles.messageContainer,
            item.isUser
              ? messagesStyles.userMessageContainer
              : messagesStyles.otherMessageContainer,
          ]}
        >
          <Text
            style={[
              messagesStyles.messageText,
              item.isUser
                ? messagesStyles.userMessageText
                : messagesStyles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
          <View style={messagesStyles.messageFooter}>
            <Text style={messagesStyles.username}>{item.username}</Text>
            <Text style={messagesStyles.bullet}>&bull;</Text>
            <Text style={messagesStyles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={messagesStyles.container}>
        {!isConnected && (
          <Text style={messagesStyles.connectionStatus}>
            Connecting to server...
          </Text>
        )}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          keyExtractor={(item) => item.id}
          contentContainerStyle={messagesStyles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          ListFooterComponent={
            typing ? (
              <View style={messagesStyles.typingContainer}>
                <Text style={messagesStyles.typingText}>
                  ✍️ Someone is typing...
                </Text>
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
        {totalConnectedUsers > 0 && (
          <Text style={messagesStyles.connectedUsers}>
            Online Users: {totalConnectedUsers}
          </Text>
        )}
      </View>
    );
  }
);

export default Messages;
