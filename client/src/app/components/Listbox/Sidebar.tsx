'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import { Listbox, ListboxItem, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


import items from './items';

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className="w-full h-full sm:max-w-[260px] px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Navbar disableAnimation isBordered className='sm:hidden rounded-smal bg-slate-50'>
                <NavbarContent className="sm:hidden">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu className='ml-auto mr-auto w-[80%] mt-8 bg-slate-50 rounded-smal'>
                    {[
                        {
                            label: "Dashboard",
                            path: "/dashboard"
                        },
                        {
                            label: "Projects",
                            path: "/dashboard/projects"
                        }
                    ].map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className=""
                                href={item.path}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>


            <div className='hidden sm:block'>
                <Button
                    href="/dashboard/generate"
                    as={Link}
                    color="primary"
                    variant="solid"
                    className='bg-rose-600 p-2 flex w-[80%] text-white'
                    endContent={<MdOutlineKeyboardArrowRight />}
                >
                    Generate
                </Button>
                <Listbox
                    items={items}
                    className='text-2xl'
                    aria-label="Dynamic Actions"
                >
                    {
                        items.map(item => {
                            return (
                                <ListboxItem
                                    {...item}
                                    key={item.key}
                                    color='default'
                                    className={`${item.key === pathname ? "text-blue-900 outline-none bg-opacity-80 bg-blue-50" : ""} text-2xl`}
                                >
                                    {item.label}
                                </ListboxItem>
                            )
                        })
                    }
                </Listbox>
            </div>
        </div>
    );
}

export default Sidebar