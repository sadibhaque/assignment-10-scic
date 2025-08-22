# MyStore - E-commerce App with NextAuth.js

A modern e-commerce application built with Next.js 15 (App Router) featuring **real user authentication**, product management, and a beautiful black & white theme using Shadcn/UI components.

## ✨ Features

### 🔐 **Real Authentication System**
- **Email/Password Registration & Login**: Full user registration with password hashing
- **Google OAuth Integration**: Sign in with Google (setup required)
- **Secure Sessions**: JWT-based sessions with NextAuth.js
- **Password Security**: Bcrypt hashing for user passwords
- **Protected Routes**: Middleware-based route protection

### 🎨 **Modern UI with Shadcn/UI**
- **Black & White Theme**: Elegant, professional design
- **Responsive Components**: Cards, buttons, inputs, and forms
- **Toast Notifications**: Beautiful Sonner toast messages
- **Loading States**: Smooth user experience with loading spinners

### 📱 **Core Pages**
- **Landing Page (/)**: Hero section with featured products
- **Products (/products)**: Browse all products with category badges
- **Product Details (/products/[id])**: Detailed product information
- **Login/Register (/login, /register)**: Full authentication flow
- **Add Product (/add-product)**: Add new products (login required)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd my-store
   npm install
   ```

2. **Set up environment variables**
   
   The `.env.local` file is pre-configured with demo values. Update as needed:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=super-secret-jwt-token-with-at-least-32-characters-long
   
   # Google OAuth (optional but recommended)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Visit the application**
   Open [http://localhost:3001](http://localhost:3001) (or 3000 if available)

## 🔐 Authentication Setup

### Email/Password Authentication (Ready to Use!)

The app includes a **working email/password system** with:
- User registration at `/register`
- Secure login at `/login`
- Password hashing with bcryptjs
- Demo user: `demo@example.com` / `password`

### Google OAuth Setup (Optional)

For Google authentication, see the detailed setup guide: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

**Quick setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:3001/api/auth/callback/google`
4. Update your `.env.local` with the credentials

## 🗺️ Route Summary

### Public Routes
| Route | Description | Features |
|-------|-------------|----------|
| `/` | Landing page | Hero, featured products, navigation |
| `/products` | Product catalog | Grid layout, category badges |
| `/products/[id]` | Product details | Full info, features, breadcrumbs |
| `/login` | User login | Email/password + Google OAuth |
| `/register` | User registration | Account creation with validation |

### Protected Routes (Login Required)
| Route | Description | Features |
|-------|-------------|----------|
| `/add-product` | Product management | Form validation, toast notifications |

### API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication |
| `/api/auth/register` | POST | User registration endpoint |
| `/api/products` | GET/POST | Product CRUD operations |
| `/api/products/[id]` | GET | Single product details |

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v4 with JWT sessions
- **UI Library**: Shadcn/UI components
- **Styling**: Tailwind CSS v4
- **Security**: bcryptjs for password hashing
- **Notifications**: Sonner toast library
- **Database**: In-memory storage (easily replaceable)

## 🎨 Design System

### Theme
- **Primary Colors**: Black, white, and gray scale
- **Components**: Shadcn/UI with custom black & white theme
- **Typography**: Clean, modern fonts
- **Responsive**: Mobile-first design

### UI Components Used
- `Button`, `Card`, `Input`, `Label`, `Textarea`
- `Select`, `Badge`, `Sonner` (toasts)
- Custom `LoadingSpinner`, `ProductCard`

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Sessions**: Secure token-based authentication  
- **CSRF Protection**: Built into NextAuth.js
- **Environment Variables**: Sensitive data in `.env.local`
- **Input Validation**: Form validation on client and server
- **Protected Routes**: Middleware authentication checks

## 📝 User Flow

### New User Registration
1. Visit `/register`
2. Fill in name, email, and password
3. Account created with hashed password
4. Redirect to login with success message

### User Login
1. Visit `/login`
2. Login with email/password OR Google
3. Session created and stored
4. Access to protected routes

### Adding Products
1. Login required (automatic redirect if not authenticated)
2. Visit `/add-product`
3. Fill product form with validation
4. Toast notification on success/error
5. Redirect to products page

## 🚀 Deployment

Ready for deployment on Vercel, Netlify, or any Node.js hosting:

1. **Environment Variables**: Set all env vars in your hosting platform
2. **Google OAuth**: Update redirect URIs for your domain
3. **Database**: Replace in-memory storage with real database
4. **Domain**: Update `NEXTAUTH_URL` to your production URL

## 💾 Database Integration

The current implementation uses in-memory storage for demo purposes. To integrate with a real database:

1. **Replace `src/lib/auth.js`** with your database queries
2. **Popular options**: Prisma + PostgreSQL, MongoDB, Supabase
3. **Keep the same function signatures** for easy integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🎉 Ready to use with real authentication!** Built with Next.js 15, NextAuth.js, and Shadcn/UI components.
