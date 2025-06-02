import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import BgGradient from "../common/bg-gradient";

export default function HeroSection() {
    return (
        <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28
        transition-all animate-in lg:px-12 max-w-7xl lg:mt-20">
            <BgGradient />
            <h1 className="bg-gradient-to-r from-[#ef512c] to-pink-500 bg-clip-text text-transparent font-bold py-6 text-center">
                Find Restaurants in a Flash
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4
            lg:px-0 lg:max-w-4xl text-gray-800">
                Get a curated list of perfect spots, tailored to your cravings — no endless scrolling required.
            </h2>

            <Button variant={'link'} className="text-white mt-6 text-base
                sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 
                py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-br from-[#ef512c] to-pink-500 hover:from-pink-500 hover:to-[#ef512c] hover:no-underline font-bold shadow-lg hover:scale-105 transition-all duration-300">
                    <Link href="#dashboard" className="flex gap-2 items-center">
                        <span>Try Cravio!</span>
                        <ArrowRight className="animate-pulse" />
                    </Link>
            </Button>
        </section>

    )
}