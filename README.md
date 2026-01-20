# 📋 Digital Bulletin Board (Boardroom)

A modern, real-time digital bulletin board built with React and Firebase. Create sticky notes, organize your thoughts, and keep track of changes in a collaborative environment.

## ✨ Features

- **Real-time Synchronization:** Changes appear instantly across all devices.
- **Drag & Drop Interface:** Intuitive free-form canvas using `@dnd-kit`.
- **Google Authentication:** Secure and easy login with Firebase Auth.
- **Persistent Storage:** All boards and items are stored safely in Firestore.
- **History Tracking:** View a log of all actions taken on the board.
- **Customizable Notes:** Change note colors and edit content easily.

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend/Service:** Firebase (Authentication, Firestore)
- **Styling:** Vanilla CSS (Glassmorphism design)
- **Libraries:** `@dnd-kit/core` (Drag and Drop), `react-icons`

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- A Firebase Project (Proejct ID, Auth Domain, API Key)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd "Digital Bulletin Board"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file in the root directory and add your Firebase credentials (see `docs/SETUP.md` for details):
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## 📚 Documentation

- **[Setup Guide](docs/SETUP.md):** Detailed instructions on creating and configuring your Firebase project.
- **[Design/PRD](docs/PRD_ANALYSIS.md):** Analysis of project requirements and features.

## 📄 License

This project is licensed under the MIT License.
