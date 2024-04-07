"use client"
import React, { useState } from 'react'
import { useFormikContext } from 'formik';
import { Button, Input, Textarea } from "@nextui-org/react";
import { CgEnter } from "react-icons/cg";

import { analyzeUrl } from '@/services/server/scrappingServices';
import styles from './input.module.css'

export const InputUrl = () => {
    const [loading, setLoading] = useState(false)
    const [website, setWebsite] = useState({
        url: '',
        name: '',
        description: ''
    })
    const { setFieldValue } = useFormikContext();

    const [isValidated, setIsValidated] = useState(false)

    const fetchData = async () => {
        if (!validate(website.url)) {
            return alert('Invalid Url')
        }
        setLoading(true)
        const analyzedWebsite = await analyzeUrl(website.url)
        setWebsite({
            ...website,
            description: analyzedWebsite.description,
            name: analyzedWebsite.title
        })
        setFieldValue('name', analyzedWebsite.title)
        setFieldValue('description', analyzedWebsite.description)
        setLoading(false)
    }

    const validate = (url: string) => {
        const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
        urlRegex.test(url)
        setIsValidated(urlRegex.test(url))
        return urlRegex.test(url)
    }

    const handleOnChange = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setWebsite({
            ...website,
            [name]: value
        })
        if (name === 'url') {
            validate(e.target.value)
        }
        if(name !== 'url'){
            setFieldValue(name, value)
        }
    }

    return (
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
            <div className='flex flex-row items-center gap-4'>
                <Input type="string" label="URL" placeholder="Enter your website url" value={website.url} name='url' onChange={handleOnChange} />

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
                value={website.name}
                name='name'
                onChange={handleOnChange}
            />
            <Textarea
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                label="Product/Service Description"
                placeholder="Product/Service Description (Example: KangarooWriter is a tool for online marketers...)"
                name='description'
                onChange={handleOnChange}
                value={website.description}
            />
        </div>
    );
}

