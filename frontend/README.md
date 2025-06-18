# ⚡ Neurix Frontend (React + Vite)

A modern, beautiful, and feature-rich frontend for the Neurix Group Expense Tracker, built with React, Vite, Tailwind CSS, and Redux.

---

## 🚀 Features

- **Landing Page**: Eye-catching hero, feature highlights, and call-to-action.
- **Authentication**: Sign up and sign in with smooth forms.
- **Dashboard**: View and manage groups, expenses, and personal summaries.
- **Group Management**: Create groups, add members, and view group details.
- **Expense Tracking**: Add, split, and settle expenses in groups.
- **Chat Interface**: Real-time chat for group discussions.
- **404 Not Found**: Friendly error page for invalid routes.
- **Responsive Design**: Fully mobile-friendly and visually appealing.

---

## 🗂️ Pages

| File              | Route                | Description                       |
| ----------------- | -------------------- | --------------------------------- |
| `LandingPage.jsx` | `/`                  | Landing/marketing page            |
| `AuthForm.jsx`    | `/signin`, `/signup` | Sign in and sign up forms         |
| `Index.jsx`       | `/u`                 | Main dashboard (groups, expenses) |
| `Chat.jsx`        | `/chat`              | Group chat interface              |
| `NotFound.jsx`    | `*` (fallback)       | 404 Not Found page                |

---

## 🧩 Main Components

- `GroupCard`, `CreateGroupModal`, `ExpenseForm`, `PersonalSummary`, `PayBack`, `ChatInterface`, `ChatMessage`, `ChatSideBar`, `GroupDetails`

---

## 🔗 API Endpoints Used

- `/signup` — Register a new user
- `/login` — User login
- `/groups` — Create a group
- `/groups/{group_id}` — Get group details
- `/groups/{group_id}/expenses` — Add expense
- `/groups/{group_id}/balances` — Get group balances
- `/users/{user_id}/groups` — Get all groups for a user
- `/users/{user_id}/balances` — Get user balances
- `/users/payBack` — Settle an expense
- `/users/{user_id}/create_session` — Start chat session
- `/users/{user_id}/query/{session_id}` — Query chat session
- `/users/{user_id}/load_all_chat` — Load all chat sessions
- `/users/{user_id}/load_chat/{session_id}` — Load a specific chat session

---

## 📦 Dependencies

- **react** ^19.1.0
- **react-dom** ^19.1.0
- **react-router-dom** ^7.6.2
- **redux**, **@reduxjs/toolkit**, **react-redux**, **redux-persist**, **redux-thunk**
- **@tanstack/react-query**
- **axios**
- **react-hook-form**
- **react-markdown**
- **react-toastify**
- **lucide-react** (icons)
- **tailwindcss** & **@tailwindcss/vite**
- **vite** (build tool)

---

## 🛠️ Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## ✨ Enjoy a seamless, modern group expense experience with Neurix!
