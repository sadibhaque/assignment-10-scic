"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
    {
        id: 1,
        title: "Welcome to MyStore",
        subtitle: "Discover amazing products with unbeatable quality",
        cta: "Shop Now",
        ctaLink: "/products",
        image: "https://i.ibb.co.com/yF91n663/image.png",
    },
    {
        id: 2,
        title: "Premium Electronics",
        subtitle: "Latest gadgets and tech accessories at great prices",
        cta: "View Electronics",
        ctaLink: "/products",
        image: "https://i.ibb.co.com/DHfp6xFC/image.png",
    },
    {
        id: 3,
        title: "Fashion & Style",
        subtitle: "Trendy clothing and accessories for every occasion",
        cta: "Shop Fashion",
        ctaLink: "/products",
        image: "https://i.ibb.co.com/Y7h4Rpd4/image.png",
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
        );
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    return (
        <div className="relative h-[500px] overflow-hidden">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        index === currentSlide
                            ? "translate-x-0"
                            : index < currentSlide
                            ? "-translate-x-full"
                            : "translate-x-full"
                    }`}
                >
                    {/* Background Image */}
                    <div className="relative h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-4xl mx-auto relative z-10">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                <div className="space-x-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="secondary"
                                    >
                                        <Link href={slide.ctaLink}>
                                            {slide.cta}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                aria-label="Previous slide"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                aria-label="Next slide"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
