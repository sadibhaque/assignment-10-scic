import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            MyStore
                        </h3>
                        <p className="text-muted-foreground">
                            Your one-stop shop for quality products with
                            exceptional service.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4 text-foreground">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4 text-foreground">
                            Categories
                        </h4>
                        <ul className="space-y-2">
                            <li className="text-muted-foreground">
                                Electronics
                            </li>
                            <li className="text-muted-foreground">Wearables</li>
                            <li className="text-muted-foreground">
                                Food & Beverage
                            </li>
                            <li className="text-muted-foreground">
                                Accessories
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4 text-foreground">
                            Contact
                        </h4>
                        <ul className="space-y-2">
                            <li className="text-muted-foreground">
                                Email: info@mystore.com
                            </li>
                            <li className="text-muted-foreground">
                                Phone: (555) 123-4567
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center">
                    <p className="text-muted-foreground">
                        © 2025 MyStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
