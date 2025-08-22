import productsService from "../../../../lib/productsService";

// Get product by ID
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const product = productsService.getProduct(id);

        if (!product) {
            return Response.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Add features for better display (can be customized per product type)
        const productWithFeatures = {
            ...product,
            features: getProductFeatures(product),
        };

        return Response.json(productWithFeatures);
    } catch (error) {
        console.error("Error fetching product:", error);
        return Response.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// Helper function to generate features based on product category
function getProductFeatures(product) {
    const baseFeatures = ["High Quality", "Fast Delivery", "Warranty Included"];

    switch (product.category) {
        case "Electronics":
            return [...baseFeatures, "Latest Technology", "Energy Efficient"];
        case "Wearables":
            return [...baseFeatures, "Water Resistant", "Long Battery Life"];
        case "Food & Beverage":
            return [...baseFeatures, "Organic", "Fresh"];
        case "Accessories":
            return [...baseFeatures, "Durable", "Stylish Design"];
        case "Home & Garden":
            return [...baseFeatures, "Easy Assembly", "Weather Resistant"];
        case "Sports & Outdoors":
            return [...baseFeatures, "Professional Grade", "Safety Tested"];
        case "Books":
            return [...baseFeatures, "Educational", "Well Reviewed"];
        case "Clothing":
            return [...baseFeatures, "Comfortable Fit", "Premium Materials"];
        default:
            return baseFeatures;
    }
}
