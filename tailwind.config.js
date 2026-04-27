/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {

      // 🔤 Fonts
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },

      // 🎨 Colors (Design System)
      colors: {
        // Backgrounds
        background: '#F8FAFC',
        surface: '#FFFFFF',

        // Primary (main blue)
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#DBEAFE',
        },

        // Secondary (optional purple)
        secondary: {
          DEFAULT: '#8B5CF6',
        },

        // Success (events)
        success: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#D1FAE5',
        },

        // Danger
        danger: {
          DEFAULT: '#EF4444',
        },

        // Text
        text: {
          DEFAULT: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          
        },

        // Borders
        border: '#E5E7EB',
      },

      // 🌑 Shadows (nice soft UI)
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.05)',
        card: '0 4px 12px rgba(0,0,0,0.08)',

        active: '0 0 0 4px rgba(59,130,246,0.2)',
        activeLg: '0 0 0 4px rgba(59,130,246,0.2), 0 4px 12px rgba(0,0,0,0.1)',
      },
  

    // 🔘 Border Radius
    borderRadius: {
      xl: '1rem',
      '2xl': '1.5rem',
    },

    // 🎬 Transition
    transitionProperty: {
      smooth: 'all',
    },

    // 📏 Spacing (optional helpful)
    spacing: {
      18: '4.5rem',
      22: '5.5rem',
    },

  },
},
plugins: [],
}