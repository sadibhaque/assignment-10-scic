"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import Image from "next/image";
import LoadingSpinner from "../../../components/LoadingSpinner";
import productsService from "../../../lib/productsService";

// Generate product features based on category
function getProductFeatures(product) {
    const baseFeatures = ["High Quality", "Fast Delivery", "1 Year Warranty"];

    switch (product.category) {
        case "Electronics":
            return [...baseFeatures, "Latest Technology", "Energy Efficient"];
        case "Wearables":
            return [...baseFeatures, "Waterproof", "Long Battery Life"];
        case "Food & Beverage":
            return [...baseFeatures, "Organic", "Fresh"];
        case "Accessories":
            return [...baseFeatures, "Durable Material", "Ergonomic Design"];
        default:
            return baseFeatures;
    }
}

export default function ProductDetail({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(null);

    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const loadProduct = () => {
            try {
                // Get product directly from localStorage
                const foundProduct = productsService.getProduct(id);

                if (foundProduct) {
                    // Add features for better display
                    const productWithFeatures = {
                        ...foundProduct,
                        features: getProductFeatures(foundProduct),
                    };
                    setProduct(productWithFeatures);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error loading product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <LoadingSpinner />
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <Card className="max-w-md mx-auto text-center">
                        <CardContent className="p-8">
                            <h1 className="text-2xl font-bold text-foreground mb-4">
                                404 - Product Not Found
                            </h1>
                            <p className="text-muted-foreground mb-6">
                                The product you are looking for doesn&apos;t
                                exist or has been moved.
                            </p>
                            <div className="space-x-4">
                                <Button asChild>
                                    <Link href="/">Go Home</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/products">
                                        Browse Products
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
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
                                <Link
                                    href="/"
                                    className="hover:text-foreground transition-colors"
                                >
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
                        <div className="aspect-square bg-muted rounded-lg border overflow-hidden">
                            {product.image ? (
                                <Image
                                    width={500}
                                    height={500}
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-muted-foreground text-lg">
                                        No Image Available
                                    </span>
                                </div>
                            )}
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
                                            <Badge
                                                variant="default"
                                                className="text-xs"
                                            >
                                                In Stock
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <Button className="w-full" size="lg">
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    size="lg"
                                >
                                    Add to Wishlist
                                </Button>
                            </div>
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
