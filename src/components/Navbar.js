"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-foreground"
                        >
                            MyStore
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/products"
                            className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Products
                        </Link>

                        {session ? (
                            <>
                                <Link
                                    href="/dashboard/add-product"
                                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Add Product
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {session.user?.name ||
                                                session.user?.email}
                                        </Badge>
                                    </div>
                                    <Button
                                        onClick={() => signOut()}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href="/register">Sign Up</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
