"use client"
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';

import * as userServices from '@/services/userServices'
import { UserContext } from 'providers/providers';
import User from '@/entities/user';

const SignUp = ({ setStep }: any) => {
    const { user, handleUser } = useContext(UserContext)
    const disabled = user.firstName.length > 0

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.firstName ? 'invalid' : ''
        },
        onSubmit: async (values) => {
            const body = {
                username: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password,
                firstname: values.firstName,
                lastname: values.lastName
            }
            const data = await userServices.signUp(body)
            handleUser(new User(data.id, data.username, data.firstName, data.lastName, data.email, data.brands))
            if (data.success) {
                setStep(2)
            }
        },
    });
    return (
        <>
            <div className='flex flex-col gap-4 items-center mt-4 transition duration-500 ease-in-out'>
                <h3 className='text-xl font-normal'>Create Your Account</h3>
                <div className='w-[80%]'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-row justify-evenly gap-4'>
                                <div className="flex-grow">
                                    <Input
                                        disabled={disabled}
                                        id="firstName"
                                        label="First name"
                                        name="firstName"
                                        placeholder="Enter your email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <Input
                                        disabled={disabled}
                                        id="lastName"
                                        placeholder="Enter your email"
                                        label="Last name"
                                        name="lastName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Input
                                    disabled={disabled}
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <Input
                                    disabled={disabled}
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>
                            <Button isDisabled={disabled} onClick={formik.submitForm} color='danger' className='rounded-md border text-white cursor-pointer p-2' type="submit">Continue</Button>
                        </div>
                    </form>
                </div>


            </div>
        </>

    );
};

export default SignUp