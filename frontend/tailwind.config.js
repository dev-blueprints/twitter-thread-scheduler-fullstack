/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
     './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // if using /app dir
  ],
   theme: {
   	extend: {
   		colors: {
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			primary: {
   				'50': '#eff6ff',
   				'100': '#dbeafe',
   				'200': '#bfdbfe',
   				'300': '#93c5fd',
   				'400': '#60a5fa',
   				'500': '#3b82f6',
   				'600': '#2563eb',
   				'700': '#1d4ed8',
   				'800': '#1e40af',
   				'900': '#1e3a8a',
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				'50': '#fdf2f8',
   				'100': '#fce7f3',
   				'200': '#fbcfe8',
   				'300': '#f9a8d4',
   				'400': '#f472b6',
   				'500': '#ec4899',
   				'600': '#db2777',
   				'700': '#be185d',
   				'800': '#9d174d',
   				'900': '#831843',
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			},
   			sidebar: {
   				DEFAULT: 'hsl(var(--sidebar-background))',
   				foreground: 'hsl(var(--sidebar-foreground))',
   				primary: 'hsl(var(--sidebar-primary))',
   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
   				accent: 'hsl(var(--sidebar-accent))',
   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
   				border: 'hsl(var(--sidebar-border))',
   				ring: 'hsl(var(--sidebar-ring))'
   			}
   		},
   		fontFamily: {
   			sans: [
   				'Inter',
   				'sans-serif'
   			]
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		},
		 boxShadow: {
			sidebar: "var(--sidebar-shadow)", // custom shadow token
		},
   	}
   },
  plugins: [require("tailwindcss-animate")],
};
