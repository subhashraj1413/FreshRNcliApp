import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "@/components/ui/Text";

type ButtonVariant = "ghost" | "primary" | "secondary";
type ButtonSize = "md" | "sm";

type AppButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const AppButton = ({
  label,
  loading = false,
  size = "md",
  style,
  variant = "primary",
  disabled,
  ...rest
}: AppButtonProps) => {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => {
        const variantStyle =
          variant === "primary"
            ? {
                backgroundColor: theme.accent,
                borderColor: theme.accent,
              }
            : variant === "secondary"
              ? {
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.accentBorder,
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: theme.border,
                };

        const sizeStyle = size === "sm" ? styles.smallButton : styles.mediumButton;

        return [
          styles.base,
          sizeStyle,
          variantStyle,
          pressed && !isDisabled ? { opacity: 0.88 } : null,
          isDisabled ? { opacity: 0.6 } : null,
          style,
        ];
      }}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={variant === "primary" ? theme.onAccent : theme.accent}
            size="small"
          />
        ) : (
          <AppText
            variant={size === "sm" ? "label" : "bodyBold"}
            color={variant === "primary" ? theme.onAccent : theme.primaryText}
          >
            {label}
          </AppText>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  mediumButton: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  smallButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
