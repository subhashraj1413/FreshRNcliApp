import { AppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { products } from "@/data/products";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

type HomeScreenProps = {
  onOpenProductsTab: () => void;
  onOpenStackProducts: () => void;
};

export const HomeScreen = ({
  onOpenProductsTab,
  onOpenStackProducts,
}: HomeScreenProps) => {
  const { theme } = useTheme();

  return (
    <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
      <Card style={styles.heroCard}>
        <AppText variant="captionBold">Home</AppText>
        <AppText variant="h1">Sample tab app with themed components</AppText>
        <AppText variant="muted">
          This starter layout gives you a home screen, a products list, and an
          extra sample tab to extend from.
        </AppText>

        <View style={styles.heroStats}>
          <View
            style={[
              styles.statPill,
              {
                backgroundColor: theme.accentSoft,
                borderColor: theme.accentBorder,
              },
            ]}
          >
            <AppText variant="captionBold" color={theme.accent}>
              {products.length} items
            </AppText>
          </View>
          <View
            style={[
              styles.statPill,
              {
                backgroundColor: theme.surfaceStrong,
                borderColor: theme.border,
              },
            ]}
          >
            <AppText variant="captionBold">3 tabs</AppText>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.actionCell}>
            <AppButton label="Open products tab" onPress={onOpenProductsTab} />
          </View>
          <View style={styles.actionCell}>
            <AppButton
              label="Push products"
              onPress={onOpenStackProducts}
              variant="secondary"
            />
          </View>
        </View>
      </Card>

      <View style={styles.grid}>
        <Card style={styles.panel}>
          <AppText variant="label">Quick summary</AppText>
          <View style={styles.stack}>
            <AppText variant="bodyBold">Theme-driven UI</AppText>
            <AppText variant="caption">
              Surfaces, typography, and actions inherit from the same token set.
            </AppText>
          </View>
        </Card>

        <Card style={styles.panel}>
          <AppText variant="label">Suggested next steps</AppText>
          <View style={styles.stack}>
            <AppText variant="body">Connect the products tab to real API data.</AppText>
            <AppText variant="body">Replace sample tabs with your app sections.</AppText>
          </View>
        </Card>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  actionCell: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  content: {
    gap: 16,
  },
  grid: {
    gap: 16,
  },
  heroCard: {
    gap: 16,
  },
  heroStats: {
    flexDirection: "row",
    gap: 10,
  },
  panel: {
    gap: 10,
  },
  stack: {
    gap: 6,
  },
  statPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
