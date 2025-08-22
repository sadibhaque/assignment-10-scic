import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

async function getProducts() {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        return [];
    }
    const products = await res.json();
    return products.slice(0, 3); // Show only first 3 products on homepage
}

export default async function Home() {
    const featuredProducts = await getProducts();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background to-muted border-b py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                        Welcome to MyStore
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                        Discover amazing products with unbeatable quality and
                        service
                    </p>
                    <div className="space-x-4">
                        <Button asChild size="lg">
                            <Link href="/products">Shop Now</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Product Highlights Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Featured Products
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our most popular items
                        </p>
                    </div>

                    {featuredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                No products available at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Button asChild size="lg">
                            <Link href="/products">View All Products</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
