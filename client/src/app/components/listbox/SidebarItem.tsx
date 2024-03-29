"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
    title: string
    url: string
}

export const SidebarItem = ({ title, url }: Props) => {
    const pathname = usePathname()

    return (
        <Link href={url} role="button" tabIndex={0} className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80  focus:bg-opacity-80   hover:text-blue-900 focus:text-blue-900 ${pathname === url && 'text-blue-900 outline-none bg-opacity-80 bg-blue-50'}`}>
            <div className="grid place-items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                    <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clip-rule="evenodd"></path>
                </svg>
            </div>
            {title}
        </Link>
    )
}
