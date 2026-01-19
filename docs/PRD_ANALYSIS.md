# 📋 PRD Analysis: "Boardroom" (Digital Bulletin Board)

## 📌 Executive Summary

**Project Name:** Boardroom  
**Type:** Web-based Collaborative Workspace  
**Vision:** Replicate the tactile freedom of a physical corkboard in a digital environment

### Core Problem
Digital organization tools (Trello, Jira, etc.) force linear structures (lists/grids), causing users to lose spatial context and creative freedom.

### Value Proposition
A persistent, free-form digital canvas where users can:
- Manipulate content directly with drag-and-drop
- Place items anywhere on the canvas
- Track all changes via a rigorous audit trail (History Log)

---

## 👥 User Personas

### Primary Persona: The Organizer (Alex)
- **Role:** Student or Project Lead
- **Need:** Visualize unstructured ideas
- **Key Actions:**
  - Create new boards for specific projects
  - Drag and drop sticky notes for spatial arrangement
  - View History Log for accountability

### Secondary Persona: The Collaborator (Sam)
- **Role:** Team member contributing content
- **Key Actions:**
  - Quick login via Google OAuth
  - Edit text directly on notes

---

## ⚡ Functional Requirements (MVP - P0)

| Feature | Description | Acceptance Criteria |
|---------|-------------|---------------------|
| **Google Authentication** | Secure login/signup using Google | 1. User clicks "Sign in with Google" 2. Account created in Firebase Auth 3. Session persists on refresh |
| **The Board (Canvas)** | A workspace to place items | 1. Canvas spans 100% viewport 2. Background replicates cork/grid texture |
| **Create Item (CRUD)** | Add Notes/Images to board | 1. "Add Note" button spawns div at center 2. Item persists in DB immediately |
| **Direct Manipulation** | Drag, Move, Resize items | 1. Items can be dragged to any (x,y) 2. Coordinates save to DB onDragEnd |
| **In-Place Editing** | Edit content directly | 1. Double-click turns text into input/textarea 2. Clicking outside saves changes |
| **History Log** | Sidebar tracking all changes | 1. Every CRUD action creates log entry 2. Displays: Timestamp, User, Action |

---

## 🗓️ Implementation Roadmap

### Phase 1: MVP Core (Weeks 1-4)

| Week | Tasks |
|------|-------|
| **Week 1** | Setup React repo, Tailwind, Firebase project. Implement Google Auth |
| **Week 2** | Build Canvas and Sticky Note component with drag-and-drop library |
| **Week 3** | Connect Canvas to Firestore. Implement Save/Load coordinates |
| **Week 4** | Implement History Log logic and UI. Deploy |

### Phase 2: Future Scaling
- Real-time collaboration (live cursors)
- Rich media support (PDF, YouTube)
- Multiple Boards per user

---

## 🏗️ Technical Architecture

### Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend** | React.js (Vite) | Industry standard |
| **Language** | JavaScript | Easier for beginners |
| **Styling** | Tailwind CSS | Utility-first, rapid styling |
| **Auth** | Firebase Auth | Google Provider |
| **Database** | Cloud Firestore | NoSQL, JSON-like data |
| **Hosting** | Firebase Hosting | Free tier available |
| **Drag & Drop** | dnd-kit or react-draggable | Lightweight, React-friendly |
| **UI Components** | Chakra UI or DaisyUI | Pre-made components |

### Architecture Pattern
- **Type:** Serverless / Backend-as-a-Service (BaaS)
- **Pattern:** Event-driven (app subscribes to Firestore data)
- **Security:** OAuth 2.0 via Firebase, Firestore Security Rules

### UI/UX Layout
```
┌─────────────────────────────────────────────────────────────┐
│                        MAIN CANVAS                          │
│                    (Full-screen workspace)                  │
│                                                             │
│    ┌─────────┐         ┌─────────┐                         │
│    │  Note   │         │  Note   │                         │
│    │   1     │         │   2     │                         │
│    └─────────┘         └─────────┘                         │
│                                                             │
│                    ┌─────────┐                              │
│                    │ Image 1 │                              │
│                    └─────────┘                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [+ Add Note] [+ Add Image]              TOOLBAR            │
└─────────────────────────────────────────────────────────────┘
                                              │ HISTORY LOG
                                              │ (Collapsible)
                                              └──────────────
```

---

## 📊 Data Schema (Firestore NoSQL)

### Collections & Documents

```
users/
├── {uid}
│   ├── email: string
│   ├── displayName: string
│   └── photoURL: string

boards/
├── {boardId}
│   ├── ownerId: string (FK to users)
│   ├── title: string
│   ├── createdAt: timestamp
│   │
│   ├── items/ (subcollection)
│   │   └── {itemId}
│   │       ├── type: "text" | "image"
│   │       ├── content: string
│   │       ├── positionX: number
│   │       ├── positionY: number
│   │       ├── color: string
│   │       └── lastModified: timestamp
│   │
│   └── history/ (subcollection)
│       └── {logId}
│           ├── userId: string
│           ├── actionType: "CREATE" | "MOVE" | "EDIT" | "DELETE"
│           ├── itemSummary: string
│           └── timestamp: timestamp
```

### Entity Relationships
```
USERS ||--o{ BOARDS : owns
BOARDS ||--o{ ITEMS : contains
BOARDS ||--o{ HISTORY_LOGS : has
```

---

## 🔄 User Flow

```
Start
  │
  ▼
User Logged In? ──No──► Login Page (Google Auth)
  │                              │
  │◄─────────────────────────────┘
  │
  Yes
  │
  ▼
Dashboard / Board List
  │
  ▼
Select Board
  │
  ▼
Main Canvas View
  │
  ├──► Add Item ──► Create Item in DB
  │
  ├──► Drag Item ──► Update Coords in DB
  │
  └──► Edit Content ──► Update Content in DB
                              │
                              ▼
                    Create History Log Entry
                              │
                              ▼
                    Sync to UI (Real-time)
                              │
                              ▼
                    Back to Canvas View
```

---

## 📈 Success Metrics (KPIs)

| Metric | Target |
|--------|--------|
| **Latency** | Time from "Drop Item" to "Saved in DB" < 200ms |
| **Error Rate** | Failed save operations < 1% |

---

## 🚀 Next Steps for Implementation

1. **Initialize React + Vite project**
2. **Setup Tailwind CSS**
3. **Configure Firebase project**
4. **Implement authentication flow**
5. **Build canvas component**
6. **Create draggable note components**
7. **Integrate Firestore for data persistence**
8. **Implement History Log sidebar**
9. **Polish UI/UX**
10. **Deploy to Firebase Hosting**

---

*Analysis completed: January 20, 2026*
