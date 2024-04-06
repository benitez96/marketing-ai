import Sidebar from "@/components/Listbox/Sidebar";
import React from 'react'
import { usePathname } from 'next/navigation';
import { Listbox, ListboxItem, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row border m-8 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] 2xl:ml-auto 2xl:mr-auto">
            <Sidebar />
            {children}
        </div>
    );
}