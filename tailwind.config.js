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
export default {
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
        // Backgrounds
        background: '#f3f4f6',
        surface: '#FFFFFF',

        // Primary (blue UI)
        primary: {
          DEFAULT: '#437FF7',
          hover: '#2563EB',
          light: '#DBEAFE',
        },

        // Secondary / Accent (purple cards)
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#EDE9FE',
        },

        // Success (green stats)
        success: {
          DEFAULT: '#538165',
          light: '#D1FAE5',
        },

        // Warning / Pending (yellow)
        warning: {
          DEFAULT: '#EEFC53',
        },

        // Pink accent (small UI highlights)
        accent: {
          DEFAULT: '#FF3270',
          light: '#EAA9C3',
        },

        // Text
        text: {
          DEFAULT: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },

        // Borders
        border: '#E5ECED',
      },

      // 🌑 Shadows (soft dashboard style)
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.05)',
        card: '0 4px 12px rgba(0,0,0,0.08)',
        active: '0 0 0 4px rgba(67,127,247,0.2)',
        activeLg:
          '0 0 0 4px rgba(67,127,247,0.2), 0 4px 12px rgba(0,0,0,0.1)',
      },

      // 🎨 Background gradients (dashboard cards vibe)
      backgroundImage: {
        cardGradient: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
        softGradient: 'linear-gradient(135deg, #FCFCFC 0%, #F1F5F9 100%)',
      },

      // 🔘 Border Radius
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
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

  plugins: [],
};