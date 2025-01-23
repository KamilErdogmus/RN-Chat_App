# Fullstack Chat App on React Native

## Description

A real-time chat application built with React Native and Socket.IO, featuring cross-platform compatibility for iOS, Android, and Web browsers. The app includes essential messaging features such as real-time message delivery, typing indicators, message editing and deletion, user status tracking, and username customization. The project utilizes React Native's platform-specific styling for consistent UI across all platforms, Socket.IO for reliable real-time communication, and a Node.js/Express backend. Key features include message history management, user presence detection, and an intuitive interface with support for long-press actions on messages. The application demonstrates responsive design principles and efficient state management for a seamless chat experience across all devices.

## Libraries and Tools

- **express**: Web application framework for Node.js
- **nodemon**: Development utility for automatic server restart
- **socket.io**: Real-time bidirectional event-based communication
- **@expo/vector-icons**: Icon library for Expo applications
- **@react-navigation/native**: Navigation library for React Native
- **axios**: Promise-based HTTP client
- **expo**: Framework and platform for React applications
- **expo-font**: Font loader for Expo
- **expo-linear-gradient**: Linear gradient component
- **expo-linking**: Deep linking and URL handling
- **expo-router**: File-based router for Expo
- **expo-splash-screen**: Splash screen management
- **expo-status-bar**: Status bar component
- **expo-system-ui**: System UI utilities
- **expo-web-browser**: Web browser integration
- **moment**: Date formatting library
- **react-native-reanimated**: Animation library
- **react-native-safe-area-context**: Safe area utilities
- **react-native-screens**: Native navigation screens
- **react-native-web**: React Native for web
- **socket.io-client**: Socket.IO client

## Preview

<img src="src/assets/" height="800" alt="App Preview" />

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-Chat_App.git
```

2. Navigate to the project directory and install dependencies:

### For Backend:

```bash
cd backend
npm install
npm run dev
```

### For Frontend:

```bash
cd frontend
npm install
```

### For iOS Development (MacOS only)

Navigate to the iOS folder and install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

## Running the Application

### Start Metro Server

First, start the Metro bundler:

```bash
# Using npm
npx expo start

# Using yarn
yarn expo start
```

### Run on Different Platforms

#### For Android

```bash
# Using npm
npx expo run-android

# Using yarn
yarn android
```

#### For iOS

```bash
# Using npm
npx expo run-ios

# Using yarn
yarn ios
```

#### For Web

```bash
# Using npm
npx expo start:web

# Using yarn
yarn web
```

## Development Notes

- Make sure you have Node.js installed
- For iOS development, Xcode is required
- For Android development, Android Studio is required
- For web development, a modern web browser is required
