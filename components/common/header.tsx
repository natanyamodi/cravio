'use client'

import { Pizza } from "lucide-react";
import NavLink from "./nav-link";
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export default function Header() {
    const { user: clerkUser } = useUser();
    const user = useQuery(api.users.getUserByClerkId, 
        clerkUser ? { clerkId: clerkUser.id } : "skip"
    );

    return (
        <nav className="container flex items-center justify-between
        py-4 lg:px-8 px-2 mx-auto">
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <Pizza className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12
                    transform transition duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">
                        Cravio
                    </span>
                </NavLink>
            </div>

            <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
                <NavLink href="/#features">About</NavLink>
                <Authenticated>
                    <NavLink href="/myPicks">My Picks</NavLink>
                </Authenticated>
            </div>
 
            <div className="flex lg:justify-end lg:flex-1">
                <div className="flex gap-2 items-center">
                    <Authenticated>
                        <NavLink href="/discover">Discover</NavLink>
                        {user && (
                            <span className="text-sm text-gray-600 hidden sm:inline">
                                Hi, {user.name}
                            </span>
                        )}
                        <UserButton />
                    </Authenticated>
                    
                    <Unauthenticated>
                        <NavLink href="/sign-in">Discover</NavLink>
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </Unauthenticated>

                    <AuthLoading>
                        <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
                    </AuthLoading>
                </div>
            </div>        
        </nav>
    )
}