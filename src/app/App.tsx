import { useTheme } from "@/hooks/useTheme";
import { AppNavigator } from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const { mode } = useTheme();

  return (
    <>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
      <AppNavigator />
    </>
  );
}

export default App;
