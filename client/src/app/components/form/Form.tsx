"use client"
import { FormInput } from '@/components/input/FormInput'
import { Form, Formik } from 'formik'

import { IFormInput } from "interfaces/form"
import { InputUrl } from '../Input'
import { api } from '@/utils/axios'

interface Props {
    form: IFormInput[]
}

export const CreateForm = ({ form }: Props) => {

    const handleSubmit = async (e: any) => {
        console.log(e)
        const body = e
        const response = await api.post('/chats/init', body)
        console.log('Response ===>', response.data)
    }


    return (
        <div className='w-5/6 flex flex-col gap-4'>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <Form className='flex flex-col gap-6' >
                    <InputUrl />
                    {
                        form.map((input: IFormInput) => {
                            return (
                                <FormInput key={input.name} input={input} />
                            )
                        })
                    }
                    <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}
