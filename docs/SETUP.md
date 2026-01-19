# 🔥 Firebase Setup Guide for Boardroom

This guide walks you through completing the Firebase setup for the Boardroom app.

## 📋 Prerequisites

- A Google account
- The Boardroom app code (already set up)

---

## Step 1: Access Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. You should see **"boardroom-app"** in your project list
3. Click to open it

> **Note:** If you don't see the project, create a new one:
> - Click "Add project"
> - Name it "boardroom-app"
> - Follow the prompts

---

## Step 2: Enable Google Authentication

1. In the sidebar, click **Build** → **Authentication**
2. Click the **Sign-in method** tab
3. Click **Add new provider** (or click on "Google" if already visible)
4. Select **Google**
5. Toggle **Enable** to ON
6. Select your **Project support email**
7. Click **Save**

✅ You should now see Google listed with a green "Enabled" status

---

## Step 3: Create Firestore Database

1. In the sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode**
   
   > ⚠️ Test mode allows open read/write for 30 days. 
   > We'll add proper security rules for production later.

4. Select a **Cloud Firestore location** (choose closest to your users)
5. Click **Create**

✅ Wait for provisioning to complete

---

## Step 4: Register Web App & Get Config

1. Click the **⚙️ gear icon** next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **"Your apps"** section
4. Click the **</>** (Web) icon to add a new web app
5. Enter app nickname: `boardroom-web`
6. ⬜ Don't check "Firebase Hosting" for now
7. Click **Register app**
8. You'll see the Firebase config - copy these values!

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",              // Copy this
  authDomain: "boardroom-app-xxx.firebaseapp.com",
  projectId: "boardroom-app-xxx",
  storageBucket: "boardroom-app-xxx.appspot.com", 
  messagingSenderId: "123456789",   // Copy this
  appId: "1:123456789:web:abc..."   // Copy this
};
```

---

## Step 5: Configure Your Local Environment

1. Open the file `.env.local` in your project root
2. Fill in the values you copied:

```env
VITE_FIREBASE_API_KEY=AIzaSy...your-api-key
VITE_FIREBASE_AUTH_DOMAIN=boardroom-app-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=boardroom-app-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=boardroom-app-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
```

3. Save the file

---

## Step 6: Run the App

```bash
npm run dev
```

Open http://localhost:5173 and click **"Continue with Google"** to test!

---

## 🔒 Security Rules (For Production)

Before deploying to production, update your Firestore security rules:

**Firestore Database → Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Boards collection - only authenticated users can access
    match /boards/{boardId} {
      // Allow read/write if user owns the board
      allow read, write: if request.auth != null && 
        resource.data.ownerId == request.auth.uid;
      
      // Allow create if user is authenticated
      allow create: if request.auth != null;
      
      // Items subcollection
      match /items/{itemId} {
        allow read, write: if request.auth != null;
      }
      
      // History subcollection
      match /history/{logId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
    }
  }
}
```

---

## 🚀 You're Ready!

Your Firebase setup is complete. The Boardroom app should now:

- ✅ Allow Google sign-in
- ✅ Save sticky notes to Firestore
- ✅ Track all changes in the History Log
- ✅ Persist data across sessions

---

## 🆘 Troubleshooting

### "Configuration not found" error
- Make sure `.env.local` file exists in project root
- Check that all values are filled in (no empty variables)
- Restart the dev server after editing `.env.local`

### "Firebase Auth error"
- Verify Google sign-in is enabled in Firebase Console
- Check that authorized domains include `localhost`

### "Permission denied" from Firestore
- Make sure you selected "test mode" when creating the database
- Check the security rules allow the current user's actions

---

*Last updated: January 2026*
