"use client"
import React, { useContext, useState } from 'react'
import { useFormik, useFormikContext } from 'formik';
import { Button, Input, Textarea } from "@nextui-org/react";
import { CgEnter } from "react-icons/cg";

import { UserContext } from "providers/providers";
import { analyzeUrl } from '@/services/server/scrappingServices';
import styles from './input.module.css'
import { api } from '@/utils/axios';

export const InputUrl = ({ setStep }: any) => {
    const [loading, setLoading] = useState(false)
    const { logoutUser } = useContext(UserContext)


    const formik = useFormik({
        initialValues: {
            name: '',
            target_audience: '',
            current_email_list_size: '',
            niche: '',
            site_url: '',
            description: '',
            mission_statement: '',
            best_selling_products: ''
        },
        onSubmit: async (values) => {
            const body = {
                "name": values.name,
                "target_audience": values.target_audience,
                "current_email_list_size": values.current_email_list_size,
                "niche": values.niche,
                "site_url": values.site_url,
                "description": values.description,
                "mission_statement": values.mission_statement,
                "best_selling_products": values.best_selling_products,
            }
            const response = (await api.post('/brands/', body))
            if (response.status === 200) {
                setStep(3)
            }
        },
    });


    const [isValidated, setIsValidated] = useState(true)

    const fetchData = async () => {
        // if (!validate(website.url)) {
        //     return alert('Invalid Url')
        // }
        setLoading(true)
        const analyzedWebsite = await analyzeUrl(formik.values.site_url)
        formik.setFieldValue('name', analyzedWebsite.title)
        formik.setFieldValue('description', analyzedWebsite.description)
        setLoading(false)
    }

    const validate = (url: string) => {
        const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
        urlRegex.test(url)
        setIsValidated(urlRegex.test(url))
        return urlRegex.test(url)
    }

    return (
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 p-6">
            <div className='flex flex-row items-center gap-4'>
                <Input type="string" label="URL" placeholder="Enter your website url" value={formik.values.site_url} name='site_url' onChange={formik.handleChange} />

                <Button className='text-white' color={`${isValidated ? 'primary' : 'default'}`} isLoading={loading} onClick={fetchData} disabled={isValidated ? false : true}>
                    <p className='hidden md:block text-white'>Scan My Website</p>
                    <CgEnter className='block text-white' style={{ width: '40px', height: '40px' }} />
                </Button>

            </div>
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="string"
                label="Product/Service Name"
                placeholder="Product/Service Name (Example: KangarooWriter)"
                value={formik.values.name}
                name='name'
                onChange={formik.handleChange}
            />
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="string"
                label="target_audience"
                placeholder="target_audience"
                value={formik.values.target_audience}
                name='target_audience'
                onChange={formik.handleChange}
            />
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="number"
                label="current_email_list_size"
                placeholder="current_email_list_size"
                value={formik.values.current_email_list_size}
                name='current_email_list_size'
                onChange={formik.handleChange}
            />
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="string"
                label="niche"
                placeholder="niche"
                value={formik.values.niche}
                name='niche'
                onChange={formik.handleChange}
            />
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="string"
                label="mission_statement"
                placeholder="mission_statement"
                value={formik.values.mission_statement}
                name='mission_statement'
                onChange={formik.handleChange}
            />
            <Input
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                type="string"
                label="best_selling_products"
                placeholder="best_selling_products"
                value={formik.values.best_selling_products}
                name='best_selling_products'
                onChange={formik.handleChange}
            />
            <Textarea
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                label="Product/Service Description"
                placeholder="Product/Service Description (Example: KangarooWriter is a tool for online marketers...)"
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}
            />
            <Button onClick={logoutUser} color='default' className='rounded-md border text-rose-600 cursor-pointer p-2' type="submit">Cancel</Button>
            <Button onClick={formik.submitForm} color='danger' className='rounded-md border text-white cursor-pointer p-2' type="submit">Continue</Button>
        </div>
    );
}

