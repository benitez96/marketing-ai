import { Card } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const CustomCard = ({ children, href, isAdd }: any) => {
    if (href !== undefined) {
        return (
            <div className={`${href && 'cursor-pointer'} flex flex-col rounded-md w-64`}>
                <Link href={href}>
                    <Card className={`${isAdd && 'border-focus border'} text-center p-4 bg-slate-50 flex flex-col items-center h-40 justify-center hover:bg-white`} fullWidth >
                        {children}
                    </Card>
                </Link>
            </div >
        )
    }
    return (
        <div className={`${href && 'cursor-pointer'} flex flex-col rounded-md w-64`}>
            <Card className={`${isAdd && 'border-focus border'} text-center p-4 bg-slate-50 flex flex-col items-center h-40 justify-center hover:bg-white`} fullWidth>
                {children}
            </Card>
        </div >
    )
}
