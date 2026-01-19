# 🎯 Boardroom - Digital Bulletin Board

<div align="center">

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Version](https://img.shields.io/badge/Version-MVP%201.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**A free-form digital canvas that replicates the tactile freedom of a physical corkboard**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

**Boardroom** is a web-based collaborative workspace designed for users who want the creative freedom of a physical corkboard in a digital environment. Unlike traditional project management tools that force linear structures, Boardroom allows free-form placement of visual assets with full drag-and-drop capabilities.

### The Problem
Digital organization tools like Trello and Jira force users into rigid, linear structures (lists/grids), causing them to lose spatial context and creative freedom that comes naturally with physical boards.

### Our Solution
A persistent, free-form digital canvas where users can:
- 📌 **Place items anywhere** on an infinite canvas
- 🖱️ **Drag and drop** notes and images freely
- ✏️ **Edit content in-place** with double-click
- 📜 **Track all changes** via a comprehensive History Log

---

## ✨ Features

### MVP (P0) Features
| Feature | Description |
|---------|-------------|
| 🔐 **Google Authentication** | Secure, one-click login via Google OAuth |
| 🎨 **Infinite Canvas** | Full-screen workspace with cork/grid texture |
| 📝 **Sticky Notes** | Create and edit text notes anywhere on the board |
| 🖼️ **Image Support** | Add images to your board |
| 🖱️ **Drag & Drop** | Move items freely with real-time position saving |
| ✏️ **In-Place Editing** | Double-click to edit, click away to save |
| 📜 **History Log** | Complete audit trail of all actions |

### Future Features (Phase 2)
- 👥 Real-time collaboration with live cursors
- 📄 Rich media support (PDF, YouTube)
- 📋 Multiple boards per user

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React.js (Vite) |
| **Language** | JavaScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Chakra UI / DaisyUI |
| **Drag & Drop** | dnd-kit / react-draggable |
| **Authentication** | Firebase Auth (Google OAuth) |
| **Database** | Cloud Firestore |
| **Hosting** | Firebase Hosting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/digital-bulletin-board.git
   cd digital-bulletin-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Google Authentication
   - Create a Firestore database
   - Copy your Firebase config to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
boardroom/
├── docs/                 # Documentation
│   └── PRD_ANALYSIS.md   # Detailed PRD analysis
├── src/
│   ├── components/       # React components
│   │   ├── Canvas/       # Main canvas workspace
│   │   ├── Note/         # Sticky note component
│   │   ├── HistoryLog/   # History sidebar
│   │   └── Toolbar/      # Action toolbar
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Firebase services
│   ├── context/          # React context providers
│   └── utils/            # Utility functions
├── public/               # Static assets
└── README.md
```

---

## 📊 Data Model

```
users/
└── {uid} → email, displayName, photoURL

boards/
└── {boardId} → ownerId, title, createdAt
    ├── items/
    │   └── {itemId} → type, content, positionX, positionY, color
    └── history/
        └── {logId} → userId, actionType, itemSummary, timestamp
```

---

## 📚 Documentation

- [📋 PRD Analysis](./docs/PRD_ANALYSIS.md) - Detailed breakdown of requirements
- [🏗️ Architecture](./docs/ARCHITECTURE.md) - Technical architecture details
- [🎨 Design System](./docs/DESIGN_SYSTEM.md) - UI/UX guidelines

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| **Latency** | Drop to Save < 200ms |
| **Error Rate** | Failed operations < 1% |

---

## 🗓️ Development Roadmap

### Phase 1: MVP Core (Weeks 1-4)
- [x] Week 1: Project setup, Firebase config, Google Auth
- [ ] Week 2: Canvas component, Sticky Note with drag-and-drop
- [ ] Week 3: Firestore integration, Save/Load coordinates
- [ ] Week 4: History Log, UI polish, Deploy

### Phase 2: Scaling (Future)
- [ ] Real-time collaboration
- [ ] Rich media support
- [ ] Multiple boards

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by the Boardroom Team
</div>
