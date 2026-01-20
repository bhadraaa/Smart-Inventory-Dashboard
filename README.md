# Smart Inventory Dashboard

A simple inventory management dashboard built as part of the Levich Solutions internship technical assessment.

The application allows a retail store manager to:
- View products in a responsive grid
- Increment and decrement stock levels
- Instantly see visual alerts for low-stock items
- Prevent invalid stock updates (negative values)

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express
- **Data Storage:** Local JSON file (no external database)

---

## 📦 Features

- Responsive product grid layout
- Product cards with name, price, and stock quantity
- "+" and "-" buttons to update stock
- UI prevents stock from going below zero
- Backend validation for negative quantities
- Visual low-stock indicator (red border + "Critical Low" badge)
- Per-product loading state during stock updates

---

## 🔍 Design & Engineering Decisions

- Used a **local JSON file** for persistence to focus on business logic rather than database configuration, as suggested in the task.
- Kept components small and focused (`ProductCard`, `ProductGrid`) for clarity and maintainability.
- Implemented **per-product loading states** to avoid blocking the entire UI during updates.
- Handled backend errors defensively to prevent UI crashes.
- Prioritized a **minimal and clean UI** over adding extra features.

---

## 🚀 Running the Project Locally

### Backend
```bash
cd backend
npm install
node server.js
