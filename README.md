# NabilStore — Full-Stack E-Commerce Platform

A full-stack e-commerce web application built as a hands-on learning project, covering the complete flow from product browsing to checkout with real payment processing. The backend is a REST API built with **NestJS + PostgreSQL (Prisma)**, and the frontend is built with **Next.js (App Router) + Redux Toolkit**.

This project was built to practice production-style patterns: JWT authentication with access/refresh tokens, role-based data modeling, RESTful API design with Swagger documentation, state management, and Stripe payment integration.

---

## 🛠️ Tech Stack

### Backend (`/api`)
- **NestJS 11** (Node.js framework, TypeScript-first)
- **PostgreSQL** with **Prisma ORM 7**
- **Passport.js** — JWT strategy for access tokens, separate strategy for refresh tokens
- **class-validator** / **class-transformer** — DTO validation
- **Swagger** — auto-generated interactive API documentation
- **Stripe** (Node SDK) — payment intent creation & confirmation
- **NestJS Throttler** — rate limiting on sensitive endpoints (auth, payments)
- **bcrypt** — password hashing

### Frontend (`/front`)
- **Next.js 16** (App Router, Server & Client Components)
- **React 19** + **TypeScript**
- **Redux Toolkit** + **React-Redux** — global state management
- **redux-persist** — persisting auth/cart state across sessions
- **Axios** — HTTP client with request/response interceptors (automatic JWT attachment, token refresh handling)
- **@stripe/react-stripe-js** — Stripe Elements for card payment UI
- **Framer Motion** — UI animations
- **SCSS Modules** — component-scoped styling
- **Lucide React** — icon set

---

## ✨ Features

### Implemented
- 🔐 JWT-based authentication (login, access + refresh token issuance)
- 🛍️ Product catalog with search, category filtering, and pagination
- 📄 Product detail pages with breadcrumbs and "similar products" recommendations
- 🛒 Shopping cart — add, increment/decrement quantity, remove items
- 💳 Multi-step checkout flow (payment method selection → processing → confirmation)
- 💰 **Stripe integration** — Payment Intents API, Stripe Elements for card entry
- 🧑‍🤝‍🧑 Role-based data model (`USER` / `ADMIN`) at the database level
- 📚 Interactive API documentation via Swagger
- 🔄 Automatic access token refresh via Axios interceptors
- 📦 Modular NestJS architecture (auth, users, products, category, carts, orders, payments as separate modules)

### 🚧 Roadmap / In Progress
- User registration page (backend endpoint exists, frontend page pending)
- User profile management (view/edit profile, change password)
- Admin dashboard (product, category, and order management UI)
- Order history page for logged-in users
- Full backend persistence for cart (currently cart state lives client-side)
- Hardened refresh-token security flow

> This project is under active, continuous development as part of an ongoing learning process.

---

## 📸 Screenshots

<!--
  Tambahkan screenshot di sini dengan format:
  ![Nama Halaman](./screenshots/nama-file.png)
  Simpan gambar-gambarnya di folder /screenshots di root project.
-->

### Landing Page
(./screenshots/landing.png)

### Login Page
(./screenshots/login.png)

### Cart Page
(./screenshots/cart.png)

### Checkout Page
(./screenshots/checkout.png)

---

## 📁 Project Structure

```
next-nest-ecommerce/
├── api/                      # NestJS backend
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── src/
│       ├── common/           # Shared guards, decorators, interfaces
│       ├── modules/
│       │   ├── auth/         # Authentication (JWT, login, refresh, logout)
│       │   ├── users/        # User profile management
│       │   ├── products/     # Product catalog
│       │   ├── category/     # Product categories
│       │   ├── carts/        # Shopping cart
│       │   ├── orders/       # Order management
│       │   └── payments/     # Stripe payment integration
│       └── prisma/           # Prisma service (DB connection)
│
└── front/                    # Next.js frontend
    ├── app/                  # App Router pages
    ├── components/modules/   # Feature-organized UI components
    ├── hooks/                # Custom React hooks (data fetching + state)
    ├── services/api/         # API client layer (Axios-based)
    ├── store/                # Redux store & slices
    └── types/                # Shared TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- A **PostgreSQL** database (a free hosted instance like [Neon](https://neon.tech) works well)
- A **Stripe** account (test mode keys are sufficient)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Backend setup (`/api`)

```bash
cd api
npm install
```

Create an `api/.env` file (use `api/.env.example` as a reference):

```env
PORT=3001
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=900
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Run database migrations and seed sample data:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 3. Frontend setup (`/front`)

```bash
cd ../front
npm install
```

Create a `front/.env` file (use `front/.env.example` as a reference):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Run the application

Open **two terminal windows**, one for each project.

**Terminal 1 — Backend:**
```bash
cd api
npm run start:dev
```

**Terminal 2 — Frontend:**
```bash
cd front
npm run dev
```

The API will be available at `http://localhost:3001`, with interactive Swagger documentation at:

```
http://localhost:3001/api/docs
```

The frontend will be available at:

```
http://localhost:3000
```

---

## 📄 API Documentation

Once the backend is running, full interactive API documentation (request/response schemas, auth requirements, try-it-out console) is available via Swagger UI at `/api/docs`.

---

## 👤 Author

**Sultan Nabil**
