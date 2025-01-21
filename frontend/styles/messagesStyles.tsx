import { StyleSheet } from "react-native";

export const messagesStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  messagesContainer: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  flatListContent: {
    padding: 10,
    paddingBottom: 60,
  },
  messageWrapper: {
    position: "relative",
    marginVertical: 4,
    maxWidth: "80%",
    alignSelf: "flex-start",
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

  messageOuterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    maxWidth: "80%",
    alignSelf: "flex-start",
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
  typingOverlayContainer: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  typingContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 100,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  typingText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
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
  editInput: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 14,
    color: "#000",
    minHeight: 40,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
  },
  edited: { fontSize: 12 },
  editSendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
