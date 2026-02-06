tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                primary: '#8b5cf6',   // Violet 500
                secondary: '#ec4899', // Pink 500
                accent: '#06b6d4',    // Cyan 500
                dark: '#0f172a',      // Slate 900
                darker: '#020617',    // Slate 950
                surface: '#1e293b',   // Slate 800
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob 10s infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px -10px rgba(139, 92, 246, 0.5)' },
                    '100%': { boxShadow: '0 0 30px 0px rgba(139, 92, 246, 0.8)' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        }
    }
}
