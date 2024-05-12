import { Card, Link } from '@nextui-org/react'
import React from 'react'

export const CustomCard = ({ children, href, isAdd }: any) => {
    return (
        <div className={`${href && 'cursor-pointer'} flex flex-col rounded-md w-64`}>
            <Card className={`${isAdd && 'border-focus border'} text-center p-4 bg-slate-50 flex flex-col items-center h-40 justify-center hover:bg-white`} fullWidth as={href && Link} href={href}>
                {children}
            </Card>
        </div >
    )
}
