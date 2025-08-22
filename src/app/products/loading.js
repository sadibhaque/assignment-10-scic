import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductsLoading() {
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

                    <div className="flex flex-col items-center justify-center py-16">
                        <LoadingSpinner className="h-12 w-12 mb-4" />
                        <p className="text-muted-foreground">
                            Loading products...
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
