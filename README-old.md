# MyStore - Simple E-commerce App

A modern e-commerce application built with Next.js 15 (App Router) featuring user authentication, product management, and a clean, responsive design.

## 📋 Project Description

MyStore is a simple yet fully functional e-commerce application that demonstrates modern web development practices. It includes public pages for browsing products, user authentication with NextAuth.js, and protected pages for product management. The app features a responsive design, loading states, toast notifications, and follows best practices for Next.js 15 development.

## ✨ Features

### Public Pages

-   **Landing Page (/)**: Hero section, featured products, and navigation
-   **Product List (/products)**: Browse all available products
-   **Product Details (/products/[id])**: Detailed view of individual products

### Authentication

-   **Login Page (/login)**: Social login (Google) and credential-based authentication
-   **Protected Routes**: Middleware-based route protection

### Protected Pages

-   **Add Product Dashboard (/dashboard/add-product)**: Form to add new products (login required)

### Additional Features

-   Loading spinners for form submissions
-   Toast notifications for user feedback
-   Responsive design with Tailwind CSS
-   Mock database with API routes
-   Session management with NextAuth.js

## 🚀 Setup & Installation Instructions

### Prerequisites

-   Node.js 18+ installed on your system
-   npm or yarn package manager

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd my-store
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    The `.env.local` file has been created with default values. For production or if you want to use Google OAuth, update the following variables:

    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

    # Optional: For Google OAuth
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**

    Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Demo Login Credentials

For testing the credential-based login, use:

-   **Email**: `demo@example.com`
-   **Password**: `password`

## 🗺️ Route Summary

### Public Routes

| Route            | Description     | Features                                       |
| ---------------- | --------------- | ---------------------------------------------- |
| `/`              | Landing page    | Hero section, featured products, navigation    |
| `/products`      | Product list    | Grid layout, all products, search/filter ready |
| `/products/[id]` | Product details | Full product info, features, breadcrumbs       |
| `/login`         | Authentication  | Email/password & Google OAuth                  |

### Protected Routes

| Route                    | Description     | Auth Required | Features                           |
| ------------------------ | --------------- | ------------- | ---------------------------------- |
| `/dashboard/add-product` | Add new product | ✅ Yes        | Form validation, file upload ready |

### API Routes

| Route                     | Method   | Description                | Auth Required |
| ------------------------- | -------- | -------------------------- | ------------- |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication | No            |
| `/api/products`           | GET      | Fetch all products         | No            |
| `/api/products`           | POST     | Create new product         | No\*          |
| `/api/products/[id]`      | GET      | Fetch single product       | No            |

\*Note: POST to `/api/products` should be protected in production

## 🛠️ Technology Stack

-   **Framework**: Next.js 15 (App Router)
-   **Authentication**: NextAuth.js v4
-   **Styling**: Tailwind CSS v4
-   **Language**: JavaScript (ES2022+)
-   **State Management**: React useState/useEffect
-   **API**: Next.js API Routes
-   **Deployment Ready**: Vercel, Netlify, or any Node.js hosting

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and works on:

-   Desktop (1024px+)
-   Tablet (768px - 1023px)
-   Mobile (320px - 767px)

## 🔐 Authentication Flow

1. User visits protected route (`/dashboard/add-product`)
2. Middleware redirects to `/login` if not authenticated
3. User can login with:
    - Demo credentials (email/password)
    - Google OAuth (if configured)
4. After successful login, user is redirected to `/products`
5. User can now access protected dashboard routes

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service. Make sure to:

1. Set environment variables in your hosting platform
2. Configure Google OAuth credentials (if using)
3. Update `NEXTAUTH_URL` to your domain
4. Generate a secure `NEXTAUTH_SECRET`

## 📝 Future Enhancements

-   [ ] Cart functionality
-   [ ] User profiles
-   [ ] Order management
-   [ ] Payment integration
-   [ ] Product images upload
-   [ ] Admin dashboard
-   [ ] Email notifications
-   [ ] Product reviews and ratings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 15 and modern web technologies.
