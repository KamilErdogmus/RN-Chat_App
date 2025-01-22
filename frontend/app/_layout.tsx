import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const metadata = {
    title: `Chat App `,
    description: "Real-time chat application",
  };

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: metadata.title,
        }}
      />
    </Stack>
  );
}
