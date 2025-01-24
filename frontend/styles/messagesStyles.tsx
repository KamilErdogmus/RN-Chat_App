import { hp, isWeb, wp } from "@/constants/Constants";
import { Platform, StyleSheet, ViewStyle } from "react-native";

const MESSAGE_MAX_WIDTH = "80%";

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
    padding: isWeb ? 10 : wp(2.5),
    paddingBottom: isWeb ? 60 : hp(8),
  },
  messageWrapper: {
    position: "relative",
    marginVertical: isWeb ? 4 : hp(0.5),
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
    borderRadius: isWeb ? 12 : wp(4),
    paddingHorizontal: isWeb ? 12 : wp(2.5),
    paddingVertical: isWeb ? 8 : hp(1),
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        minWidth: "80px",
        maxWidth: "100%",
        wordBreak: "break-word",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        },
      },
    }),
  } as ViewStyle,
  messageOuterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(0.4),
    maxWidth: MESSAGE_MAX_WIDTH,
    alignSelf: "flex-start",
  },
  userMessageContainer: {
    backgroundColor: "#DCF8C6",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: isWeb ? 12 : wp(4),
  },
  otherMessageContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: isWeb ? 12 : wp(4),
  },
  messageText: {
    fontSize: isWeb ? 14 : wp(4),
    marginBottom: isWeb ? 4 : hp(0.5),
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
    marginTop: hp(0.5),
  },
  username: {
    fontSize: Platform.select({
      web: wp(1.25),
      ios: wp(3),
      android: wp(3),
    }),
    color: "#666666",
    marginRight: 1,
    fontWeight: "bold",
  },
  bullet: {
    fontSize: Platform.select({
      web: wp(0.8),
      ios: wp(2.5),
      android: wp(2.5),
    }),
    color: "#666666",
    marginHorizontal: 1,
  },
  timestamp: {
    fontSize: Platform.select({
      web: wp(1.25),
      ios: wp(3),
      android: wp(3),
    }),
    color: "#666666",
    marginLeft: 2,
  },
  typingOverlayContainer: {
    position: "absolute",
    bottom: hp(9),
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  typingContainer: {
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    minWidth: wp(25),
    maxWidth: "90%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      },
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  typingText: {
    fontSize: Platform.select({
      web: wp(1),
      ios: wp(3.5),
      android: wp(3.5),
    }),
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  connectionStatus: {
    textAlign: "center",
    padding: wp(2),
    backgroundColor: "#FFE58F",
    color: "#D46B08",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  connectedUsers: {
    textAlign: "center",
    padding: wp(2),
    fontSize: Platform.select({
      web: wp(0.9),
      ios: wp(3),
      android: wp(3),
    }),
    color: "#666666",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  editInput: {
    padding: wp(2),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    fontSize: Platform.select({
      web: wp(1.1),
      ios: wp(3.5),
      android: wp(3.5),
    }),
    color: "#000",
    minHeight: hp(5),
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    gap: wp(2),
  },
  edited: {
    fontSize: Platform.select({
      web: wp(0.9),
      ios: wp(3),
      android: wp(3),
    }),
  },
  editSendButton: {
    width: wp(8),
    height: wp(8),
    maxWidth: 32,
    maxHeight: 32,
    borderRadius: wp(4),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      },
    }),
  },
});
