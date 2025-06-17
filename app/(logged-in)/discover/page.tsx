'use client'

import BgGradient from "@/components/common/bg-gradient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, KeyboardEvent, useRef } from "react"
import { Search, X, Loader2, Plus } from "lucide-react"
import { toast } from "sonner"
import SearchResults from "@/components/discover/search-results"

export default function DiscoverPage() {
    const [inputValue, setInputValue] = useState("")
    const [keywords, setKeywords] = useState<string[]>([])
    const [locationInput, setLocationInput] = useState("")
    const [isSearching, setIsSearching] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const loadingToastRef = useRef<string | number | null>(null);
    
    const predefinedKeywords = [
        "Pet Friendly",
        "Japanese",
        "Rooftop View",
        "Beach View",
        "Cheap Eats",
    ];

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

    const handleAddKeyword = () => {
        if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
            setKeywords([...keywords, inputValue.trim()])
            setInputValue("")
        }
    }

    const handleNomzySearch = () => {
        if (!locationInput.trim()) {
            toast.error('Location required', {
                description: 'Please enter a location to search for restaurants.',
            });
            return;
        }
    
        if (keywords.length === 0) {
            toast.error('Missing information', {
                description: 'Please add some keywords.',
            });
            return;
        }

        setIsSearching(true);
            // Show loading toast while collecting and processing
        const loadingToast = toast.loading("Scouting secret foodie spots just for you... 🔎🍜");
        
        // Store toast ID in ref
        loadingToastRef.current = loadingToast;
    };

    const handleSearchStage = (stage: 'searching' | 'generating' | 'success' | 'error') => {
        switch (stage) {
            case 'searching':
                setIsSearching(false);
                setIsGenerating(true);
                break;
            case 'generating':
                // Keep the loading toast
                break;
            case 'success':
                // Dismiss loading toast and show success
                if (loadingToastRef.current) {
                    toast.dismiss(loadingToastRef.current);
                }
                toast.success("Handpicked spots just for your cravings 💌🍲");
                setIsGenerating(false);
                break;
            case 'error':
                // Dismiss loading toast and show error
                if (loadingToastRef.current) {
                    toast.dismiss(loadingToastRef.current);
                }
                toast.error("The web was hangry. Try again in a bit 😤🛑");
                setIsSearching(false);
                setIsGenerating(false);
                break;
        }
    };

    const handleSearchComplete = () => {
        setIsSearching(false);
        setIsGenerating(false);
        // Redirection is now handled in SearchResults component
    };
    
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-6 text-center mt-[5rem]">
                <BgGradient />
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-bold text-5xl lg:text-6xl sm:text-5xl text-gray-800">
                        What are you in the
                        <span className="bg-gradient-to-r from-pink-500 to-[#ef512c] bg-clip-text text-transparent"> mood </span>
                        for?
                    </h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4
                    lg:px-0 lg:max-w-4xl text-gray-800 mt-2">
                        We will do the digging. You do the dining.
                    </h2>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 mt-8 rounded-lg bg-white border border-[1px] border-orange-300/70 shadow-xl w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-4xl">
                    <div className="flex items-center w-full gap-2 sm:gap-3 md:gap-4">
                        <Input 
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a craving and hit enter or plus to add"
                            className="w-full border-none text-sm sm:text-sm md:text-lg lg:text-xl 
                            py-3 sm:py-4 md:py-5 lg:py-6 
                            px-2 sm:px-3 md:px-4 lg:px-5
                            placeholder-gray-300"/>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleAddKeyword}
                            className="rounded-full w-11 h-11 hover:bg-orange-100 bg-orange-50 transition-colors p-2"
                            disabled={!inputValue.trim()}
                        >
                            <Plus className="w-16 h-16 text-orange-500 font-bold" />
                        </Button>
                    </div>

                    <div className="flex items-center w-full gap-2 sm:gap-3 md:gap-4 justify-between">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full p-[1px]">
                                <div className="h-full w-full rounded-full bg-white"></div>
                            </div>
                            <Input
                                type="text"
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                placeholder="enter your city"
                                className="relative ml-1 w-[150px] sm:w-[150px] lg:w-[170px] xs:w-[110px] border border-dashed border-pink-300 text-sm sm:text-sm md:text-lg lg:text-xl 
                                py-3 sm:py-4 md:py-5 lg:py-6 
                                px-2 sm:px-3 md:px-4 lg:px-5
                                placeholder-gray-300 bg-transparent rounded-full
                                focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <Button 
                            variant={'link'} 
                            onClick={handleNomzySearch}
                            disabled={isSearching || isGenerating}
                            className={`text-white text-sm sm:text-base md:text-lg lg:text-xl 
                            rounded-full 
                            px-4 sm:px-6 md:px-8 lg:px-10 
                            py-3 sm:py-4 md:py-5 lg:py-6 
                            bg-gradient-to-r from-[#ef512c] to-pink-500 
                            hover:from-pink-500 hover:to-[#ef512c] 
                            hover:no-underline font-bold shadow-lg 
                            hover:scale-105 transition-all duration-300
                            whitespace-nowrap
                            ${(isSearching || isGenerating) ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            <div className="flex gap-1 sm:gap-2 items-center">
                                {(isSearching || isGenerating) ? (
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                )}
                                <span>Nomzy</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Selected Keywords Chips */}
                {keywords.length > 0 && (
                    <div className="flex flex-wrap items-center p-2 sm:p-3 md:p-4 gap-2 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-4xl rounded-lg border-[5px] border-dashed border-purple-300/30">
                        {keywords.map((keyword, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-1 px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600
                                sm:px-3 sm:py-1.5
                                md:px-4 md:py-2
                                lg:px-5 lg:py-2 cursor-pointer"
                            >
                                <span>{keyword}</span>
                                <X
                                onClick={() => removeKeyword(keyword)}
                                className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 transition-transform duration-200 transform group-hover:scale-125"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col mt-4 sm:mt-5 md:mt-6 gap-3 sm:gap-4 md:gap-5 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-4xl">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center">Or Choose From</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {predefinedKeywords.map((keyword, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(keyword)}
                                className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium rounded-full cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-600
                                sm:px-3 sm:py-1.5
                                md:px-4 md:py-2
                                lg:px-5 lg:py-2"
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Results */}
                {(isSearching || isGenerating) && (
                    <SearchResults 
                        keywords={keywords}
                        location={locationInput.trim()}
                        onSearchComplete={handleSearchComplete}
                        onSearchStage={handleSearchStage}
                    />
                )}
            </section>
        </>
    )
}