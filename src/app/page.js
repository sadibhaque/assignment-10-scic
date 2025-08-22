"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "../components/ui/button";
import productsService from "../lib/productsService";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Get products from localStorage
                const allProducts = productsService.getProducts();
                const featured = allProducts.slice(0, 3); // Show only first 3 products on homepage
                setFeaturedProducts(featured);
            } catch (error) {
                console.error("Error loading featured products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Hero Carousel Section */}
            <HeroCarousel />

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

                    {loading ? (
                        <div className="text-center py-12">
                            <LoadingSpinner className="h-8 w-8 mb-4 mx-auto" />
                            <p className="text-muted-foreground">
                                Loading featured products...
                            </p>
                        </div>
                    ) : featuredProducts.length === 0 ? (
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
