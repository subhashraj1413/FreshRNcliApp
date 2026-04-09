import { AppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { products } from "@/data/products";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

type ProductsScreenProps = {
  description: string;
  heading: string;
  kicker: string;
  onSelectProduct: (productId: string) => void;
};

export const ProductsScreen = ({
  description,
  heading,
  kicker,
  onSelectProduct,
}: ProductsScreenProps) => {
  const { theme } = useTheme();

  return (
    <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
      <View style={styles.header}>
        <AppText variant="captionBold">{kicker}</AppText>
        <AppText variant="h1">{heading}</AppText>
        <AppText variant="muted">{description}</AppText>
      </View>

      {products.map(product => (
        <Card key={product.id} style={styles.productCard}>
          <View style={styles.productHeader}>
            <View style={styles.productCopy}>
              <AppText variant="bodyBold">{product.name}</AppText>
              <AppText variant="caption">{product.subtitle}</AppText>
            </View>
            <View
              style={[
                styles.pricePill,
                {
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.accentBorder,
                },
              ]}
            >
              <AppText variant="captionBold" color={theme.accent}>
                {product.price}
              </AppText>
            </View>
          </View>

          <View
            style={[
              styles.categoryPill,
              {
                backgroundColor: theme.surfaceStrong,
                borderColor: theme.border,
              },
            ]}
          >
            <AppText variant="label" color={theme.secondaryText}>
              {product.category}
            </AppText>
          </View>
          <AppButton
            label="View details"
            onPress={() => onSelectProduct(product.id)}
            size="sm"
            variant="ghost"
          />
        </Card>
      ))}
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
    gap: 14,
  },
  header: {
    gap: 8,
    marginBottom: 4,
  },
  pricePill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  productCard: {
    gap: 14,
  },
  productCopy: {
    flex: 1,
    gap: 4,
  },
  productHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
});
