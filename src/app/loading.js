import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";

export default function HomeLoading() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Hero Carousel Section */}
            <HeroCarousel />

            {/* Product Highlights Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Featured Products
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Check out some of our most popular items
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8">
                        <LoadingSpinner className="h-8 w-8 mb-4" />
                        <p className="text-muted-foreground">
                            Loading featured products...
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
