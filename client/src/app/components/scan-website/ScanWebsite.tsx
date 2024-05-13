import { Button, Input, Textarea } from '@nextui-org/react'
import { CgEnter } from 'react-icons/cg'
import React from 'react'

import { analyzeUrl } from '@/services/server/scrappingServices'

interface Props {
    value: {
        name: string,
        site_url: string
        description: string
    }
    loading: boolean
    handleChange: any
    setLoading: any
    setFieldValue: any
    styles: any
}

export const ScanWebsite = ({ value, loading, handleChange, setLoading, setFieldValue, styles }: Props) => {

    const fetchData = async () => {
        if (!validate(value.site_url)) {
            return alert('Invalid Url')
        }
        setLoading(true)
        const analyzedWebsite = await analyzeUrl(value.site_url)
        setFieldValue('name', analyzedWebsite.title)
        setFieldValue('description', analyzedWebsite.description)
        setLoading(false)
    }

    const validate = (url: string) => {
        const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
        return urlRegex.test(url)
    }

    return (
        <>
            <div className='flex flex-row items-center gap-4'>
                <Input type="string" label="URL" placeholder="Enter your website url" value={value.site_url} name='site_url' onChange={handleChange} />
                <Button className='text-white' color={`${validate(value.site_url) ? 'primary' : 'default'}`} isLoading={loading} onClick={fetchData} disabled={validate(value.site_url) ? false : true}>
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
                value={value.name}
                name='name'
                onChange={handleChange}
            />

            <Textarea
                classNames={{
                    inputWrapper: [loading && styles.loading]
                }}
                label="Product/Service Description"
                placeholder="Product/Service Description (Example: KangarooWriter is a tool for online marketers...)"
                name='description'
                onChange={handleChange}
                value={value.description}
            />
        </>

    )
}
