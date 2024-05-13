"use client"
import { Card, CardBody, CardHeader, Link, Skeleton } from '@nextui-org/react';
import { UserContext } from 'providers/providers'
import React, { useContext } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { CustomCard } from '../custom-card/CustomCard';
import { FiPlusSquare } from "react-icons/fi";
import { CardLink } from '../card/card-link/CardLink';


export const User = () => {
    const { user, isLoading } = useContext(UserContext)

    return (
        <div className='flex gap-4'>
            <CardLink href='/dashboard/brands/create' isAdd={true}>
                <FiPlusSquare className='text-focus text-4xl' />
                <h3 className='text-focus text-lg font-semibold'>Add Brand</h3>
                <p className='text-focus'>Click here to add a new brand to your account</p>
            </CardLink>
            <CustomCard>
                <AiOutlineHome className='text-4xl' />
                <h2 className='text-lg font-semibold'>Welcome, {user.username} !</h2>
                <p className='text-slate-500'>Get familiar with the dashboard, here are some ways to get started</p>
            </CustomCard>
        </div>
    );
}
