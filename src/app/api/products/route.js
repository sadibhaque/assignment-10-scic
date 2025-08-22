import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({}).populate('createdBy', 'name email').sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();
        const { name, description, price, category, image, stock, featured } = body;

        // Validate required fields
        if (!name || !description || !price || !category || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create new product
        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            category,
            image,
            stock: parseInt(stock) || 0,
            featured: Boolean(featured),
            createdBy: session.user.id,
        });

        await product.populate('createdBy', 'name email');
        
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
