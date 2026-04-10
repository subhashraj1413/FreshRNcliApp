import { AppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { fetchProducts } from "@/api/products";
import { Product } from "@/data/products";
import { useTheme } from "@/hooks/useTheme";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import React from "react";
import { AsyncStatus } from "@/types/global";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type ProductsScreenProps = {
  description: string;
  heading: string;
  kicker: string;
  onSelectProduct: (productId: string) => void;
};

type ProductListItemProps = {
  accent: string;
  accentBorder: string;
  accentSoft: string;
  border: string;
  item: Product;
  onSelectProduct: (productId: string) => void;
  secondaryText: string;
  surfaceStrong: string;
};

const ProductListSeparator = React.memo(() => <View style={styles.separator} />);

const ProductListItem = React.memo(
  ({
    accent,
    accentBorder,
    accentSoft,
    border,
    item,
    onSelectProduct,
    secondaryText,
    surfaceStrong,
  }: ProductListItemProps) => {
    
    return (
      <Card style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productCopy}>
            <AppText variant="bodyBold">{item.name}</AppText>
            <AppText variant="caption">{item.subtitle}</AppText>
          </View>
          <View
            style={[
              styles.pricePill,
              {
                backgroundColor: accentSoft,
                borderColor: accentBorder,
              },
            ]}
          >
            <AppText variant="captionBold" color={accent}>
              {item.price}
            </AppText>
          </View>
        </View>

        <View
          style={[
            styles.categoryPill,
            {
              backgroundColor: surfaceStrong,
              borderColor: border,
            },
          ]}
        >
          <AppText variant="label" color={secondaryText}>
            {item.category}
          </AppText>
        </View>
        <AppButton
          label="View details"
          onPress={() => onSelectProduct(item.id)}
          size="sm"
          variant="ghost"
        />
      </Card>
    );
  },
);

export const ProductsScreen = ({
  description,
  heading,
  kicker,
  onSelectProduct,
}: ProductsScreenProps) => {
  const { theme } = useTheme();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<AsyncStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [reloadKey, setReloadKey] = React.useState(0);
  const debouncedQuery = useDebouncedValue(query, 400);
  const resultSummary = React.useMemo(() => {
    if (status === "loading" && products.length > 0) {
      return "Refreshing results...";
    }

    return `${products.length} result${products.length === 1 ? "" : "s"}`;
  }, [products.length, status]);

  React.useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const nextProducts = await fetchProducts(debouncedQuery, controller.signal);
        React.startTransition(() => {
          setProducts(nextProducts);
        });
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load products right now.",
        );
      }
    };

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, reloadKey]);

  const renderProductCard = React.useCallback(
    ({ item }: ListRenderItemInfo<Product>) => {
      return (
        <ProductListItem
          accent={theme.accent}
          accentBorder={theme.accentBorder}
          accentSoft={theme.accentSoft}
          border={theme.border}
          item={item}
          onSelectProduct={onSelectProduct}
          secondaryText={theme.secondaryText}
          surfaceStrong={theme.surfaceStrong}
        />
      );
    },
    [onSelectProduct, theme],
  );

  const emptyState = React.useMemo(() => {
    if (status === "loading" && products.length === 0) {
      return (
        <View style={styles.feedbackCard}>
          <ActivityIndicator color={theme.accent} size="small" />
          <AppText variant="caption">Loading products...</AppText>
        </View>
      );
    }

    if (status === "error") {
      return (
        <Card style={styles.feedbackCard}>
          <AppText variant="bodyBold">Could not load products</AppText>
          <AppText variant="caption">{errorMessage}</AppText>
          <AppButton
            label="Retry"
            onPress={() => {
              setReloadKey(currentValue => currentValue + 1);
            }}
            size="sm"
            variant="secondary"
          />
        </Card>
      );
    }

    return (
      <Card style={styles.feedbackCard}>
        <AppText variant="bodyBold">No products found</AppText>
        <AppText variant="caption">
          Try another search term or clear the query.
        </AppText>
      </Card>
    );
  }, [errorMessage, products.length, status, theme.accent]);

  const listHeader = React.useMemo(() => {
    return (
      <View style={styles.header}>
        <AppText variant="captionBold">{kicker}</AppText>
        <AppText variant="h1">{heading}</AppText>
        <AppText variant="muted">{description}</AppText>

        <View
          style={[
            styles.searchWrap,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setQuery}
            placeholder="Search products"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.searchInput,
              {
                color: theme.primaryText,
              },
            ]}
            value={query}
          />
          {query ? (
            <AppButton
              label="Clear"
              onPress={() => setQuery("")}
              size="sm"
              variant="ghost"
            />
          ) : null}
        </View>

        <View style={styles.summaryRow}>
          <AppText variant="caption">{resultSummary}</AppText>
          {debouncedQuery ? (
            <AppText variant="caption">Search: “{debouncedQuery}”</AppText>
          ) : null}
        </View>
      </View>
    );
  }, [
    debouncedQuery,
    description,
    heading,
    kicker,
    query,
    resultSummary,
    theme.border,
    theme.inputBackground,
    theme.placeholder,
    theme.primaryText,
  ]);

  return (
    <Screen insetTop={false} style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.content}
        data={products}
        ItemSeparatorComponent={ProductListSeparator}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.id}
        ListEmptyComponent={emptyState}
        ListHeaderComponent={listHeader}
        renderItem={renderProductCard}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 20,
  },
  feedbackCard: {
    alignItems: "center",
    gap: 12,
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
  screen: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchWrap: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingRight: 8,
  },
  separator: {
    height: 14,
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
