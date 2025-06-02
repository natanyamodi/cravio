'use client'

import BgGradient from "@/components/common/bg-gradient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect, KeyboardEvent } from "react"
import { Search, X } from "lucide-react"
import { toast } from "sonner"

export default function DiscoverPage() {
    const [inputValue, setInputValue] = useState("")
    const [keywords, setKeywords] = useState<string[]>([])
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    
    const predefinedKeywords = [
        "Pet Friendly",
        "Japanese",
        "Rooftop View",
        "Beach View",
        "Cheap Eats",
    ];

    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setIsLocationEnabled(true);
                },
                () => {
                    setIsLocationEnabled(false);
                    toast.error('Location access denied', {
                        description: 'Please enable location access to find restaurants near you.',
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            toast.error('Geolocation not supported', {
                description: 'Your browser does not support geolocation.',
            });
        }
    };

    useEffect(() => {
        // Check if location permission is already granted
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    requestLocation();
                } else if (result.state === 'prompt') {
                    requestLocation();
                } else if (result.state === 'denied') {
                    setIsLocationEnabled(false);
                    toast.error('Location access denied', {
                        description: 'Please enable location access in your browser settings.',
                    });
                }
            });
        } else {
            // Fallback for browsers that don't support permissions API
            requestLocation();
        }
    }, []);

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault()
            if (!keywords.includes(inputValue.trim())) {
                setKeywords([...keywords, inputValue.trim()])
            }
            setInputValue("")
        }
    }

    const handleKeywordClick = (keyword: string) => {
        if (!keywords.includes(keyword)) {
            setKeywords([...keywords, keyword])
        }
    }

    const removeKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove))
    }

    const handleNomzySearch = () => {
        if (!isLocationEnabled) {
          toast.error('Location required', {
            description: 'Please enable location access to search for restaurants.',
          });
          return;
        }
    
        if (keywords.length === 0) {
          toast.error('Missing information', {
            description: 'Please add some keywords.',
          });
          return;
        }

        console.log("words", keywords)
    
        toast('Searching for perfect spots...', {
          description: 'Our AI is analyzing your preferences and finding the best matches.',
        });
    
        // Simulate search process with multiple toasts
        setTimeout(() => {
          toast('Gathering restaurant data...', {
            description: 'Fetching real-time information from multiple sources.',
          });
        }, 1500);
    
        setTimeout(() => {
          toast('AI analysis in progress...', {
            description: 'Ranking restaurants based on your preferences.',
          });
        }, 3000);
    
        setTimeout(() => {
          toast('Almost ready!', {
            description: 'Preparing your personalized recommendations.',
          });
        }, 4500);
      };
    
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-6 text-center mt-[5rem]">
                <BgGradient />
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-bold text-5xl lg:text-6xl sm:text-4xl text-gray-800">
                        What are you in the
                        <span className="bg-gradient-to-r from-pink-500 to-[#ef512c] bg-clip-text text-transparent"> mood </span>
                        for?
                    </h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4
                    lg:px-0 lg:max-w-4xl text-gray-800 mt-2">
                        We will do the digging. You do the dining.
                    </h2>
                </div>

                <div className="flex flex-row justify-between z-1 items-center gap-5 p-4 mt-8 rounded-lg bg-white border border-[1px] border-orange-300/70 shadow-xl">
                    <Input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your craving and press Enter..."
                        className="w-5xl sm:w-md lg:w-6xl border-none text-base
                        sm:text-lg lg:text-xl py-5 sm:py-6 lg:py-7 placeholder-gray-300"/>

                    <Button variant={'link'} 
                    onClick={() => {
                        if (!isLocationEnabled) {
                            requestLocation();
                            return;
                        }
                        handleNomzySearch();
                    }}
                    className="text-white text-base
                    sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 
                    py-5 sm:py-
6 lg:py-7 bg-linear-to-br from-[#ef512c] to-pink-500 hover:from-pink-500 hover:to-[#ef512c] hover:no-underline font-bold shadow-lg hover:scale-105 transition-all duration-300">
                        <Link href="" className="flex gap-2 items-center">
                            <Search/>
                            <span>Nomzy</span>
                        </Link>
                    </Button>
                </div>

                {/* Selected Keywords Chips */}
                {keywords.length > 0 && (
                    <div className="flex flex-wrap items-center p-4 gap-2 w-5xl sm:w-md lg:w-6xl rounded-lg border-[5px] border-dashed border-purple-300/30">
                        {keywords.map((keyword, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600
                                sm:px-4 sm:py-1.5 sm:text-base
                                md:px-5 md:py-2 md:text-base
                                lg:px-6 lg:py-2 lg:text-lg cursor-pointer"
                            >
                                <span>{keyword}</span>
                                <X
                                onClick={() => removeKeyword(keyword)}
                                className="w-4 h-4 text-orange-600 transition-transform duration-200 transform group-hover:scale-125"
                                />

                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col mt-6 gap-6">
                    <p className="text-gray-700">Or Choose From</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {predefinedKeywords.map((keyword, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(keyword)}
                                className="px-3 py-1 text-sm font-medium rounded-full cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-600
                                sm:px-4 sm:py-1.5 sm:text-base
                                md:px-5 md:py-2 md:text-base
                                lg:px-6 lg:py-2 lg:text-lg"
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>


            </section>
        </>
    )
}