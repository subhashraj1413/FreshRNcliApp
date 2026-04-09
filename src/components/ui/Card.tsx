import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export const Card = ({ children, style }: CardProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
});
