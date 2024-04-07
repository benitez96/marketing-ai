"use client"
import { Card, Skeleton } from '@nextui-org/react';
import { ThemeContext } from 'providers/providers'
import React, { useContext } from 'react'
import { AiOutlineHome } from "react-icons/ai";


export const User = () => {
    const { user, isLoading } = useContext(ThemeContext)

    return (
        <div className='w-80'>
            <Skeleton className="rounded-sm" isLoaded={!isLoading}>
                <div className='flex flex-col gap-4 w-80 p-6 bg-slate-50 rounded-md'>
                    <AiOutlineHome className='text-2xl' />
                    <h2 className='text-2xl'>Welcome, {user.username} !</h2>
                    <p>Get familiar with the dashboard, here are some ways to get started</p>
                </div>
            </Skeleton>
        </div>
    );
}
