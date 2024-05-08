'use client'
import React, { useContext, useEffect, useState } from 'react'
import SignUp from './SignUp'
import { StepperControl } from './StepperControl'
import { Stepper } from './Stepper'
import { Account } from './steps/Account'
import { Final } from './steps/Final'
import { Brand } from './steps/Brand'
import { UserContext } from 'providers/providers'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@nextui-org/react'

export const Onboarding = () => {
    const { user, isLoading } = useContext(UserContext)
    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()

    useEffect(() => {
        if (user.username.length === 0) {
            setCurrentStep(1)
        }
        else if (user.username.length > 0 && user.brands.length === 0) {
            setCurrentStep(2)
        }
        else {
            router.push('/dashboard')
        }
    }, [user])

    const steps = [
        "Create Account",
        "Brand Details",
        "Complete"
    ]

    const displayStep = (step: any) => {

        switch (step) {
            case 1:
                return <Account setStep={setCurrentStep} />
            case 2:
                return <Brand setStep={setCurrentStep} />
            case 3:
                return <Final />
            default:
                return <Account />
        }

    }

    const handleClick = (direction: any) => {
        let newStep = currentStep
        if (direction === 'next') {
            newStep++
        }
        else {
            newStep--
        }

        if (newStep > 0 && newStep <= steps.length) {
            setCurrentStep(newStep)
        }
    }

    return (
        <div className='md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-background flex flex-col justify-between'>
            <Skeleton isLoaded={!isLoading} className={`${isLoading && 'm-10'}`}>
                <div className='container horizontal mt-5'>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
            </Skeleton>

            <Skeleton isLoaded={!isLoading} className={`${isLoading && 'm-10'}`}>
                <div className='flex flex-col mt-10'>
                    <h2 className='text-center text-xl font-bold'>KangarooWriter</h2>
                    {displayStep(currentStep)}
                </div>
            </Skeleton>

            <Skeleton isLoaded={!isLoading} className={`${isLoading && 'm-10'}`}>
                <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
            </Skeleton>
        </div>
    )
}


