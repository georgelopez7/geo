import * as icons from "lucide-react-native";
import React from "react";

import { LucideIconProps } from "./lucide-icon.interface";

const NavIcon = ({ name, color, size, ...props }: LucideIconProps) => {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon color={color} size={size} {...props} />;
};

export default NavIcon;

export const LucideIcon = ({
  name,
  color,
  size,
  ...props
}: LucideIconProps) => {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon color={color} size={size} {...props} />;
};
