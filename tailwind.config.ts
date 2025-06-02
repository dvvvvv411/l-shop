
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'premium-glow': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.6',
						transform: 'scale(1.1)'
					}
				},
				'premium-wave': {
					'0%, 100%': {
						transform: 'translateX(0) translateY(0)',
						opacity: '0.4'
					},
					'33%': {
						transform: 'translateX(20px) translateY(-10px)',
						opacity: '0.6'
					},
					'66%': {
						transform: 'translateX(-15px) translateY(15px)',
						opacity: '0.5'
					}
				},
				'premium-float-1': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '0.4'
					},
					'50%': {
						transform: 'translateY(-20px) rotate(180deg)',
						opacity: '0.7'
					}
				},
				'premium-float-2': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '0.3'
					},
					'50%': {
						transform: 'translateY(-30px) rotate(-180deg)',
						opacity: '0.6'
					}
				},
				'premium-float-3': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '0.35'
					},
					'50%': {
						transform: 'translateY(-25px) rotate(90deg)',
						opacity: '0.65'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'premium-glow-animation': 'premium-glow 4s ease-in-out infinite',
				'premium-glow-animation-delayed': 'premium-glow 4s ease-in-out infinite 2s',
				'premium-wave-animation': 'premium-wave 8s ease-in-out infinite',
				'premium-float-1': 'premium-float-1 6s ease-in-out infinite',
				'premium-float-2': 'premium-float-2 8s ease-in-out infinite',
				'premium-float-3': 'premium-float-3 7s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
