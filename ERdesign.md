# Expense Tracker - ER Diagram & System Design

## 1. ER Diagram

**Entities:**
- **User**
  - _id (PK)
  - name
  - email
  - password
  - createdAt
  - updatedAt

- **Expense**
  - _id (PK)
  - title
  - amount
  - category
  - date
  - userId (FK → User._id)
  - createdAt
  - updatedAt

**Relationships:**
- One User can have many Expenses (1:N)

```
[User] 1---N [Expense]
```

## 2. Database Design

**User Collection**
- Stores user credentials and profile info.
- Indexed on `email` for uniqueness.

**Expense Collection**
- Stores each expense record.
- Indexed on `userId` for fast lookup.
- `category` is an enum: ["Food", "Transport", "Shopping", "Bills", "Others"]

**Schema Example:**
```js
// User
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
}

// Expense
{
  _id: ObjectId,
  title: String,
  amount: Number,
  category: String,
  date: Date,
  userId: ObjectId, // references User._id
  createdAt: Date,
  updatedAt: Date
}
```

## 3. Normalization & Denormalization

**Normalization:**
- Data is normalized to avoid redundancy.
- User info is stored in the User collection.
- Expenses reference users via `userId` (foreign key).
- No user info is duplicated in Expense documents.

**Denormalization:**
- Not used in this project; all data is normalized for simplicity and integrity.
- If performance required, denormalization could be used for reporting (e.g., embedding user name in Expense).

## 4. Architecture / Design Pattern

**MVC Pattern:**
- **Model:** Mongoose schemas for User and Expense ([backend/src/models/userModel.js](backend/src/models/userModel.js), [backend/src/models/expenseModel.js](backend/src/models/expenseModel.js))
- **View:** Not applicable (API only; frontend is separate)
- **Controller:** Business logic ([backend/src/controllers/user.controller.js](backend/src/controllers/user.controller.js), [backend/src/controllers/expense.controller.js](backend/src/controllers/expense.controller.js))
- **Routes:** API endpoints ([backend/src/routes/user.route.js](backend/src/routes/user.route.js), [backend/src/routes/expense.route.js](backend/src/routes/expense.route.js))
- **Middleware:** Auth ([backend/src/middlewares/auth.middleware.js](backend/src/middlewares/auth.middleware.js))

**Frontend:** Component-based React, Context API for global state ([frontend/src/context/useAuthProvider.jsx](frontend/src/context/useAuthProvider.jsx)), React Router for navigation.

## 5. Data Flow & Processing

**Registration/Login:**
- User submits form → Frontend sends POST to `/user/register` or `/user/login`
- Backend validates, hashes password, generates JWT, returns token

**Expense Creation:**
- Authenticated user submits expense → Frontend sends POST to `/expense/add` with JWT in header
- Backend validates JWT, creates Expense linked to user

**Profile & Visualization:**
- Frontend requests `/user/profile` with JWT
- Backend returns user info and all expenses for that user
- Frontend aggregates and visualizes data (charts, summaries)

**Authentication:**
- JWT stored in localStorage/cookie
- Backend middleware checks JWT for protected routes

**Summary:**
- Data flows from frontend forms → backend API → MongoDB
- Backend enforces validation, authentication, and relationships
- Frontend visualizes and manages state using React Context

---