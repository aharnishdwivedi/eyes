# For Urvashi 💕

A beautiful, romantic, and interactive React website built with love.

## 🌸 Features

- **Mobile-first design** with baby pink and soft purple color palette
- **Smooth animations** using Framer Motion
- **Interactive mini-games**: Tap to collect hearts, falling hearts game, memory flip cards
- **Love notes** with click-to-reveal functionality
- **Background music** with autoplay and controls
- **Floating hearts and sparkles** for a dreamy atmosphere
- **Easter eggs** and surprise interactions
- **Beautiful sections**: Hero, About Her, Our Memories, Games, Love Notes, and Final Section

## 📁 Project Structure

```
eyes/
├── public/
│   ├── images/          # Place your images here
│   │   ├── eyes.jpeg    # Main hero image (REQUIRED)
│   │   ├── she1.png     # About Her section
│   │   ├── us.png       # Memory card 1
│   │   └── us2.png      # Memory card 2
│   └── audio/
│       └── uskiaankhon.mp3  # Background music (REQUIRED)
├── src/
│   ├── components/       # All React components
│   ├── App.jsx          # Main app component
│   └── index.css        # Tailwind CSS styles
└── package.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Images

Place the following images in the `public/images/` directory:

- `eyes.jpeg` - Main hero image (most important!)
- `she1.png` - For the "About Her" section
- `us.png` - First memory card
- `us2.png` - Second memory card

### 3. Add Background Music

Place your MP3 file in `public/audio/` and name it:
- `uskiaankhon.mp3` - Background music "Uski Aankhon Mein Faila Kajal"

**Important**: The audio file must be named exactly `uskiaankhon.mp3` for the music player to work.

### 4. Run the Development Server

```bash
npm run dev
```

The website will open at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🎮 Interactive Features

- **Tap to Collect Hearts**: Click anywhere in the game area to collect hearts
- **Falling Hearts Game**: Click "Start Game!" to catch falling hearts
- **Memory Flip Cards**: Click the cards to reveal your photos
- **Love Notes**: Click the envelope icons to reveal sweet messages
- **Surprise Button**: Click for a special surprise message
- **Easter Eggs**: Try clicking around the page 10 times to change the background color!

## 🎨 Customization

You can customize colors, animations, and content by editing:

- `tailwind.config.js` - Color palette and animations
- `src/components/` - Individual section components
- `src/App.jsx` - Main layout and structure

## 💝 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## 📱 Mobile-First Design

The website is designed mobile-first and scales beautifully to tablets and desktops. All interactions are touch-friendly.

## 🎵 Audio Notes

- Music starts automatically when the page loads (if browser allows)
- Volume fades in smoothly to avoid sudden loud sounds
- Floating play/pause button in the bottom-right corner
- Music loops infinitely

## ❤️ Built with Love

Built by Aharnish, with love ❤️

---

Enjoy creating beautiful memories! 💕
