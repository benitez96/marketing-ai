"use client"

import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FcGoogle } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

import { api } from '@/utils/axios';
import { validationSchema } from 'entities'
import * as userServices from '@/services/userServices'
import { ILogin } from 'interfaces/user';
import { UserContext } from 'providers/providers';
import User from "entities/user";


const initialValues: any = {
  username: '',
  password: '',
}

export default function Login() {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [pswVisible, setPswVisible] = useState(false)

  const { handleUser, handleBrand } = useContext(UserContext)

  const togglePswVisibility = () => {
    setPswVisible(visible => !visible)
  }

  const handleSubmit = async (values: ILogin) => {
    setIsError(false)
    const loginResponse = await userServices.login(values)


    const loggedUser = new User(loginResponse.id, loginResponse.username, loginResponse.firstName, loginResponse.lastName, loginResponse.email, loginResponse.brands)

    if (loginResponse.success) {
      handleUser(loggedUser)
      handleBrand(loginResponse.brands[0].id)
      if (loggedUser.brands.length > 0) {
        api.interceptors.request.use(
          (config: any) => {
            config.headers['Authorization'] = `Bearer ${loginResponse.access_token}`
            return config
          },
        )
        router.push('/dashboard')
      }
      else {
        router.push('/signup')
      }
    }
    else {
      setIsError(true)
      router.push('/login')
    }
  }

  return (
    <Card className="max-w-lg w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Ingresa</CardHeader>
      <Button variant="ghost" className='mx-5 mb-5'>
        <FcGoogle /> Continuar con Google
      </Button>
      <div className="relative">
        <span className='absolute right-[50%] -top-0 bg-content1 w-5 text-center rounded-full'>O</span>
        <Divider className='my-3' />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {
          formik =>
            <Form>
              <CardBody className='flex flex-col gap-3'>
                <Field
                  as={Input}
                  variant="bordered"
                  name="username"
                  type="text"
                  color={formik.touched.username && formik.errors.username ? "danger" : ""}
                  placeholder="Username"
                  validationState={formik.touched.username && formik.errors.username ? "error" : ""}
                  errorMessage={formik.touched.username && formik.errors.username && formik.errors.username}
                />
                <Field
                  as={Input}
                  variant="bordered"
                  name="password"
                  placeholder="Password"
                  color={formik.touched.password && formik.errors.password ? "danger" : ""}
                  validationState={formik.touched.password && formik.errors.password}
                  errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={togglePswVisibility}>
                      {
                        pswVisible
                          ? <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                          : <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                      }
                    </button>
                  }
                  type={pswVisible ? "text" : "password"}
                />
              </CardBody>
              <CardFooter className="flex flex-col" >
                <div className='text-end w-full px-3'>
                  <Button
                    variant="solid"
                    color="primary"
                    type='submit'
                    className='text-white'
                  >
                    Sign in
                  </Button>
                </div>
                <Divider className='my-5' />
                <p>Don&apos;t have an account yet ?</p>
              </CardFooter>

              <div className='relative bottom-0 sm:h-5 h-12 -mb-5 mt-4'>
                {
                  isError &&
                  <p className={`text-white absolute w-full bottom-0 bg-danger text-center transition duration-500 py-1  `} >
                    {"Ha ocurrido un error. Vuelve a intentar mas tarde."}
                  </p>
                }
              </div>
            </Form>
        }
      </Formik>
    </Card>
  )
}
