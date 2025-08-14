# ScheduleNotes Mobile

A cross-platform mobile application for daily schedule and notes management, built with Expo React Native. This is the mobile version of the ScheduleNotes web app, bringing powerful scheduling and note-taking capabilities to your Android and iOS devices.

## Features

### 📅 Daily Schedule Management
- **Add Scheduled Tasks**: Create tasks with specific times throughout your day
- **Remove Tasks**: Easily delete completed or cancelled tasks
- **Persistent Storage**: All schedule data is automatically saved using AsyncStorage
- **Session Continuity**: Your schedule persists between app sessions and device restarts

### 📝 Notes Section
- **Simple Note-Taking**: Clean, distraction-free note editing interface
- **Auto-Save**: Notes are automatically saved as you type
- **Persistent Notes**: All notes are stored locally and loaded when the app opens
- **Offline Access**: Take and access notes without an internet connection

### 🎨 Modern Mobile UI
- **Clean Design**: Modern, responsive interface optimized for mobile devices
- **Cross-Platform**: Consistent experience across Android and iOS
- **Touch-Friendly**: Intuitive gestures and mobile-optimized interactions
- **Beautiful Gradients**: Elegant visual design with shadows and gradients
- **Brand Footer**: "Hello World - ScheduleNotes App" branding

## Technology Stack

- **Frontend**: Expo React Native
- **Navigation**: React Navigation (for multi-screen navigation)
- **Storage**: AsyncStorage (React Native's local storage solution)
- **Platform**: Cross-platform (Android & iOS)
- **Development**: Expo CLI for easy development and testing

## Architecture

- **Client-Side Only**: No backend required - all data stored locally on device
- **Privacy-First**: All data remains private to the user's device
- **Offline-Ready**: Full functionality without internet connection
- **Local Persistence**: Uses AsyncStorage for data persistence across app sessions

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aryan475m/schedule-notes-mobile.git
cd schedule-notes-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
expo start
```

4. Use the Expo Go app to scan the QR code and run the app on your device

### Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## Original Web Version

This mobile app is based on the original ScheduleNotes web application that featured:
- HTML, CSS, and JavaScript implementation
- localStorage for data persistence
- Responsive web design
- Complete offline functionality

The mobile version maintains all core functionality while providing a native mobile experience optimized for touch interactions and mobile workflows.

## Data Storage

- **Schedule Data**: Stored in AsyncStorage with automatic persistence
- **Notes**: Stored in AsyncStorage with real-time saving
- **No Cloud Sync**: All data remains local to respect user privacy
- **Cross-Session**: Data persists across app closures and device restarts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on this repository.

---

**ScheduleNotes Mobile** - Your personal schedule and notes manager, now on mobile! 📱✨
