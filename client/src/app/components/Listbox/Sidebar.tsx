'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import { Listbox, ListboxItem } from "@nextui-org/react";

import items from './items';
import { ListboxWrapper } from '@/components/Listbox/ListboxWrapper';

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <ListboxWrapper>
            <Listbox
                items={items}
                className='text-lg'
                aria-label="Dynamic Actions"
            >
                {
                    items.map(item => {
                        return (
                            <ListboxItem
                                {...item}
                                color='default'
                                className={item.key === pathname ? "text-blue-900 outline-none bg-opacity-80 bg-blue-50" : ""}
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