import { Platform, StyleSheet } from "react-native";

export const reactionModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    padding: 4,
    gap: 4,
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  button: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  deleteText: {
    color: "#FF3B30",
  },
});
