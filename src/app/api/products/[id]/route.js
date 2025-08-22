import { products } from "../route.js";

// Get product by ID
export async function GET(request, { params }) {
    const { id } = await params;

    // Mock products data (same as in route.js)
    const mockProducts = [
        {
            id: "1",
            name: "Wireless Bluetooth Headphones",
            description:
                "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who need clear audio quality.",
            price: 199.99,
            image: "/placeholder-product.jpg",
            category: "Electronics",
            features: [
                "Noise Cancellation",
                "30-hour battery",
                "Bluetooth 5.0",
                "Quick charge",
            ],
        },
        {
            id: "2",
            name: "Smart Fitness Watch",
            description:
                "Advanced fitness tracker with heart rate monitoring and GPS functionality. Track your workouts and health metrics with precision.",
            price: 299.99,
            image: "/placeholder-product.jpg",
            category: "Wearables",
            features: [
                "Heart Rate Monitor",
                "GPS Tracking",
                "Sleep Monitoring",
                "Water Resistant",
            ],
        },
        {
            id: "3",
            name: "Organic Coffee Beans",
            description:
                "Premium organic coffee beans sourced from sustainable farms. Rich flavor profile with hints of chocolate and caramel.",
            price: 24.99,
            image: "/placeholder-product.jpg",
            category: "Food & Beverage",
            features: [
                "Organic Certified",
                "Fair Trade",
                "Single Origin",
                "Dark Roast",
            ],
        },
        {
            id: "4",
            name: "Laptop Stand",
            description:
                "Ergonomic aluminum laptop stand with adjustable height and angle. Improve your posture and workspace comfort.",
            price: 79.99,
            image: "/placeholder-product.jpg",
            category: "Accessories",
            features: [
                "Adjustable Height",
                "Aluminum Build",
                "Heat Dissipation",
                "Portable Design",
            ],
        },
    ];

    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
        return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
}
