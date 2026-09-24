# Product Admin Dashboard

A responsive Product Admin Dashboard built with **Next.js, React, JavaScript, Tailwind CSS, and Axios**, using the DummyJSON API.

## 🚀 Features

* 🔐 Login and logout using DummyJSON authentication.
* 📦 View products in a responsive table/cards layout.
* 🔎 Debounced product search.
* 🗂️ Filter products by category.
* ↕️ Sort products by title, price, and rating.
* 📄 Pagination with 10, 20, and 50 items per page.
* 👁️ View detailed product information.
* ➕ Add new products with validation.
* ✏️ Edit existing products.
* 🗑️ Delete products with confirmation.
* ⏳ Loading, empty, and error states.
* 🔗 Search, filter, sorting, and pagination stored in URL.
* 📱 Fully responsive for desktop, tablet, and mobile.

## 🛠️ Tech Stack

* **Next.js** – Application framework and routing.
* **React** – UI development.
* **JavaScript** – Application logic.
* **Tailwind CSS** – Responsive styling.
* **Axios** – API communication.
* **DummyJSON** – Product and authentication API.

## 📂 Project Structure

```text
src/
├── app/
│   ├── login/
│   └── products/
│       ├── page.js
│       ├── new/
│       └── [id]/
│           ├── page.js
│           └── edit/
│
├── components/
│   ├── Navbar.js
│   ├── ProductTable.js
│   ├── ProductCard.js
│   ├── ProductForm.js
│   ├── SearchBar.js
│   ├── Pagination.js
│   └── DeleteModal.js
│
├── services/
│   ├── authApi.js
│   └── productApi.js
│
└── lib/
    └── axios.js
```

## 🔑 Login

Use the DummyJSON test credentials:

```text
Username: emilys
Password: emilyspass
```

Login endpoint:

```text
POST /auth/login
```

## 📡 API Endpoints

```text
POST   /auth/login
GET    /products
GET    /products/search?q=
GET    /products/{id}
GET    /products/categories
POST   /products/add
PUT    /products/{id}
DELETE /products/{id}
```

Base URL:

```text
https://dummyjson.com
```

## 📦 Product Listing

The product page displays image, title, category, price, rating, stock, and actions.

Desktop uses a table, while mobile uses responsive product cards.

## 🔎 Search

Product search uses the DummyJSON search endpoint with debounce to reduce unnecessary API requests.

```text
/products/search?q=phone
```

## 🗂️ Category Filter

Categories are loaded from the API and displayed in a dropdown.

The selected category is maintained in the URL.

## ↕️ Sorting

Products can be sorted by:

```text
Title
Price
Rating
```

Both ascending and descending options are supported.

## 📄 Pagination

Pagination uses `limit` and `skip` parameters.

Available page sizes:

```text
10
20
50
```

## 👁️ Product Details

Product details are available using:

```text
/products/[id]
```

The page displays product images, description, price, rating, stock, and reviews.

## ➕ Add Product

New products can be created from:

```text
/products/new
```

The form validates title, price, category, stock, rating, and description.

## ✏️ Edit Product

Existing products can be edited from:

```text
/products/[id]/edit
```

The form is pre-filled with the current product information.

## 🗑️ Delete Product

Deleting a product requires confirmation before sending the delete request.

## ⏳ Loading State

Loading indicators and skeletons are displayed while API requests are being processed.

## 📭 Empty State

A friendly empty state is shown when no products match the current search or filters.

## ⚠️ Error State

API failures display an error message with a **Retry** option.

## 🔗 URL State

Search, category, sorting, page, and page size are stored in URL query parameters.

Example:

```text
/products?page=2&limit=20&search=phone
```

## ⚡ Race Condition Handling

Search requests are handled so that older API responses do not overwrite newer search results.

## 🔌 Axios Architecture

A shared Axios instance is used for API communication, while API functions are separated from UI components.

```text
Component
    ↓
API Service
    ↓
Axios
    ↓
DummyJSON
```

## 📱 Responsive Design

The application supports desktop, tablet, and mobile screen sizes.

Desktop uses tables, while mobile uses cards and stacked layouts.

## ⚠️ Known Limitation

DummyJSON CRUD operations are simulated and are not permanently stored on the server.

## ▶️ Installation

Clone the repository:

```bash
git clone https://github.com/vishal14marathe/admindashboard.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🧪 Testing

Test login, product listing, search, filtering, sorting, pagination, CRUD operations, validation, loading states, error states, and responsive layouts.

## 🤖 AI Usage

AI tools were used for learning, debugging, UI suggestions, and code assistance.

All generated code was reviewed, modified, and tested during development.

## 🚀 Deployment

The application can be deployed using **Vercel**.
Link: `https://admindashboard-rust-two.vercel.app/login`

## 👨‍💻 Author

**Vishal Marathe**

B.Tech Computer Science & Engineering

GitHub: `https://github.com/vishal14marathe`


