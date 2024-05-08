"use client"

import { Divider } from '@nextui-org/react';
import Link from 'next/link';
import { UserContext } from "providers/providers";

import { useContext } from 'react';

export const Account = () => {
    const { user } = useContext(UserContext)
    return (
        <div className="" style={{ maxWidth: 800 }}>
            <h2 className="mb-10 text-4xl font-bold sm:text-5xl lg:text-6xl">Account</h2>
            <h2 className="text-2xl font-bold">Profile</h2>
            <Divider className="my-5" />
            <div className="divide-y divide-gray-200 sm:grid sm:gap-4 sm:pt-5">
                <div className="pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <p className="font-medium">Email</p>
                    <p className="mt-1 sm:col-span-2 sm:mt-0">
                        {user.email}
                        <span className="text-sm">
                            (<Link href="/update-email" className="text-blue-400 hover:text-blue-500">update email</Link>)
                        </span>
                    </p>

                    <p className="font-medium sm:mt-0 mt-3">User ID</p>
                    <p className="mt-1 sm:col-span-2 sm:mt-0">{user.id}</p>

                    <p className="font-medium sm:mt-0 mt-3">Name</p>
                    <p className="mt-1 sm:col-span-2 sm:mt-0">{user.username}</p>
                </div>
            </div>
        </div>
    );
}
