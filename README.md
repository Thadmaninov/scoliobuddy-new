# ScolioBuddy

A professional React Native app for measuring spinal curvature using a 3D printed scoliometer device.

## Features

- **Loading Screen**: Professional splash screen on app launch
- **Instructions Page**: Step-by-step guide for using the app
- **Patient Management**: Add patients with profile pictures and personal information
- **Measurement Tracking**: Record and track scoliometer measurements over time
- **Real-time Angle Display**: Uses device gyroscope to measure angles in real-time
- **Measurement History**: View all past measurements for each patient
- **Location Tracking**: Specify measurement location (Cervical, Thoracic, Lumbar)

## Tech Stack

- React Native + Expo
- React Native Paper (Material Design UI)
- React Navigation
- AsyncStorage (for local data persistence)
- Expo Sensors (for gyroscope/accelerometer access)
- TypeScript support

## Getting Started

1. Start the development server:
   ```bash
   npm start
   ```

2. Run on your device:
   - **iOS**: Press `i` or scan the QR code with your iPhone camera
   - **Android**: Press `a` or scan the QR code with the Expo Go app
   - **Web**: Press `w` (web version has limited sensor support)

## How to Use

1. **Add a Patient**: Tap the + button to add a new patient with their name, date of birth, and optional profile picture
2. **View Patients**: All patients are listed on the main screen
3. **Take Measurements**:
   - Select a patient
   - Tap "Add Measurement"
   - Calibrate the device by placing it flat
   - Position the device in the scoliometer on the patient's back
   - The app will show the angle in real-time
   - Save the measurement with location and notes
4. **Track Progress**: View measurement history for each patient

## Project Structure

```
ScolioBuddy/
├── src/
│   ├── screens/
│   │   ├── LoadingScreen.tsx
│   │   ├── InstructionsScreen.tsx
│   │   ├── PatientListScreen.tsx
│   │   ├── AddPatientScreen.tsx
│   │   ├── PatientDetailScreen.tsx
│   │   └── MeasurementScreen.tsx
│   ├── utils/
│   │   └── storage.ts
│   └── types/
│       └── index.ts
└── App.js
```

## Notes

- The gyroscope feature requires a physical device - it won't work in the web or simulator
- Patient data is stored locally on the device using AsyncStorage
- Profile pictures are stored as URIs pointing to the device's local storage
# scoliobuddy-new
