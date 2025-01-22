import { isWeb, wp } from "@/constants/Constants";
import { Platform, StyleSheet } from "react-native";

export const reactionModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: isWeb ? 8 : wp(2),
    flexDirection: "row",
    padding: isWeb ? 4 : wp(1),
    gap: isWeb ? 4 : wp(1),
    marginRight: isWeb ? 8 : wp(2),
    ...(isWeb
      ? {
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }
      : Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          },
          android: {
            elevation: 3,
          },
        })),
  },
  button: {
    padding: Platform.select({
      web: wp(0.5),
      ios: wp(2),
      android: wp(2),
    }),
    borderRadius: wp(1.5),
    backgroundColor: "#f5f5f5",
    minWidth: Platform.select({
      web: wp(4),
      ios: wp(15),
      android: wp(15),
    }),
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#ebebeb",
        },
      },
    }),
  },
  buttonText: {
    fontSize: Platform.select({
      web: wp(0.9),
      ios: wp(3.2),
      android: wp(3.2),
    }),
    color: "#333",
    fontWeight: "500",
  },
  deleteText: {
    color: "#FF3B30",
  },
});
