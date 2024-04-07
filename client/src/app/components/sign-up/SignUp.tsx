"use client"
import React from 'react';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';
import * as userServices from '@/services/userServices'

const SignUp = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            const body = {
                username: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password
            }
            const resp = userServices.signUp(body)
            console.log(resp)
        },
    });
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen'>
            <div className='flex flex-col gap-4 items-center mt-10'>
                <h2 className='text-xl font-bold'>KangarooWriter</h2>
                <h3 className='text-xl font-normal'>Create Your Account</h3>
                <div className='w-[80%]'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-row justify-evenly gap-4'>
                                <div className="flex-grow">
                                    <Input
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
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <Input
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>
                            <button className='bg-blue-600 rounded-md border text-white cursor-pointer p-2' type="submit">Continue</button>
                        </div>
                    </form>
                </div>


            </div>

            <div className='bg-slate-400 hidden sm:block'>

            </div>
        </div>
    );
};

export default SignUp