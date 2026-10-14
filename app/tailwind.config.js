/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        tagline: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        /* Orion token surfaces. `orion` is the accent, `signal` is status. */
        orion: {
          DEFAULT: "rgb(var(--og-accent-rgb) / <alpha-value>)",
          bright: "rgb(var(--og-accent-bright-rgb) / <alpha-value>)",
          ice: "rgb(var(--og-accent-ice-rgb) / <alpha-value>)",
          deep: "rgb(var(--og-accent-deep-rgb) / <alpha-value>)",
          strong: "rgb(var(--og-accent-strong-rgb) / <alpha-value>)",
          soft: "var(--og-accent-soft)",
          glow: "var(--og-accent-glow)",
          line: "var(--og-accent-line)",
        },
        signal: {
          DEFAULT: "rgb(var(--og-signal-rgb) / <alpha-value>)",
          bright: "rgb(var(--og-signal-bright-rgb) / <alpha-value>)",
          ice: "rgb(var(--og-signal-ice-rgb) / <alpha-value>)",
          deep: "rgb(var(--og-signal-deep-rgb) / <alpha-value>)",
          ink: "var(--og-signal-ink)",
        },
        ink: "var(--og-ink)",
        chrome: "var(--og-slate)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      /* Locked radius scale — four steps (chip / card / panel / pill).
         Call sites no longer pick their own; see --r-* in index.css. */
      borderRadius: {
        DEFAULT: "var(--r-chip)",
        xs: "var(--r-chip)",
        sm: "var(--r-chip)",
        md: "var(--r-chip)",
        lg: "var(--r-chip)",
        xl: "var(--r-card)",
        "2xl": "var(--r-card)",
        "3xl": "var(--r-panel)",
        "4xl": "var(--r-panel)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}