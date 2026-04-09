import React, { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
  insetBottom?: boolean;
  insetTop?: boolean;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export const Screen = ({
  children,
  contentContainerStyle,
  insetBottom = true,
  insetTop = true,
  scroll = false,
  style,
}: ScreenProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.base,
    {
      backgroundColor: theme.background,
      paddingBottom: insetBottom ? Math.max(insets.bottom, 20) : 20,
      paddingTop: insetTop ? Math.max(insets.top, 20) : 20,
    },
    style,
  ];

  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[containerStyle, contentContainerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
