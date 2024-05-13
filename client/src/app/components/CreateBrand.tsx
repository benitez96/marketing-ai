"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Input } from "@nextui-org/react";

import styles from '../styles/input.module.css'
import { api } from '@/utils/axios';
import { ScanWebsite } from '@/components/scan-website/ScanWebsite';

export const CreateBrand = ({ continueCallBack, cancelCallBack }: any) => {
    const [loading, setLoading] = useState(false)

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
            continueCallBack(response)
        },
    });

    return (
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 p-6">
            <ScanWebsite value={formik.values} loading={loading} handleChange={formik.handleChange} setLoading={setLoading} setFieldValue={formik.setFieldValue} />
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
            <Button onClick={cancelCallBack} color='default' className='rounded-md border text-rose-600 cursor-pointer p-2' type="submit">Cancel</Button>
            <Button onClick={formik.submitForm} color='danger' className='rounded-md border text-white cursor-pointer p-2' type="submit">Continue</Button>
        </div>
    );
}

