import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Dashboard - MyStore",
    description: "Manage your products and account",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your products and account settings
                        </p>
                    </div>

                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
