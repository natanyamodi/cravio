import { Brain, MapPin, Zap, Star } from 'lucide-react';

export default function FeatureSection() {
    const features = [
        {
            icon: <MapPin className="w-8 h-8 text-purple-400" />,
            title: "Location-Aware Discovery",
            description: "Automatically finds nearby restaurants based on your current location"
          },
          {
            icon: <Zap className="w-8 h-8 text-purple-400" />,
            title: "Natural Input",
            description: "Just type what you're craving - our AI understands natural language"
          },
          {
            icon: <Brain className="w-8 h-8 text-purple-400" />,
            title: "AI-Powered Search",
            description: "AI analyzes real-time data to find perfect matches"
          },
          {
            icon: <Star className="w-8 h-8 text-purple-400" />,
            title: "Smart Recommendations",
            description: "Get the top 3 places with explanations of why they are perfect for you"
          }
    ]

    return (
        <section className="flex flex-col gap-4 py-10 text-center items-center z-10 mb-10">
            <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                How our AI Works
            </h2>
            <p className="text-gray-700 text-2xl max-w-xl mx-auto ">
                Powered by advanced AI technology to revolutionize how you discover restaurants
            </p>

            <div className="px-20 mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-auto">
            {features.map((feature, index) => (
                <div key={index} className="text-center group px-10">
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