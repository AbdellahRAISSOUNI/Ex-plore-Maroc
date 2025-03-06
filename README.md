# Explore Maroc - Mobile PWA Demo

A Progressive Web App (PWA) for exploring Morocco through camera recognition of landmarks. This mobile-first application allows users to scan Moroccan landmarks and get information about them, along with nearby attractions, hotels, and restaurants.

## Features

- **Progressive Web App**: Install on your home screen for a native-like experience
- **Camera Integration**: Use your device camera to recognize Moroccan landmarks
- **Mobile-First Design**: Optimized for mobile devices with responsive UI
- **Authentication**: User registration and login functionality
- **Location Details**: View historical information about recognized landmarks
- **Nearby Recommendations**: Find hotels, restaurants, and attractions near landmarks
- **Currency Switcher**: Toggle between MAD, EUR, USD, and JPY
- **Offline Support**: Basic functionality works without an internet connection

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- Framer Motion for animations
- React Webcam for camera access
- PWA configuration with next-pwa

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/explore-maroc.git
   cd explore-maroc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing on Mobile Devices

### Method 1: Using ngrok (Recommended for testing camera)

1. Install ngrok:
   ```bash
   npm install -g ngrok
   ```

2. Start your Next.js app:
   ```bash
   npm run dev
   ```

3. In a separate terminal, create a tunnel:
   ```bash
   ngrok http 3000
   ```

4. Open the HTTPS URL provided by ngrok on your mobile device.

### Method 2: Using your local network

1. Find your computer's IP address:
   - Windows: `ipconfig` in CMD
   - Mac/Linux: `ifconfig` in terminal

2. Start the Next.js app and specify the host:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. On your mobile device, open `http://YOUR_IP_ADDRESS:3000`

### Method 3: QR Code (Desktop Testing)

The app includes a QR code generator on the desktop version. When accessing the app on desktop:

1. Navigate to the profile section
2. Find the "Test on Mobile" option
3. Scan the displayed QR code with your mobile device

## Desktop Testing Mode

For testing on desktop without a camera:

1. Navigate to the Camera page
2. The app will automatically detect you're on desktop
3. Use the "Desktop Testing Mode" to simulate landmark recognition

## Building for Production

```bash
npm run build
npm start
```

## PWA Installation

To install the app as a PWA:

1. Open the app in Chrome or Safari on your mobile device
2. For Chrome: Tap the menu button and select "Add to Home Screen"
3. For Safari: Tap the share button and select "Add to Home Screen"

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and mock data
- `/src/types` - TypeScript type definitions
- `/public` - Static assets and PWA manifest

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images and data about Moroccan landmarks are used for demonstration purposes only
- Icons provided by React Icons and Feather Icons
- UI inspiration from various travel applications
