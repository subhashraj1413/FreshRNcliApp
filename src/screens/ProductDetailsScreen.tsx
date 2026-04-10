import { fetchProductById } from "@/api/products";
import { AppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { products, Product } from "@/data/products";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { AsyncStatus } from "@/types/global";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

type ProductDetailsScreenProps = {
  productId: string;
};

export const ProductDetailsScreen = ({
  productId,
}: ProductDetailsScreenProps) => {
  const { theme } = useTheme();
  const fallbackProduct = React.useMemo(
    () => products.find(item => item.id === productId) ?? null,
    [productId],
  );
  const [product, setProduct] = React.useState<Product | null>(
    fallbackProduct,
  );
  const [status, setStatus] = React.useState<AsyncStatus>(
    fallbackProduct ? "success" : "loading",
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [reloadKey, setReloadKey] = React.useState(0);
  const overviewText = React.useMemo(() => {
    return (
      product?.description ??
      "This product detail screen is part of the nested stack flow. Use it as the base for variant pickers, media galleries, or add-to-cart actions."
    );
  }, [product?.description]);

  React.useEffect(() => {
    setProduct(fallbackProduct);
    setStatus(fallbackProduct ? "success" : "loading");
    setErrorMessage(null);
  }, [fallbackProduct, productId]);

  React.useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const nextProduct = await fetchProductById(productId, controller.signal);
        setProduct(nextProduct);
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load product details.",
        );
      }
    };

    loadProduct();

    return () => {
      controller.abort();
    };
  }, [productId, reloadKey]);

  if (status === "loading" && !product) {
    return (
      <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
        <Card style={styles.panel}>
          <ActivityIndicator color={theme.accent} size="small" />
          <AppText variant="caption">Loading product details...</AppText>
        </Card>
      </Screen>
    );
  }

  if (!product) {
    return (
      <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
        <Card style={styles.panel}>
          <AppText variant="h2">Product not found</AppText>
          <AppText variant="muted">{errorMessage ?? "This item is unavailable."}</AppText>
          {status === "error" ? (
            <AppButton
              label="Retry"
              onPress={() => {
                setReloadKey(currentValue => currentValue + 1);
              }}
              size="sm"
              variant="secondary"
            />
          ) : null}
        </Card>
      </Screen>
    );
  }

  return (
    <Screen scroll contentContainerStyle={styles.content} insetTop={false}>
      <Card style={styles.hero}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.productImage} />
        ) : null}
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
        <AppText variant="body">{overviewText}</AppText>
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
    alignItems: "flex-start",
    gap: 10,
  },
  productImage: {
    borderRadius: 18,
    height: 220,
    width: "100%",
  },
});
