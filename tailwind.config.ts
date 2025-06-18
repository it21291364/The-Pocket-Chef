import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        headline: ["var(--font-nunito)", 'Fredoka One', 'cursive'],
        body: ["var(--font-quicksand)", 'M PLUS Rounded 1c', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)', // For more bubbly elements
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        'kawaii': '0 4px 6px -1px hsla(var(--foreground) / 0.07), 0 2px 4px -2px hsla(var(--foreground) / 0.05)',
        'kawaii-lg': '0 10px 15px -3px hsla(var(--foreground) / 0.07), 0 4px 6px -4px hsla(var(--foreground) / 0.05)',
      },
      maxWidth: {
        '3xl': '800px', // For the main container
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'jiggle': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-3deg) scale(1.05)' },
          '75%': { transform: 'rotate(3deg) scale(1.05)' },
        },
        'click-feedback': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'bounce-small': {
          '0%, 20%, 50%, 80%, 100%': {transform: 'translateY(0) scale(1)'},
          '40%': {transform: 'translateY(-4px) scale(1.1)'},
          '60%': {transform: 'translateY(-2px) scale(1.05)'},
        },
        'chef-hat-wobble': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
        'steam-rising-1': {
          '0%': { transform: 'translateY(10px) scaleY(0.8)', opacity: '0' },
          '20%': { opacity: '0.7' },
          '80%': { transform: 'translateY(-20px) scaleY(1.2)', opacity: '0.7' },
          '100%': { transform: 'translateY(-30px) scaleY(1.2)', opacity: '0' },
        },
        'steam-rising-2': {
          '0%': { transform: 'translateY(10px) scaleY(0.8)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { transform: 'translateY(-25px) scaleY(1.1)', opacity: '0.6' },
          '100%': { transform: 'translateY(-35px) scaleY(1.1)', opacity: '0' },
        },
        'steam-rising-3': {
          '0%': { transform: 'translateY(10px) scaleY(0.8)', opacity: '0' },
          '20%': { opacity: '0.5' },
          '80%': { transform: 'translateY(-15px) scaleY(1)', opacity: '0.5' },
          '100%': { transform: 'translateY(-25px) scaleY(1)', opacity: '0' },
        },
        'cry': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(3px)' },
        },
        'boing-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'jiggle': 'jiggle 0.4s ease-in-out',
        'click-feedback': 'click-feedback 0.2s ease-out',
        'bounce-small': 'bounce-small 0.5s',
        'chef-hat-wobble': 'chef-hat-wobble 2s infinite ease-in-out',
        'steam-1': 'steam-rising-1 3s infinite linear',
        'steam-2': 'steam-rising-2 3s infinite linear 0.5s',
        'steam-3': 'steam-rising-3 3s infinite linear 1s',
        'cry': 'cry 1s infinite ease-in-out',
        'boing-in': 'boing-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

    