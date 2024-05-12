"use client"
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

import { UserContext } from "providers/providers";
import { Select, SelectItem } from "@nextui-org/react";


export function SelectBrand({ brands }: any) {
    const router = useRouter()
    const { handleBrand, currentBrand, isLoading } = useContext(UserContext)

    const handleSelectChange = (event: any) => {
        handleBrand(event.target.value)
        router.push(`/dashboard/projects/${event.target.value}`)
    };

    return (
        <div className="flex w-full max-w-xs flex-col gap-2">
            {isLoading ? 'loading' : <Select
                label="Brand"
                variant="bordered"
                placeholder="Select a brand"
                className="max-w-xs"
                defaultSelectedKeys={['']}
                onChange={handleSelectChange}
                selectionMode="single"
            >
                {brands.map((brand: any) => (
                    <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                    </SelectItem>
                ))}

                <SelectItem
                    key=""
                    classNames={{
                        base: 'hidden',
                        title: 'hidden'
                    }}
                >
                    {currentBrand === null ? 'loading' : currentBrand?.name}
                </SelectItem>
            </Select>}
        </div>
    );
}

export default SelectBrand;
