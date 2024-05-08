import Sidebar from "@/components/Listbox/Sidebar";
import { getBrands } from "@/services/server/brandServices";
import { redirect } from "next/navigation";
import React from 'react'

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const hasBrand = (await getBrands()).length === 0
    if (hasBrand) {
        redirect('/signup')
    }
    return (
        <div className="flex flex-col sm:flex-row border m-8 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] 2xl:ml-auto 2xl:mr-auto">
            <Sidebar />
            <div className="rounded-xl sm:m-4 border p-4 w-full bg-white flex flex-col">
                {children}
            </div>
        </div>
    );
}