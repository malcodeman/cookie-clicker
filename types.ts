import { ColorMode } from "@chakra-ui/react";

type ChakraThemeConfig = {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
};
type Upgrade = {
  id: string;
  name: string;
  price: number;
  count: number;
  hidden: boolean;
};

export type { ChakraThemeConfig, Upgrade };
