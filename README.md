🌐 LearnLingo
A web application for finding and booking language tutors. Built as a pet project to practice React, TypeScript, and Firebase.
🚀 Live Demo
https://learn-lingo-silk.vercel.app/

Teachers page with filters and teacher cards

✨ Features

📋 Browse a list of language teachers with detailed info
🔍 Filter teachers by language, level, and price
❤️ Add teachers to favorites (available for logged-in users only)
📅 Book a trial lesson with a teacher
🔐 Authentication — register and log in via email/password
💾 Favorites saved in localStorage per session

🛠️ Tech Stack

React — UI library
TypeScript — static typing
Vite — build tool
Firebase — authentication + Realtime Database
React Router — client-side routing
React Hook Form + Yup — form validation
CSS Modules — component-scoped styles
React Icons — icon library

📁 Project Structure
src/
├── components/
│   ├── Header/
│   ├── TeacherCard/
│   └── Modal/
│       ├── Login/
│       ├── Registration/
│       └── Booking/
├── pages/
│   ├── Home.tsx
│   ├── TeachersPage/
│   └── FavoritesPage.tsx
├── context/
│   ├── AuthContext.ts
│   └── AuthProvider.tsx
├── firebase/
│   └── config.ts
└── types/
    └── types.ts
⚙️ Getting Started
1. Clone the repository
bashgit clone https://github.com/OleksandrT434/LearnLingo
cd learnlingo
2. Install dependencies
bashnpm install
3. Set up Firebase
Create a project at firebase.google.com, enable:

Authentication (Email/Password)
Realtime Database

Create a .env file in the root:
envVITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
4. Run the app
bashnpm run dev
🔒 Authentication

Users can register and log in with email and password
Favorites and booking are only available to logged-in users
Unauthorized users are prompted to log in via a modal

📌 TODO / Future improvements

 Save favorites to Firebase per user instead of localStorage
 Real booking system with date/time picker
 Teacher profile page
 Search by teacher name
 Pagination instead of "Load more"
 Dark mode

👨‍💻 Author
Made with ❤️ by Oleksandr Tkachenko