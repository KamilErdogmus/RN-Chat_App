import { Text, View, FlatList } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSocket } from "@/hooks/useSocket";
import { messagesStyles } from "@/styles/messagesStyles";
import moment from "moment";
import { formatMessage } from "@/hooks/formatMessages";
import RenderMessage from "./RenderMessage";
import { typingUserStyles } from "@/styles/typingUserStyles";

const Messages = forwardRef<MessagesRef, MessagesProps>(
  ({ onUpdateConnectedUsers }, ref) => {
    const { socket, isConnected } = useSocket();
    const [currentUsername, setCurrentUsername] = useState("Anonymous");
    const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);
    const [editText, setEditText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
    const [totalConnectedUsers, setTotalConnectedUsers] = useState(0);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const flatListRef = useRef<FlatList<IMessage>>(null);

    const handleLongPress = (messageId: string) =>
      setSelectedMessage(messageId);

    const handleDeleteMessage = (messageId: string) => {
      socket?.emit("delete_message", { messageId });
      setSelectedMessage(null);
    };

    const handleEditMessage = (messageId: string) => {
      const message = messages.find((msg) => msg.id === messageId);
      if (message) {
        setEditingMessage(message);
        setEditText(message.text);
        setSelectedMessage(null);
      }
    };

    const handleSaveEdit = () => {
      if (!editingMessage || !editText.trim()) return;
      socket?.emit("edit_message", {
        messageId: editingMessage.id,
        newText: editText.trim(),
      });
      setEditingMessage(null);
      setEditText("");
    };

    const sendMessage = (text: string) => {
      if (!socket || !text.trim()) return;
      const newMessage: IMessage = {
        id: Date.now().toString(),
        text: text.trim(),
        isUser: true,
        username: currentUsername,
        timestamp: moment().format("HH:mm"),
      };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send_message", newMessage);
    };

    useImperativeHandle(ref, () => ({
      sendMessage,
      setUsername: (username: string) => {
        setCurrentUsername(username);
        socket?.emit("set_username", username);
      },
      sendTyping: () => socket?.emit("typing_start"),
    }));

    useEffect(() => {
      if (!socket) return;

      const eventHandlers = {
        users_count: (count: number) => {
          setTotalConnectedUsers(count);
          onUpdateConnectedUsers?.(count);
        },
        typing_users_updated: (users: TypingUser[]) => {
          setTypingUsers(users.filter((user) => user.id !== socket.id));
        },
        receive_message: (message: IMessage) => {
          setMessages((prev) => [...prev, formatMessage(message)]);
        },
        message_deleted: (messageId: string) => {
          setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        },
        message_edited: ({
          messageId,
          newText,
        }: {
          messageId: string;
          newText: string;
        }) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? { ...msg, text: newText, edited: true }
                : msg
            )
          );
        },
        username_changed: ({
          userId,
          newUsername,
          updatedMessages,
        }: {
          userId: string;
          newUsername: string;
          updatedMessages: Array<{ messageId: string }>;
        }) => {
          setMessages((prev) =>
            prev.map((msg) =>
              updatedMessages.some((update) => update.messageId === msg.id)
                ? { ...msg, username: newUsername }
                : msg
            )
          );
        },
      };

      // Event listeners'ları ekle
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });

      // Cleanup
      return () => {
        Object.keys(eventHandlers).forEach((event) => {
          socket.off(event);
        });
      };
    }, [socket, onUpdateConnectedUsers]);

    useEffect(() => {
      if (messages.length > 0) {
        const timer = setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [messages]);

    return (
      <View style={messagesStyles.container}>
        {!isConnected && (
          <Text style={messagesStyles.connectionStatus}>
            Connecting to server...
          </Text>
        )}
        <View style={messagesStyles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <RenderMessage
                item={item}
                editingMessage={editingMessage}
                editText={editText}
                selectedMessage={selectedMessage}
                onLongPress={handleLongPress}
                onEditText={setEditText}
                onSaveEdit={handleSaveEdit}
                onDelete={handleDeleteMessage}
                onEdit={handleEditMessage}
                onCloseModal={() => setSelectedMessage(null)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              messagesStyles.flatListContent,
              { paddingBottom: typingUsers.length > 0 ? 100 : 60 },
            ]}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
          {typingUsers.length > 0 && (
            <View style={typingUserStyles.typingWrapper}>
              <View style={typingUserStyles.typingBubble}>
                <Text style={typingUserStyles.typingText}>
                  ✍️ {typingUsers.map((user) => user.username).join(", ")}
                  {typingUsers.length === 1 ? " is" : " are"} typing...
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
);

export default Messages;
