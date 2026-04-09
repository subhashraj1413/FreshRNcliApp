import React from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";

type AppIconProps = {
  color?: string;
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
};

export const AppIcon = ({ color, name, size = 22 }: AppIconProps) => {
  return <Ionicons color={color} name={name} size={size} />;
};
