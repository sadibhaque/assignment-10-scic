"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import productsService from "../../lib/productsService";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // First try to get products from localStorage
                const localProducts = productsService.getProducts();
                setProducts(localProducts);

                // Optionally, try to sync with API (for future server integration)
                try {
                    const response = await fetch("/api/products", {
                        cache: "no-store",
                    });
                    if (response.ok) {
                        const apiProducts = await response.json();
                        // You could merge or compare with local products here if needed
                        console.log(
                            "API products loaded (for reference):",
                            apiProducts
                        );
                    }
                } catch (apiError) {
                    console.warn(
                        "API not available, using localStorage only:",
                        apiError
                    );
                }
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <LoadingSpinner className="h-12 w-12 mb-4 mx-auto" />
                        <p className="text-muted-foreground">
                            Loading products...
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Our Products
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our carefully curated collection of
                            high-quality products
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                No products available at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
