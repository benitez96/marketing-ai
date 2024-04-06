"use client"
import { FormInput } from '@/components/input/FormInput'
import { Form, Formik } from 'formik'

import { IFormInput } from "interfaces/form"
import { InputUrl } from '../Input'

interface Props {
    form: IFormInput[]
}

export const CreateForm = ({ form }: Props) => {
    return (
        <div className='w-5/6 flex flex-col gap-4'>
            <InputUrl />
            <Formik initialValues={{}} onSubmit={(e: any) => alert(JSON.stringify(e))}>
                <Form className='flex flex-col gap-6' >
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
