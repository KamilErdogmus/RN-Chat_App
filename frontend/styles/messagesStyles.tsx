import { StyleSheet } from "react-native";

export const messagesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 10,
    paddingBottom: 50,
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
  connectionStatus: {
    textAlign: "center",
    padding: 8,
    backgroundColor: "#FFE58F",
    color: "#D46B08",
    position: "absolute",
  },
  connectedUsers: {
    textAlign: "center",
    padding: 8,
    fontSize: 12,
    color: "#666666",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});
