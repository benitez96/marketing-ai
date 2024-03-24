'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";


import items from './items';
import { ListboxWrapper } from '@/components/listbox/ListboxWrapper';
import { LuLogOut } from 'react-icons/lu';
import { deleteToken } from "@/actions/auth";
const Sidebar = () => {

  const logout = async () => {
    await deleteToken()
  }

  const pathname = usePathname()

  return (
    <ListboxWrapper>
      <Button
        href="/dashboard/generate"
        as={Link}
        color="primary"
        size='lg'
        variant='shadow'
        fullWidth
        radius='sm'
        className='justify-between h-14 text-white'
        endContent={<MdOutlineKeyboardArrowRight />}
      >
        Generate
      </Button>
      <Listbox
        items={items}
        className='text-2xl h-full p-0'
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
      <Listbox>
        <ListboxItem
          key="logout-key"
          color='default'
          className="text-2xl"
          startContent= <LuLogOut />
          description="Leave session"
          onClick={logout}
          href= "/"
        >
          Logout
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default Sidebar
