import productsService from "../../../lib/productsService";

export async function GET() {
    try {
        const products = productsService.getProducts();
        return Response.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.description || !body.price) {
            return Response.json(
                { error: "Name, description, and price are required" },
                { status: 400 }
            );
        }

        const newProduct = productsService.addProduct(body);

        if (!newProduct) {
            return Response.json(
                { error: "Failed to add product" },
                { status: 500 }
            );
        }

        return Response.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error adding product:", error);
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }
}

// Export products for use in other API routes
export const products = productsService.getProducts();
