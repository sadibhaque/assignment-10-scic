// Mock products data
let products = [
    {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        description:
            "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        image: "/placeholder-product.jpg",
        category: "Electronics",
    },
    {
        id: "2",
        name: "Smart Fitness Watch",
        description:
            "Advanced fitness tracker with heart rate monitoring and GPS functionality.",
        price: 299.99,
        image: "/placeholder-product.jpg",
        category: "Wearables",
    },
    {
        id: "3",
        name: "Organic Coffee Beans",
        description:
            "Premium organic coffee beans sourced from sustainable farms.",
        price: 24.99,
        image: "/placeholder-product.jpg",
        category: "Food & Beverage",
    },
    {
        id: "4",
        name: "Laptop Stand",
        description:
            "Ergonomic aluminum laptop stand with adjustable height and angle.",
        price: 79.99,
        image: "/placeholder-product.jpg",
        category: "Accessories",
    },
];

export async function GET() {
    return Response.json(products);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newProduct = {
            id: (products.length + 1).toString(),
            ...body,
            image: "/placeholder-product.jpg",
        };

        products.push(newProduct);
        return Response.json(newProduct, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }
}
