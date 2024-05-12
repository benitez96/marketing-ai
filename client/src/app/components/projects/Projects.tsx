import React from 'react'
import { AiOutlineMail } from "react-icons/ai";

import { CustomCard } from '../custom-card/CustomCard'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FiPlusSquare } from "react-icons/fi";

export const Projects = () => {
    return (
        <div>
            <div className='flex items-center'>
                <h1>Projects under</h1>
                <MdOutlineKeyboardArrowRight />
            </div>

            <CustomCard href={`/dashboard/generate/`} isAdd={true}>
                <FiPlusSquare className='text-focus text-4xl' />
                <h3 className='text-focus text-lg font-semibold'>Create Email</h3>
                <p className='text-focus'>Click here to create a new email for your brand</p>
            </CustomCard>
        </div>
    )
}
