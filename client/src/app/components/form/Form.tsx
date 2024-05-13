"use client"
import { Select, SelectItem } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { FormInput } from '@/components/input/FormInput'
import { useFormik } from 'formik'

import { api } from '@/utils/axios'
import { Types } from "interfaces/form"
import { EmailSubtype } from '../email-subtype/EmailSubtype'
import { UserContext } from 'providers/providers'
import { ScanWebsite } from '../scan-website/ScanWebsite'


interface Props {
}

export const CreateForm = ({ }: Props) => {
    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState([])
    const { currentBrand } = useContext(UserContext)

    const formik = useFormik<{ [key: string]: any }>({
        initialValues: {
            email: undefined,
            email_subtype: undefined
        },
        onSubmit: async (values) => {
        },
    });

    useEffect(() => {
        const fetch = async () => {
            const result = await api.get(`/forms/${formik.values.email_subtype}`)
            setInputs(result.data.inputs)
        }
        if (formik.values.email_subtype !== undefined) {
            fetch()
        }
    }, [formik.values.email_subtype])

    return (
        <div className='w-5/6 flex flex-col gap-4'>
            <Select
                value={formik.values.email}
                name='email'
                onChange={formik.handleChange}
                items={[
                    {
                        label: 'Flow Email',
                        value: 'flow_email',
                        description: '',
                    },
                    {
                        label: 'Email Campaign',
                        value: 'email_campaign',
                        description: '',
                    }
                ]}
                isRequired={true}
                label={'Email Type'}
                placeholder={'Select an option'}
            >
                {(input) => <SelectItem key={input.value}>{input.label}</SelectItem>}
            </Select>

            <EmailSubtype handleChange={formik.handleChange} emailType={formik.values.email} />

            {
                inputs.map((input: any) => {
                    if (Object.values(Types).includes(input.type)) {
                        if (input.type === 'scan') {
                            return <ScanWebsite
                                loading={loading}
                                setLoading={setLoading}
                                value={formik.values as any}
                                handleChange={formik.handleChange}
                                setFieldValue={formik.setFieldValue}
                                key={input.id}
                            />
                        }
                        return <FormInput key={input.name} input={input} handleChange={formik.handleChange} value={formik.values[input.name]} />
                    }
                    else {
                        throw new Error('Invalid type')
                    }
                })
            }

            <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
    )
}
