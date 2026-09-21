// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{html,js,jsx}"],
//   theme: {
//     extend: {

//       // 🔤 Fonts
//       fontFamily: {
//         sans: ['Inter', 'ui-sans-serif', 'system-ui'],
//       },

//       // 🎨 Colors (Design System)
//       colors: {
//         // Backgrounds
//         background: '#F8FAFC',
//         surface: '#FFFFFF',

//         // Primary (main blue)
//         primary: {
//           DEFAULT: '#3B82F6',
//           hover: '#2563EB',
//           light: '#DBEAFE',
//         },

//         // Secondary (optional purple)
//         secondary: {
//           DEFAULT: '#8B5CF6',
//         },

//         // Success (events)
//         success: {
//           DEFAULT: '#10B981',
//           hover: '#059669',
//           light: '#D1FAE5',
//         },

//         // Danger
//         danger: {
//           DEFAULT: '#EF4444',
//         },

//         // Text
//         text: {
//           DEFAULT: '#111827',
//           secondary: '#6B7280',
//           muted: '#9CA3AF',

//         },

//         // Borders
//         border: '#E5E7EB',
//       },

//       // 🌑 Shadows (nice soft UI)
//       boxShadow: {
//         soft: '0 2px 8px rgba(0,0,0,0.05)',
//         card: '0 4px 12px rgba(0,0,0,0.08)',

//         active: '0 0 0 4px rgba(59,130,246,0.2)',
//         activeLg: '0 0 0 4px rgba(59,130,246,0.2), 0 4px 12px rgba(0,0,0,0.1)',
//       },

//       // 🎨 Custom background gradients
//       backgroundImage: {
//         bgCard: 'linear-gradient(to bottom right, #ede9fe, #dbeafe)',
//       },

//     // 🔘 Border Radius
//     borderRadius: {
//       xl: '1rem',
//       '2xl': '1.5rem',
//     },

//     // 🎬 Transition
//     transitionProperty: {
//       smooth: 'all',
//     },

//     // 📏 Spacing (optional helpful)
//     spacing: {
//       18: '4.5rem',
//       22: '5.5rem',
//     },

//   },
// },
// plugins: [],
// }
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      // 🔤 Fonts
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        // ---- Base 4px (0.25rem) scale ----
        '0': '0rem',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',

        // ---- Semantic spacing tokens ----
        'section-sm': '2.5rem',
        'section-md': '4rem',
        'section-lg': '6rem',
        'section-xl': '8rem',

        'container-sm': '1rem',
        'container-md': '1.5rem',
        'container-lg': '2rem',
        'container-xl': '2.5rem',

        'gutter': '1.5rem',
        'gutter-sm': '1rem',
        'gutter-lg': '2rem',

        'stack-xs': '0.5rem',
        'stack-sm': '1rem',
        'stack-md': '1.5rem',
        'stack-lg': '2.5rem',
        'stack-xl': '4rem',
      },

      // 🎨 Colors (Calender Design System)
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          light: 'hsl(var(--secondary-light))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          light: 'hsl(var(--success-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          light: 'hsl(var(--danger-light))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          light: 'hsl(var(--accent-light))',
        },
        text: {
          DEFAULT: 'hsl(var(--text))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
        },
        border: 'hsl(var(--border))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
          bg: 'hsl(var(--chart-bg))',
        },
      },

      // 🎨 Background gradients (dashboard cards vibe)
      backgroundImage: {
        cardGradient: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
        softGradient: 'linear-gradient(135deg, #FCFCFC 0%, #F1F5F9 100%)',
      },

      // 🔘 Border Radius (design tokens — driven by CSS vars)
      borderRadius: {
        section: 'var(--radius-section, 1.5rem)',
        card: 'var(--radius-card, 1.5rem)',
        button: 'var(--radius-button, 0.75rem)',
        input: 'var(--radius-input, 0.75rem)',
        modal: 'var(--radius-modal, 1.5rem)',
        icon: 'var(--radius-icon, 0.625rem)',
        full: '9999px',
      },

      // 🎬 Transitions
      transitionProperty: {
        smooth: 'all',
      },

      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.shadow-subtle': { boxShadow: 'var(--shadow-subtle)' },
        '.shadow-card': { boxShadow: 'var(--shadow-card)' },
        '.shadow-dropdown': { boxShadow: 'var(--shadow-dropdown)' },
        '.shadow-active': { boxShadow: '0 0 0 4px rgba(67,127,247,0.2)' },
      })
    }),
  ],
};