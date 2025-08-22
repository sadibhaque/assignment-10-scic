// Products service for managing products with localStorage
const PRODUCTS_KEY = "mystore_products";

// Mock products data (initial data)
const defaultProducts = [
    {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        description:
            "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        image: "https://i.ibb.co.com/fVGNLjgN/image.png",
        category: "Electronics",
    },
    {
        id: "2",
        name: "Smart Fitness Watch",
        description:
            "Advanced fitness tracker with heart rate monitoring and GPS functionality.",
        price: 299.99,
        image: "https://i.ibb.co.com/csjyY4L/image.png",
        category: "Wearables",
    },
    {
        id: "3",
        name: "Organic Coffee Beans",
        description:
            "Premium organic coffee beans sourced from sustainable farms.",
        price: 24.99,
        image: "https://i.ibb.co.com/jkS5Z4Vg/image.png",
        category: "Food & Beverage",
    },
    {
        id: "4",
        name: "Laptop Stand",
        description:
            "Ergonomic aluminum laptop stand with adjustable height and angle.",
        price: 79.99,
        image: "https://i.ibb.co.com/N6bZCVfh/image.png",
        category: "Accessories",
    },
];

class ProductsService {
    constructor() {
        this.initializeProducts();
    }

    // Initialize products in localStorage if not exists
    initializeProducts() {
        if (typeof window === "undefined") return; // Server-side check

        const existingProducts = localStorage.getItem(PRODUCTS_KEY);
        if (!existingProducts) {
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
        }
    }

    // Get all products from localStorage
    getProducts() {
        if (typeof window === "undefined") return defaultProducts; // Server-side fallback

        const products = localStorage.getItem(PRODUCTS_KEY);
        return products ? JSON.parse(products) : defaultProducts;
    }

    // Get single product by ID
    getProduct(id) {
        const products = this.getProducts();
        return products.find((product) => product.id === id);
    }

    // Add new product to localStorage
    addProduct(productData) {
        if (typeof window === "undefined") return null;

        const products = this.getProducts();

        // Generate a unique ID by finding the highest existing ID and adding 1
        let maxId = 0;
        products.forEach((product) => {
            const numId = parseInt(product.id, 10);
            if (!isNaN(numId) && numId > maxId) {
                maxId = numId;
            }
        });

        const newProduct = {
            id: (maxId + 1).toString(),
            ...productData,
            createdAt: new Date().toISOString(),
        };

        products.push(newProduct);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        return newProduct;
    }

    // Update existing product
    updateProduct(id, productData) {
        if (typeof window === "undefined") return null;

        const products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) return null;

        products[productIndex] = {
            ...products[productIndex],
            ...productData,
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        return products[productIndex];
    }

    // Delete product
    deleteProduct(id) {
        if (typeof window === "undefined") return false;

        const products = this.getProducts();
        const filteredProducts = products.filter(
            (product) => product.id !== id
        );

        if (filteredProducts.length === products.length) return false;

        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
        return true;
    }

    // Clear all products
    clearProducts() {
        if (typeof window === "undefined") return;
        localStorage.removeItem(PRODUCTS_KEY);
    }

    // Reset to default products
    resetToDefault() {
        if (typeof window === "undefined") return;
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }
}

// Create singleton instance
const productsService = new ProductsService();

export default productsService;
