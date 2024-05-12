import { cache } from 'react'




import Sidebar from "@/components/listbox/Sidebar";
import SelectBrand from "@/components/brands/Brands";
import { getBrands, getBrandsCache } from "@/services/server/brandServices";
import { redirect } from "next/navigation";
import React from 'react'
import { Providers } from 'providers';

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const brands = await getBrandsCache()

    if (brands.length === 0) {
        redirect('/signup')
    }
    return (
        <Providers>
            <div>
                <div className="flex flex-col sm:flex-row border m-8 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] 2xl:ml-auto 2xl:mr-auto">
                    <Sidebar />
                    <div className='flex-1 flex flex-col p-4 gap-4'>
                        <SelectBrand brands={brands} />
                        <div className="rounded-xl border p-4 w-full bg-white flex flex-col h-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
}