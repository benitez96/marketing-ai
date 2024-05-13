import { Card } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

interface Props {
    href: string
    children: React.ReactNode
    isAdd: boolean
}

export const CardLink = ({ children, href, isAdd }: Props) => {
    return (
        <div className={`cursor-pointer flex flex-col rounded-md w-64`}>
            <Link href={href}>
                <Card className={`${isAdd && 'border-focus border'} text-center p-4 bg-slate-50 flex flex-col items-center h-40 justify-center hover:bg-white`} fullWidth >
                    {children}
                </Card>
            </Link>
        </div >
    )

}