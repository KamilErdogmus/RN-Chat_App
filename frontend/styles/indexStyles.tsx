import { COLORS } from "@/constants/Colors";
import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  primarySection: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F0F0F0",
    padding: 16,
  },
  innerContainer: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    flex: 1,
    backgroundColor: COLORS.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    ...(Platform.OS === "web" && {
      borderRadius: 20,
      margin: 20,
      minHeight: 700,
      maxHeight: "95vh",
    }),
  } as ViewStyle,
  inputContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerRight: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  } as TextStyle,
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#000000",
    fontFamily: "SpaceMono",
  },
  connectedUsers: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "red",
    color: "#fff",
    fontSize: 12,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    padding: 5,
  },
});
