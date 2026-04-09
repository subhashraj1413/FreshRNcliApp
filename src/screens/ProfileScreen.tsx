import { AppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

type ProfileScreenProps = {
  onToggleTheme: () => void;
};

export const ProfileScreen = ({ onToggleTheme }: ProfileScreenProps) => {
  const { mode, theme } = useTheme();

  return (
    <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
      <Card style={styles.panel}>
        <AppText variant="captionBold">Profile</AppText>
        <AppText variant="h1">Sample settings tab</AppText>
        <AppText variant="muted">
          Keep one lightweight tab for account or preferences while you flesh out
          the rest of the app structure.
        </AppText>

        <View
          style={[
            styles.preferenceRow,
            {
              backgroundColor: theme.surfaceStrong,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.preferenceCopy}>
            <AppText variant="bodyBold">Theme mode</AppText>
            <AppText variant="caption">
              Currently using {mode === "dark" ? "dark" : "light"} appearance.
            </AppText>
          </View>
          <AppButton
            label={mode === "dark" ? "Use light" : "Use dark"}
            onPress={onToggleTheme}
            size="sm"
            variant="secondary"
          />
        </View>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  panel: {
    gap: 16,
  },
  preferenceCopy: {
    flex: 1,
    gap: 4,
  },
  preferenceRow: {
    alignItems: "flex-start",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
});
