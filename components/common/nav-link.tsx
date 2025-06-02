'use client';

import Link from "next/link";
import {cn} from '@/lib/utils'
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: (e: React.MouseEvent) => void
}

export default function NavLink({ href, children, className, onClick }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname.startsWith(href)); 
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'transition-colors text-base duration-200 text-gray-600 hover:text-orange-500',
                className,
                isActive && 'text-orange-500'
            )}
        >
            {children}
        </Link>
    )
}