import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

async function getProduct(id) {
    const res = await fetch(
        `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
        }/api/products/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Product Not Found - MyStore",
        };
    }

    return {
        title: `${product.name} - MyStore`,
        description: product.description,
    };
}

export default async function ProductDetail({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-gray-700">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link
                                    href="/products"
                                    className="hover:text-gray-700"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-800 font-medium">
                                {product.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-lg">
                                Product Image
                            </span>
                        </div>

                        {/* Product Information */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                                    {product.category}
                                </p>
                            </div>

                            <div className="text-4xl font-bold text-blue-600">
                                ${product.price}
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Description
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {product.features && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                        Key Features
                                    </h2>
                                    <ul className="space-y-2">
                                        {product.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center text-gray-600"
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-green-500 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            <div className="space-y-4">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Add to Cart
                                </button>
                                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Add to Wishlist
                                </button>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                    Product Information
                                </h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Product ID:</span>
                                        <span>{product.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Category:</span>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Availability:</span>
                                        <span className="text-green-600">
                                            In Stock
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Products */}
                    <div className="mt-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to Products
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
