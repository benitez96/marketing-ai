'use client'

import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { Listbox, ListboxItem, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { UserContext } from "providers/providers";
import items from './items';

const Sidebar = () => {
    const { logoutUser } = useContext(UserContext)
    const pathname = usePathname()

    return (
        <div className="w-full h-full sm:max-w-[260px] px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Navbar disableAnimation isBordered className='sm:hidden rounded-smal bg-slate-50'>
                <NavbarContent className="sm:hidden">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu className='ml-auto mr-auto w-[80%] mt-8 bg-slate-50 rounded-smal text-white'>
                    {[
                        {
                            label: "Generate",
                            path: "/dashboard/generate"
                        },
                        {
                            label: "Dashboard",
                            path: "/dashboard"
                        },
                        {
                            label: "Projects",
                            path: "/dashboard/projects"
                        },
                    ].map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="text-black hover:text-blue-500 hover:underline"
                                href={item.path}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    <Button
                        color="primary"
                        variant="solid"
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={logoutUser}
                    >
                        Log out
                    </Button>
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
                            if (item.key === 'logout-key') {
                                return (
                                    <ListboxItem
                                        {...item}
                                        key={item.key}
                                        color='default'
                                        className={`${item.key === pathname ? "text-blue-900 outline-none bg-opacity-80 bg-blue-50" : ""} text-2xl bg-transparent`}
                                        classNames={{
                                            base: 'justify-start',
                                            title: 'flex-none'
                                        }}
                                        onClick={logoutUser}
                                        as={Button}
                                    >
                                        {item.label}
                                    </ListboxItem>
                                )
                            }
                            else {
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
                            }

                        })
                    }
                </Listbox>
            </div>
        </div>
    );
}

export default Sidebar