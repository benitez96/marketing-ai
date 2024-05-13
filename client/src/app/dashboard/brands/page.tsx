import { CardLink } from "@/components/card/card-link/CardLink";
import { CustomCard } from "@/components/custom-card/CustomCard";
import { getBrandsCache } from "@/services/server/brandServices";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";

const BrandsPage = async () => {
    const brands = await getBrandsCache()
    return (
        <div className="flex gap-4 flex-wrap">
            <CardLink href={`/dashboard/brands/create`} isAdd={true}>
                <FiPlusSquare className='text-focus text-4xl' />
                <h3 className='text-focus text-lg font-semibold'>Add Brand</h3>
                <p className='text-focus'>Click here to add a new brand to your account</p>
            </CardLink>
            {
                brands.map((brand: any) => {
                    return (
                        <CardLink isAdd={false} key={brand.id} href={`/dashboard/brands/${brand.id}`}>
                            <h3 className='text-lg font-semibold'>{brand.name}</h3>
                            <p className='text-slate-500'>Industry/Niche: {brand.niche}</p>
                            <p className='text-slate-500'>Audience: {brand.target_audience}</p>
                        </CardLink>
                    )
                })
            }
        </div>

    )
}


export default BrandsPage