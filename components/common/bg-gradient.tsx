import { cn } from "@/lib/utils";

export default function BgGradient({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl",
        className,
        "overflow-hidden"
      )}
    >
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-20 blur-lg"></div>
      
      {/* Large gradient blobs like in reference */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-300/40 via-pink-300/30 to-purple-300/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-300/40 via-pink-300/30 to-orange-300/20 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
      
    </div>
  );
}
