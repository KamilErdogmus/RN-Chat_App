import { StyleSheet } from "react-native";

export const typingUserStyles = StyleSheet.create({
  flatListContent: {
    padding: 10,
  },
  typingWrapper: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  typingBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
    maxWidth: "90%",
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
  },
  connectedUsers: {
    textAlign: "center",
    padding: 8,
    fontSize: 12,
    color: "#666",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});
