import { Brain, Zap, Star } from 'lucide-react';

export default function FeatureSection() {
    const features = [
          {
            icon: <Zap className="w-8 h-8 text-purple-400" />,
            title: "Natural Input, No Filters",
            description: "Type a craving, hit space, comma, or enter and keywords get created instantly."
          },
          {
            icon: <Brain className="w-8 h-8 text-purple-400" />,
            title: "Real-Time AI Search",
            description: "Scans Google, Zomato, and Swiggy live for matching menus, reviews, and info."
          },
          {
            icon: <Star className="w-8 h-8 text-purple-400" />,
            title: "Smart Recommendations",
            description: "Finds the top 3 spots with honest reasons tailored to mood, taste, and wallet."
          }
    ]

    return (
        <section id="features" className="flex flex-col gap-4 py-10 text-center justify-center items-center z-10 mb-10">
            <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                How our AI Works
            </h2>
            <p className="text-gray-700 text-2xl max-w-xl mx-auto ">
                Powered by advanced AI technology to revolutionize how you discover restaurants
            </p>

            <div className="px-4 sm:px-8 lg:px-20 mt-16 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <div key={index} className="text-center group flex-1 px-4 sm:px-8 lg:px-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-4 group-hover:bg-orange-100 transition-colors">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}