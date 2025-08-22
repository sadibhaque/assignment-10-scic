# MyStore - Modern E-commerce App

A modern e-commerce application built with **Next.js 15 (Turbopack)** featuring **localStorage-based product management**, authentication system, and elegant UI design.

## ✨ Key Features

-   �️ **localStorage Product Management** - Add, view, and manage products with browser storage
-   🔐 **NextAuth.js Authentication** - Email/password + Google OAuth support
-   🎨 **Shadcn/UI Components** - Modern black & white theme design
-   📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
-   ⚡ **Next.js 15 + Turbopack** - Latest features with fast development

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd my-store
npm install

# Start development
npm run dev
```

Visit **http://localhost:3000** (or 3001 if port is busy)

## 📱 Routes

| Route                  | Description                | Auth Required |
| ---------------------- | -------------------------- | ------------- |
| `/`                    | Homepage with hero section | ❌            |
| `/products`            | Browse all products        | ❌            |
| `/products/[id]`       | Product details page       | ❌            |
| `/login` / `/register` | Authentication             | ❌            |
| `/add-product`         | Add new products           | ✅            |

## �️ Tech Stack

-   **Framework**: Next.js 15 (App Router + Turbopack)
-   **Authentication**: NextAuth.js v4 with JWT sessions
-   **UI**: Shadcn/UI + Tailwind CSS v4
-   **Storage**: localStorage for product data
-   **Security**: bcryptjs password hashing
-   **Notifications**: Sonner toast messages

## 🔐 Authentication

**Demo Login**: `demo@example.com` / `password`

### Environment Setup

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Optional Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 💾 Data Storage

Products are stored in **browser localStorage** with automatic initialization:

-   Initial products loaded on first visit
-   New products persist across sessions
-   Unique ID generation prevents conflicts
-   Client-side data management

## 🎨 UI Design

-   **Theme**: Professional black & white color scheme
-   **Components**: Shadcn/UI with custom styling
-   **Images**: Full-width, cover-fit product images
-   **Responsive**: Mobile, tablet, and desktop layouts
-   **Animations**: Smooth transitions and loading states

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listing & details
│   ├── add-product/       # Product creation form
│   ├── login|register/    # Authentication pages
│   └── api/              # API routes
├── components/           # Reusable UI components
├── lib/                 # Utilities & services
│   ├── productsService.js # localStorage management
│   └── auth.js           # Authentication logic
└── middleware.js        # Route protection
```

## � Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 🚀 Deployment

Ready for **Vercel**, **Netlify**, or any Node.js hosting:

1. Set environment variables
2. Update `NEXTAUTH_URL` to your domain
3. Configure Google OAuth redirect URIs
4. Deploy with `npm run build`

---

**Built with Next.js 15 + localStorage + NextAuth.js**
