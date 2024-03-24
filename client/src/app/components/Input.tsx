"use client"
import React, { useEffect, useState } from 'react'
import { Button, Input, Textarea } from "@nextui-org/react";
import { analyzeUrl } from '@/services/server/scrappingServices';
import styles from './input.module.css'

export const InputUrl = () => {
    const [loading, setLoading] = useState(false)
    const [context, setContext] = useState('')
    const [website, setWebsite] = useState({
        url: '',
        name: '',
        description: ''
    })
    const [isValidated, setIsValidated] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const r = await analyzeUrl(website.url)
        setContext(JSON.stringify(r.head))
        setLoading(false)
    }

    const validate = (url: string) => {
        const urlRegex = /^((?!https?:\/\/)[\w.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        urlRegex.test(url)
        setIsValidated(urlRegex.test(url))
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
    }


    return (
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
            <div className='flex flex-row items-center gap-4'>
                <Input type="string" label="URL" placeholder="Enter your website url" value={website.url} name='url' onChange={handleOnChange} />
                <Button color={`${isValidated ? 'primary' : 'default'}`} isLoading={loading} onClick={fetchData}>
                    Scan My Website
                </Button>
            </div>
            <Input classNames={{
                inputWrapper: [loading && styles.loading]
            }} type="string" label="Product/Service Name" placeholder="Product/Service Name (Example: KangarooWriter)" value={website.name} name='name' onChange={handleOnChange} />
            <Textarea
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                label="Product/Service Description"
                placeholder="Product/Service Description (Example: KangarooWriter is a tool for online marketers...)"
                name='description'
                onChange={handleOnChange}
            />
            <p>{context}</p>
        </div>
    );
}

