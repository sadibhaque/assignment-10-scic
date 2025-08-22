"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";

export default function ProductCard({ product }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg pt-0 transition-shadow">
            <Image
                width={300}
                height={300}
                src={product.image}
                alt={product.name}
                className="w-full p-0"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />

            <CardContent className="px-6 py-0">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-md font-semibold text-foreground line-clamp-1">
                        {product.name}
                    </h3>
                </div>
                <Badge variant="secondary" className="text-xs mb-2 px-0">
                    {product.category}
                </Badge>
                <p className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center px-6 pt-0">
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
