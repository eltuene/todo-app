# React Native ToDo App

This is a simple ToDo app built with React Native, Expo, and Firebase. 

## Getting Started

Follow the instructions below to get started with the ToDo app on your local machine.

### Prerequisites

To run this app, you will need to have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- Expo CLI

### Installation

1. Clone the repository to your local machine using the following command:

   ```shell
   git clone https://github.com/eltuene/todo-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd todo-app
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

4. Set up Firebase:

   - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com).
   - Enable Firebase Authentication and Firestore for your project.
   - Copy the Firebase configuration and replace the placeholders in `/src/firebaseConnection.js` file with your own Firebase configuration.

5. Start the app:

   ```shell
   npm start
   ```

   This will start the Expo development server.

6. Open the app on your device:

   - Install the Expo app on your iOS or Android device.
   - Scan the QR code displayed in the Expo Developer Tools (or the console) with your device's camera.
   - The app will be installed and automatically opened on your device.
  
7. Start the app:

   ```shell
   npm test
   ```

   This will run the tests using Jest.

## Features

- **Sign Up and Login**: Users can sign up and log into their accounts using email and password authentication provided by Firebase.
- **Add Tasks**: Users can add new tasks to their ToDo list.
- **Mark Tasks as Complete**: Users can mark tasks as complete, which will update the status of the task in Firebase.
- **Delete Tasks**: Users can delete tasks from their ToDo list.