import { Button } from '@nextui-org/react'
import React from 'react'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


export const StepperControl = ({ handleClick, currentStep, steps }: any) => {
    return (
        <div>
            <div className='container flex justify-around mt-4 mb-8'>
                <Button isIconOnly={true}
                    onClick={() => handleClick()}
                    isDisabled={currentStep === 1}
                    className={'bg-transparent text-3xl cursor-pointer transition duration-200 ease-in-out'}>
                    <FaCircleArrowLeft />
                </Button>

                <Button isIconOnly={true}
                    onClick={() => handleClick('next')}
                    className={`bg-transparent text-3xl cursor-pointer transition duration-200 ease-in-out 
                    ${currentStep === steps.length && 'text-green-500 text-4xl'}
                    `}
                >
                    {
                        currentStep === steps.length ? <IoCheckmarkDoneCircleSharp /> : <FaCircleArrowRight />
                    }
                </Button>
            </div>
        </div>
    )
}
