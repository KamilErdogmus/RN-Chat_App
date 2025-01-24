import { hp, wp, isWeb } from "@/constants/Constants";
import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  primarySection: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F0F0F0",
    padding: isWeb ? 16 : wp(4),
  },
  innerContainer: {
    width: "100%",
    maxWidth: isWeb ? 600 : "100%",
    flex: 1,
    backgroundColor: "#F5F7FF",
    ...(isWeb
      ? {
          borderRadius: 20,
          margin: 20,
          minHeight: 700,
          maxHeight: "95vh",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }),
  } as ViewStyle,
  inputContainer: {
    position: "absolute",
    bottom: isWeb ? 16 : hp(2),
    left: isWeb ? 16 : wp(4),
    right: isWeb ? 16 : wp(4),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: isWeb ? 15 : wp(4),
    paddingVertical: isWeb ? 8 : hp(1),
    ...(isWeb
      ? {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isWeb ? 16 : wp(4),
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: isWeb ? 10 : wp(2.5),
  },
  headerRight: {
    flexDirection: "row",
    gap: isWeb ? 5 : wp(1.5),
  },
  profilePic: {
    width: isWeb ? 40 : wp(10),
    height: isWeb ? 40 : wp(10),
    borderRadius: isWeb ? 20 : wp(5),
  },
  primaryText: {
    fontSize: isWeb ? 24 : wp(5),
    fontWeight: "500",
    fontFamily: "SpaceMono",
  } as TextStyle,
  input: {
    flex: 1,
    fontSize: isWeb ? 16 : wp(4),
    maxHeight: isWeb ? 100 : hp(10),
    paddingVertical: isWeb ? 8 : hp(1),
    color: "#000000",
    fontFamily: "SpaceMono",
  },
  connectedUsers: {
    textAlign: "center",
    padding: isWeb ? 8 : wp(2),
    borderRadius: 12,
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    fontSize: isWeb ? 14 : wp(3.5),
  },
  sendButton: {
    marginLeft: isWeb ? 10 : wp(2.5),
    padding: isWeb ? 5 : wp(1.25),
  },
  usernameEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: isWeb ? 8 : wp(2),
    paddingHorizontal: isWeb ? 8 : wp(2),
    paddingVertical: isWeb ? 4 : hp(0.5),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      },
    }),
  },
  usernameInput: {
    fontSize: isWeb ? 16 : wp(4),
    fontWeight: "500",
    color: "#000",
    minWidth: isWeb ? 120 : wp(30),
    padding: isWeb ? 4 : wp(1),
    fontFamily: "SpaceMono",
  },
  usernameSubmitButton: {
    padding: isWeb ? 4 : wp(1),
    marginLeft: isWeb ? 8 : wp(2),
    borderRadius: isWeb ? 4 : wp(1),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});
