import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { products } from "@/data/products";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

type ProductDetailsScreenProps = {
  productId: string;
};

export const ProductDetailsScreen = ({
  productId,
}: ProductDetailsScreenProps) => {
  const { theme } = useTheme();
  const product = products.find(item => item.id === productId);

  if (!product) {
    return (
      <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
        <Card style={styles.panel}>
          <AppText variant="h2">Product not found</AppText>
          <AppText variant="muted">
            The sample product data does not include this item.
          </AppText>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
      <Card style={styles.hero}>
        <View
          style={[
            styles.categoryPill,
            {
              backgroundColor: theme.accentSoft,
              borderColor: theme.accentBorder,
            },
          ]}
        >
          <AppText variant="label" color={theme.accent}>
            {product.category}
          </AppText>
        </View>

        <AppText variant="h1">{product.name}</AppText>
        <AppText variant="muted">{product.subtitle}</AppText>
        <AppText variant="h3">{product.price}</AppText>
      </Card>

      <Card style={styles.panel}>
        <AppText variant="label">Overview</AppText>
        <AppText variant="body">
          This product detail screen is part of the nested stack flow. Use it as
          the base for variant pickers, media galleries, or add-to-cart actions.
        </AppText>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  categoryPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  content: {
    gap: 16,
  },
  hero: {
    gap: 12,
  },
  panel: {
    gap: 10,
  },
});
