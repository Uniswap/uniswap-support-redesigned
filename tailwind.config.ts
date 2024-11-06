import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
import type { PluginAPI } from "tailwindcss/types/config";

const rem = (px: number) => `${px / 16}rem`;

export const SCREEN_SIZE = {
  MOBILE: {
    min: 0,
    max: 767,
  },
  TABLET: {
    min: 768,
    max: 1279,
  },
  DESKTOP: {
    min: 1280,
    max: 1440,
  },
  XL_DESKTOP: {
    min: 1441,
    max: undefined,
  },
};

const config: Config = {
  content: ["./**/**/*.{ts,tsx,hbs}"],
  darkMode: "selector",
  theme: {
    screens: {
      /* Tablet */
      sm: `${SCREEN_SIZE.TABLET.min}px`,
      /* Desktop */
      md: `${SCREEN_SIZE.DESKTOP.min}px`,
      /* Max */
      lg: `${SCREEN_SIZE.XL_DESKTOP.min}px`,
    },
    extend: {
      borderRadius: {
        large: rem(20),
        medium: rem(16),
        small: rem(12),
        "x-small": rem(6),
      },
      zIndex: {
        modal: "900",
        scrim: "850",
        nav: "800",
      },
      spacing: {
        "margin-web": rem(40),
        "margin-mobile": rem(24),
        "margin-mobile-dense": rem(12),
        "margin-extension": rem(16),
        "padding-x-small": rem(8),
        "padding-x-small-dense": rem(6),
        "padding-small": rem(12),
        "padding-small-dense": rem(8),
        "padding-medium": rem(16),
        "padding-large": rem(24),
        "padding-x-large": rem(36),
        "gap-large": rem(16),
        "gap-medium": rem(12),
        "gap-small": rem(8),
        "gap-x-small": rem(4),
        "mobile-nav-h": rem(72),
        "nav-h": rem(72),
      },
      boxShadow: {
        "light-short":
          "0px 1px 6px 2px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.02)",
        "light-medium":
          "0px 6px 15px -3px rgba(18, 18, 23, 0.18), 0px 2px 6px -2px rgba(18, 18, 23, 0.17)",
        "light-long":
          "0px 10px 24px -6px rgba(18, 18, 23, 0.03), 0px 4px 8px -3px rgba(18, 18, 23, 0.02)",
        "dark-short":
          "0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.24)",
        "dark-medium":
          "0px 10px 15px -3px rgba(18, 18, 23, 0.54), 0px 4px 6px -2px rgba(18, 18, 23, 0.40)",
        "dark-long":
          "0px 20px 25px -5px rgba(18, 18, 23, 0.54), 0px 10px 10px -5px rgba(18, 18, 23, 0.40)",
      },
      colors: {
        scrim: "rgba(0,0,0,0.60)",
        black: "#000000",
        white: "#ffffff",
        "dark-neutral-1": "#FFFFFF",
        "dark-neutral-2": "#9B9B9B",
        "dark-neutral-3": "#5E5E5E",
        "light-neutral-1": "#222222",
        "light-neutral-2": "#7D7D7D",
        "light-neutral-3": "#CECECE",
        "dark-surface-1": "#131313",
        "dark-surface-2": "#1B1B1B",
        "dark-surface-3": "rgba(255,255,255,0.12)",
        "dark-surface-4": "rgba(255,255,255,0.20)",
        "dark-surface-5": "rgba(0,0,0,0.04)",
        "dark-surface-1-hovered": "#181818",
        "dark-surface-2-hovered": "#242424",
        "dark-surface-3-hovered": "rgba(255,255,255,0.16)",
        "light-surface-1": "#FFFFFF",
        "light-surface-2": "#F9F9F9",
        "light-surface-3": "rgba(34,34,34,0.05)",
        "light-surface-4": "rgba(255,255,255,0.64)",
        "light-surface-5": "rgba(0,0,0,0.04)",
        "light-surface-1-hovered": "#F5F5F5",
        "light-surface-2-hovered": "#F2F2F2",
        "light-surface-3-hovered": "rgba(34,34,34,0.09)",
        "dark-accent-1": "#FC74FE",
        "dark-accent-2": "#361A37",
        "dark-accent-3": "#FFF",
        "dark-accent-1-hovered": "#FD3CFE",
        "dark-accent-2-hovered": "#510D43",
        "dark-accent-3-hovered": "#F5F5F5",
        "light-accent-1": "#F50DB4",
        "light-accent-2": "#FEF4FF",
        "light-accent-3": "#000",
        "light-accent-1-hovered": "#C70A92",
        "light-accent-2-hovered": "#FEEBFC",
        "light-accent-3-hovered": "#131313",
        "dark-status-success-1": "#21C95E",
        "dark-status-warning-1": "#FFBF17",
        "dark-status-critical-1": "#FF5F52",
        "dark-status-success-2": "#0F2C1A",
        "dark-status-warning-2": "#1F1E02",
        "dark-status-critical-2": "#2E0805",
        "dark-status-success-1-hovered": "#15863C",
        "dark-status-warning-1-hovered": "#FFDD0D",
        "dark-status-critical-1-hovered": "#FF3931",
        "dark-status-success-2-hovered": "#093A16",
        "dark-status-warning-2-hovered": "#302E03",
        "dark-status-critical-2-hovered": "#470402",
        "light-status-success-1": "#21C95E",
        "light-status-warning-1": "#FFBF17",
        "light-status-critical-1": "#FF5F52",
        "light-status-success-2": "#EEFBF1",
        "light-status-warning-2": "#FFFBEB",
        "light-status-critical-2": "#FFF2F1",
        "light-status-success-1-hovered": "#15863C",
        "light-status-warning-1-hovered": "#FFDD0D",
        "light-status-critical-1-hovered": "#FF3931",
        "light-status-success-2-hovered": "#BCEECC",
        "light-status-warning-2-hovered": "#FFFBD7",
        "light-status-critical-2-hovered": "#FFD5D4",
        "light-orange-light": "#FEF5EA",
        "dark-orange-light": "rgba(55, 27, 12, 0.8)",
        "light-orange-vibrant": "#FF4D00",
        "light-orange-fade": "#FBF5F2",
        "dark-orange-vibrant": "#FF4D00",
        "dark-orange-fade": "#371B0C",
        "dark-orange-fade-80": "rgba(55,27,12,0.80)",
        "light-brown-vibrant": "#85754A",
        "light-brown-fade": "#F7F5F4",
        "dark-brown-vibrant": "#85754A",
        "dark-brown-fade": "#231E0F",
        "dark-brown-fade-80": "rgba(35,30,15,0.80)",
        "light-pink-fade": "#FEF4FF",
        "dark-pink-fade-80": "rgba(54,26,55,0.80)",
        "light-pink-vibrant": "#F50DB4",
        "light-pink-light": "#FEF4FF",
        "dark-pink-vibrant": "#FC74FE",
        "dark-pink-light": "#361A37",
        "dark-pink-light-80": "rgba(54,26,55,0.80)",
        "light-green-base": "#0C8911",
        "dark-green-base": "#0C8911",
        "light-green-light": "#EEFBF1",
        "dark-green-light": "rgba(15, 44, 26, 0.8)",
        "light-blue-light": "#EFF4FF",
        "dark-blue-light": "rgba(16, 20, 61, 0.8)",
        "light-blue-vibrant": "#0047FF",
        "dark-blue-vibrant": "#0C8911",
      },
    },
  },
  plugins: [
    plugin(function ({
      matchUtilities,
      theme,
    }: {
      matchUtilities: PluginAPI["matchUtilities"];
      theme: PluginAPI["theme"];
    }) {
      const flattenedColors = Object.entries(theme("colors") || "").reduce(
        (acc, [key, value]) => {
          if (typeof value === "string") acc[key] = value;
          else {
            Object.entries(value).forEach(([number, color]) => {
              acc[`${key}-${number}`] = color;
            });
          }
          return acc;
        },
        {} as { [key: string]: any }
      );
      matchUtilities(
        {
          "progress-bar": (value) => ({
            backgroundColor: value,
            "&::-webkit-progress-bar": {
              backgroundColor: value,
            },
          }),
          "progress-value": (value) => ({
            color: value,
            "&::-webkit-progress-value": {
              backgroundColor: value,
            },
            "&::-moz-progress-bar": {
              backgroundColor: value,
            },
          }),
        },
        {
          values: flattenedColors,
        }
      );
    }),
  ],
} satisfies Config;

export default config;
