"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "sonner";
import productsService from "../../lib/productsService";

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const categories = [
        "Electronics",
        "Wearables",
        "Food & Beverage",
        "Accessories",
        "Home & Garden",
        "Sports & Outdoors",
        "Books",
        "Clothing",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        setLoading(true);

        try {
            // Add product to localStorage first
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
            };

            const newProduct = productsService.addProduct(productData);

            if (newProduct) {
                // Also try to sync with the API (optional, for future server sync)
                try {
                    await fetch("/api/products", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(productData),
                    });
                } catch (apiError) {
                    console.warn(
                        "Failed to sync with API, but product is saved locally:",
                        apiError
                    );
                }

                toast.success("Product added successfully!");

                // Reset form
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Electronics",
                    image: "",
                });

                // Redirect to products page after a short delay
                setTimeout(() => {
                    router.push("/products");
                }, 1500);
            } else {
                toast.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 py-12 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Add New Product
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Create a new product listing for your store
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                            <CardDescription>
                                Fill in the details for your new product
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your product..."
                                        rows={4}
                                        required
                                        className="w-full resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">
                                        Product Image URL
                                    </Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/product-image.jpg"
                                        className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Optional: Enter a valid image URL for
                                        your product
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">
                                            Price ($) *
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            required
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={handleCategoryChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        {loading ? (
                                            <>
                                                <LoadingSpinner className="mr-2 h-4 w-4" />
                                                Adding Product...
                                            </>
                                        ) : (
                                            "Add Product"
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/products")}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
