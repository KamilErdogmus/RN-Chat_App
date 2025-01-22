import { hp, isWeb, wp } from "@/constants/Constants";
import { Platform, StyleSheet } from "react-native";

export const typingUserStyles = StyleSheet.create({
  flatListContent: {
    padding: isWeb ? 10 : wp(2.5),
  },
  typingWrapper: {
    position: "absolute",
    bottom: isWeb ? 70 : hp(8),
    left: 0,
    right: 0,
    paddingHorizontal: isWeb ? 10 : wp(2.5),
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 1000,
  },
  typingBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e0e0",
    minWidth: Platform.select({
      web: wp(8),
      ios: wp(30),
      android: wp(30),
    }),
    maxWidth: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
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
    padding: Platform.select({
      web: wp(0.5),
      ios: wp(2),
      android: wp(2),
    }),
    backgroundColor: "#FFE58F",
    color: "#D46B08",
    fontSize: Platform.select({
      web: wp(1),
      ios: wp(3.5),
      android: wp(3.5),
    }),
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  connectedUsers: {
    textAlign: "center",
    padding: Platform.select({
      web: wp(0.5),
      ios: wp(2),
      android: wp(2),
    }),
    fontSize: Platform.select({
      web: wp(0.9),
      ios: wp(3),
      android: wp(3),
    }),
    color: "#666",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: wp(1),
    marginVertical: hp(1),
    ...Platform.select({
      web: {
        maxWidth: "50%",
        alignSelf: "center",
      },
    }),
  },
});
