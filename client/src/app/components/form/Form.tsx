"use client"
import { FormInput } from '@/components/input/FormInput'
import { Form, Formik } from 'formik'

import { IFormInput } from "interfaces/form"

interface Props {
    form: IFormInput[]
}

export const CreateForm = ({ form }: Props) => {
    return (
        <div className='w-5/6'>
            <Formik initialValues={{}} onSubmit={(e: any) => alert(JSON.stringify(e))}>
                <Form className='flex flex-col gap-6' >
                    {
                        form.map((input: IFormInput) => {
                            return (
                                <FormInput key={input.name} input={input} />
                            )
                        })
                    }
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}
