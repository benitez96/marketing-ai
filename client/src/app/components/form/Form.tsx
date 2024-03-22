"use client"
import { FormInput } from '@/components/input/FormInput'
import { Form, Formik } from 'formik'
import { Button } from '@nextui-org/react'

import { IFormInput } from "interfaces/form"

interface Props {
  form: IFormInput[]
}

export const CreateForm = ({ form }: Props) => {
  return (
    <Formik initialValues={{}} onSubmit={(e: any) => alert(JSON.stringify(e))}>
      <Form className='flex flex-col gap-4 w-full'>
        {
          form.map((input: IFormInput) => {
            return (
              <FormInput key={input.name} input={input} />
            )
          })
        }
        <Button
          type="submit"
          radius='sm'
          color='primary'
          size='lg'
        >
          Submit
        </Button>
      </Form>
    </Formik>
  )
}
