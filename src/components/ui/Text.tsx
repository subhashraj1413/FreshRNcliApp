import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyBold"
  | "caption"
  | "captionBold"
  | "label"
  | "link"
  | "error"
  | "muted";

type Align = "left" | "center" | "right";

interface AppTextProps extends TextProps {
  variant?: Variant;
  align?: Align;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  align = "left",
  color,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const variantStyles: Record<Variant, TextStyle> = {
    h1: {
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 36,
      color: theme.primaryText,
    },
    h2: {
      fontSize: 22,
      fontWeight: "700",
      lineHeight: 30,
      color: theme.primaryText,
    },
    h3: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 26,
      color: theme.primaryText,
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      color: theme.primaryText,
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 24,
      color: theme.primaryText,
    },
    caption: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 18,
      color: theme.secondaryText,
    },
    captionBold: {
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 18,
      color: theme.secondaryText,
    },
    label: {
      fontSize: 13,
      fontWeight: "500",
      lineHeight: 20,
      color: theme.placeholder,
      letterSpacing: 0.3,
    },
    link: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      color: theme.accent,
      textDecorationLine: "underline",
    },
    error: {
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 18,
      color: theme.danger,
    },
    muted: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      color: theme.secondaryText,
    },
  };

  return (
    <Text
      style={[
        variantStyles[variant],
        {
          textAlign: align,
        },
        color ? { color } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
