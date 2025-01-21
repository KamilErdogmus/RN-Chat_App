import { messagesStyles } from "@/styles/messagesStyles";
import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import ReactionModal from "./ReactionModal";
import { MaterialIcons } from "@expo/vector-icons";

const RenderMessage = ({
  item,
  editingMessage,
  editText,
  selectedMessage,
  onLongPress,
  onEditText,
  onSaveEdit,
  onDelete,
  onEdit,
  onCloseModal,
}: RenderMessageProps) => {
  const isEditing = editingMessage?.id === item.id;
  const messageStyle = item.isUser
    ? messagesStyles.userMessageWrapper
    : messagesStyles.otherMessageWrapper;
  const containerStyle = item.isUser
    ? messagesStyles.userMessageContainer
    : messagesStyles.otherMessageContainer;
  const textStyle = item.isUser
    ? messagesStyles.userMessageText
    : messagesStyles.otherMessageText;

  return (
    <View style={[messagesStyles.messageOuterWrapper, messageStyle]}>
      {selectedMessage === item.id && (
        <ReactionModal
          isUser={item.isUser}
          messageId={item.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onClose={onCloseModal}
        />
      )}
      <Pressable
        onLongPress={() => onLongPress(item.id)}
        style={[messagesStyles.messageContainer, containerStyle]}
      >
        {isEditing ? (
          <View style={messagesStyles.editContainer}>
            <TextInput
              value={editText}
              onChangeText={onEditText}
              style={messagesStyles.editInput}
              multiline
              autoFocus
              onSubmitEditing={onSaveEdit}
              blurOnSubmit={false}
            />
            <Pressable
              style={[
                messagesStyles.editSendButton,
                { opacity: editText.trim() ? 1 : 0.5 },
              ]}
              onPress={onSaveEdit}
              disabled={!editText.trim()}
            >
              <MaterialIcons name="send" size={20} color="#6C5CE7" />
            </Pressable>
          </View>
        ) : (
          <Text style={[messagesStyles.messageText, textStyle]}>
            {item.text}
          </Text>
        )}
        <View style={messagesStyles.messageFooter}>
          {!item.isUser && (
            <>
              <Text style={messagesStyles.username}>{item.username}</Text>
              <Text style={messagesStyles.bullet}>&bull;</Text>
            </>
          )}
          {item.edited && <Text style={messagesStyles.edited}>Edited</Text>}
          <Text
            style={[
              messagesStyles.timestamp,
              { justifyContent: item.isUser ? "flex-end" : "center" },
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default RenderMessage;
