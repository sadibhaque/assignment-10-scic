import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

async function getProducts() {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        return [];
    }
    return res.json();
}

export const metadata = {
    title: "Products - MyStore",
    description: "Browse our amazing collection of products",
};

export default async function Products() {
    const products = await getProducts();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Our Products
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our carefully curated collection of
                            high-quality products
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                No products available at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
