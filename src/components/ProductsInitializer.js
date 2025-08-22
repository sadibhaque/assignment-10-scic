"use client";

import { useEffect } from "react";
import productsService from "../lib/productsService";

export default function ProductsInitializer() {
    useEffect(() => {
        // Initialize products in localStorage when the app loads
        if (typeof window !== "undefined") {
            productsService.initializeProducts();
            console.log("Products initialized in localStorage");
        }
    }, []);

    // This component doesn't render anything
    return null;
}
