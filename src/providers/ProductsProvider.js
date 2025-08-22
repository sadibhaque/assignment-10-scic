"use client";

import { createContext, useContext, useEffect, useState } from "react";
import productsService from "../lib/productsService";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize products in localStorage when component mounts
        const initializeProducts = () => {
            try {
                productsService.initializeProducts();
                const allProducts = productsService.getProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Error initializing products:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeProducts();
    }, []);

    const addProduct = (productData) => {
        try {
            const newProduct = productsService.addProduct(productData);
            if (newProduct) {
                setProducts((prev) => [...prev, newProduct]);
                return newProduct;
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
        return null;
    };

    const updateProduct = (id, productData) => {
        try {
            const updatedProduct = productsService.updateProduct(
                id,
                productData
            );
            if (updatedProduct) {
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === id ? updatedProduct : product
                    )
                );
                return updatedProduct;
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
        return null;
    };

    const deleteProduct = (id) => {
        try {
            const success = productsService.deleteProduct(id);
            if (success) {
                setProducts((prev) =>
                    prev.filter((product) => product.id !== id)
                );
                return true;
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        return false;
    };

    const getProduct = (id) => {
        return products.find((product) => product.id === id);
    };

    const refreshProducts = () => {
        try {
            const allProducts = productsService.getProducts();
            setProducts(allProducts);
        } catch (error) {
            console.error("Error refreshing products:", error);
        }
    };

    const value = {
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        refreshProducts,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}
