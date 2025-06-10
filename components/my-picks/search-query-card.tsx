'use client';

import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SearchQueryCardProps {
  queryId: string;
  keywords: string[];
  timestamp: number;
  location?: string;
}

export default function SearchQueryCard({ queryId, keywords, timestamp, location }: SearchQueryCardProps) {
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });
  const deleteQuery = useMutation(api.search.deleteSearchQuery);
  const keywordsRef = useRef<HTMLDivElement>(null);
  const [shouldShowEllipsis, setShouldShowEllipsis] = useState(false);
  
  useEffect(() => {
    const checkOverflow = () => {
      if (keywordsRef.current) {
        const container = keywordsRef.current;
        const hasOverflow = container.scrollWidth > container.clientWidth;
        setShouldShowEllipsis(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [keywords]);
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    e.stopPropagation(); // Stop event propagation
    try {
      await deleteQuery({ queryId });
    } catch (error) {
      console.error('Failed to delete query:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 sm:p-5 md:p-6 relative group">
      <div className="flex flex-col gap-2">
        {/* Keywords and Delete button container */}
        <div className="flex justify-between items-start gap-4">
          {/* Keywords - wrapped in Link */}
          <Link href={`/search/${queryId}`} className="flex-1 min-w-0">
            <div 
              ref={keywordsRef}
              className="flex items-center gap-1.5 overflow-hidden"
            >
              <div className="flex items-center gap-1.5 overflow-hidden">
                {keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs sm:text-sm bg-orange-50 group-hover:bg-orange-100 hover:text-purple-600 text-purple-500 rounded-full whitespace-nowrap flex-shrink-0"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              {shouldShowEllipsis && (
                <span className="text-gray-400 text-xs flex-shrink-0 ml-1">...</span>
              )}
            </div>
          </Link>

          {/* Delete button - outside of Link */}
          <div className="flex-shrink-0 ml-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-gray-100 text-purple-600 hover:text-purple-700 hover:bg-purple-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-white border border-none'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Search Query</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this search query? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='hover:bg-linear-to-br from-[#ef512c] to-pink-500 hover:text-white border-none '>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-linear-to-br from-[#ef512c] to-pink-500 hover:scale-105 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        {/* Location if available - wrapped in Link */}
        <Link href={`/search/${queryId}`}>
          {location && (
            <p className="text-sm sm:text-base text-gray-600">
              📍 {location}
            </p>
          )}
          
          {/* Timestamp */}
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {timeAgo}
          </p>
        </Link>
      </div>
    </div>
  );
} 