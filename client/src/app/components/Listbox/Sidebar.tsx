'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


import items from './items';
import { ListboxWrapper } from '@/components/Listbox/ListboxWrapper';

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <ListboxWrapper>
            <Button
                href="/dashboard/generate"
                as={Link}
                color="primary"
                variant="solid"
                className='bg-rose-600 p-2 flex w-[80%]'
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

                                color='default'
                                className={`${item.key === pathname ? "text-blue-900 outline-none bg-opacity-80 bg-blue-50" : ""} text-2xl`}
                            >
                                {item.label}
                            </ListboxItem>
                        )
                    })


                }
            </Listbox>
        </ListboxWrapper>
    );
}

export default Sidebar