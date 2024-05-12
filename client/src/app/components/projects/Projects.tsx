"use client"
import React from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

import { CustomCard } from '../custom-card/CustomCard'

export const Projects = ({ brand }: any) => {
    return (
        <div>
            <Breadcrumbs className='p-4'>
                <BreadcrumbItem href='/dashboard/brands'>Brand</BreadcrumbItem>
                <BreadcrumbItem>{brand.name}</BreadcrumbItem>
            </Breadcrumbs>

            <CustomCard href={`/dashboard/generate/`} isAdd={true}>
                <FiPlusSquare className='text-focus text-4xl' />
                <h3 className='text-focus text-lg font-semibold'>Create Email</h3>
                <p className='text-focus'>Click here to create a new email for your brand</p>
            </CustomCard>
        </div>
    )
}
