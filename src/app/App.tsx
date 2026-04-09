import { useTheme } from "@/hooks/useTheme";
import { AppNavigator } from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
