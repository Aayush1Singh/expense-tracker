# 💡 Neurix Group Ledger Backend

A powerful backend API for managing group expenses, balances, and chat sessions. Built with **FastAPI**, **MongoDB**, and **LangChain** for seamless group collaboration and smart ledger management.

---

## 🚀 Features

- **User Management**: Signup, login, and manage user sessions.
- **Group Creation & Management**: Create groups, add members, and fetch group details.
- **Expense Tracking**: Add expenses, split bills, and track who owes whom.
- **Balance Calculation**: Instantly view group and personal balances.
- **Payback System**: Settle debts between users.
- **Chat Sessions**: Create and query chat sessions for group discussions.
- **Session History**: Load all chat sessions and specific session histories.

---

## 📚 API Endpoints

### User Endpoints

| Method | Endpoint                                  | Description                       |
| ------ | ----------------------------------------- | --------------------------------- |
| POST   | `/signup`                                 | Register a new user               |
| POST   | `/login`                                  | Login with username               |
| GET    | `/users/{user_id}/groups`                 | Get all groups for a user         |
| GET    | `/users/{user_id}/balances`               | Get all balances for a user       |
| POST   | `/users/payBack`                          | Settle/pay back an expense        |
| POST   | `/users/{user_id}/create_session`         | Create a new chat session         |
| GET    | `/users/{user_id}/query/{session_id}`     | Query a chat session              |
| GET    | `/users/{user_id}/load_all_chat`          | Load all chat sessions for a user |
| GET    | `/users/{user_id}/load_chat/{session_id}` | Load a specific chat session      |

### Group Endpoints

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| POST   | `/groups`                     | Create a new group           |
| GET    | `/groups/{group_id}`          | Get group details            |
| POST   | `/groups/{group_id}/expenses` | Add a new expense to a group |
| GET    | `/groups/{group_id}/balances` | Get balances for a group     |

### Miscellaneous

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Health check (Hello) |

---

## 📝 Endpoint Details

### User Endpoints

- **POST `/signup`**: Register a new user with a name and username.
- **POST `/login`**: Login using a username.
- **GET `/users/{user_id}/groups`**: Fetch all groups the user is part of.
- **GET `/users/{user_id}/balances`**: Get all balances for a user across groups.
- **POST `/users/payBack`**: Settle an expense by providing username and expense ID.
- **POST `/users/{user_id}/create_session`**: Start a new chat session for the user.
- **GET `/users/{user_id}/query/{session_id}`**: Query a chat session with a message.
- **GET `/users/{user_id}/load_all_chat`**: Load all chat sessions for the user.
- **GET `/users/{user_id}/load_chat/{session_id}`**: Load a specific chat session.

### Group Endpoints

- **POST `/groups`**: Create a new group with a name and member usernames.
- **GET `/groups/{group_id}`**: Get details of a specific group.
- **POST `/groups/{group_id}/expenses`**: Add a new expense to a group (with user, amount, description, split type, etc).
- **GET `/groups/{group_id}/balances`**: Get the current balances for all members in a group.

### Miscellaneous

- **GET `/`**: Health check endpoint. Returns a simple message.

---

## 🛠️ Tech Stack

- **FastAPI**
- **MongoDB** (via MongoEngine)
- **LangChain** (for chat features)

---

## 📦 Requirements

Install dependencies with:

```bash
pip install -r requirements.txt
```

---

## 🏁 Getting Started

1. Clone the repo
2. Install dependencies
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

---

## ✨ Enjoy seamless group expense management and smart chat sessions with Neurix Group Ledger!
