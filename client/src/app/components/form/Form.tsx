"use client"
import { FormInput } from '@/components/input/FormInput'
import { Form, Formik } from 'formik'

import { IFormInput } from "interfaces/form"

interface Props {
    form: IFormInput[]
}

export const CreateForm = ({ form }: Props) => {
    return (
        <>
            <Formik initialValues={{}} onSubmit={(e: any) => console.log(e)}>
                <Form>
                    {
                        form.map((input: IFormInput) => {
                            return (
                                <FormInput input={input} />
                            )
                        })
                    }
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    )
}
