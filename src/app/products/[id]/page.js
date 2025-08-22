import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

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
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link
                                    href="/products"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-foreground font-medium">
                                {product.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="aspect-square bg-muted rounded-lg border flex items-center justify-center">
                            <span className="text-muted-foreground text-lg">
                                Product Image
                            </span>
                        </div>

                        {/* Product Information */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    {product.name}
                                </h1>
                                <Badge variant="secondary" className="text-sm">
                                    {product.category}
                                </Badge>
                            </div>

                            <div className="text-4xl font-bold text-foreground">
                                ${product.price}
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-3">
                                    Description
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {product.features && (
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground mb-3">
                                        Key Features
                                    </h2>
                                    <ul className="space-y-2">
                                        {product.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center text-muted-foreground"
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-primary mr-2"
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
                                <Button className="w-full" size="lg">
                                    Add to Cart
                                </Button>
                                <Button variant="outline" className="w-full" size="lg">
                                    Add to Wishlist
                                </Button>
                            </div>

                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="text-sm font-semibold text-foreground mb-3">
                                        Product Information
                                    </h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex justify-between">
                                            <span>Product ID:</span>
                                            <span>{product.id}</span>
                                        </div>
                                        <div className="h-px bg-border my-2" />
                                        <div className="flex justify-between">
                                            <span>Category:</span>
                                            <span>{product.category}</span>
                                        </div>
                                        <div className="h-px bg-border my-2" />
                                        <div className="flex justify-between">
                                            <span>Availability:</span>
                                            <Badge variant="default" className="text-xs">
                                                In Stock
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Back to Products */}
                    <div className="mt-12">
                        <Button variant="ghost" asChild>
                            <Link
                                href="/products"
                                className="inline-flex items-center"
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
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
