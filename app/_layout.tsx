import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GlobalProvider } from "../store/GlobalContext";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="disclaimer" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="note-detail" options={{ gestureEnabled: true }} />
      </Stack>
    </GlobalProvider>
  );
}
