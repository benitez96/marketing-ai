"use client"
import { FormInput } from '@/components/input/FormInput'

export const CreateForm = ({ form }: any) => {
    return (
        <>

            {
                form.map((input: any) => {
                    return (
                        <FormInput type={input.type} description={input.description} label={input.label} values={input.values} />
                    )
                })
            }
        </>
    )
}
