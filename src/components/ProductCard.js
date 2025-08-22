"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function ProductCard({ product }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Product Image</span>
            </div>

            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                        {product.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                        {product.category}
                    </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-6 pt-0">
                <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                </span>
                <Button asChild size="sm">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
