import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "404 - Page Not Found | MyStore",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center py-12">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        The page you are looking for doesn&apos;t exist or has
                        been moved.
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Go Home
                        </Link>
                        <Link
                            href="/products"
                            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
