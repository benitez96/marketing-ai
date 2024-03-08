"use client"
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FcGoogle } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

import { request } from '@/utils/axios';
import { validationSchema } from '@/schemas'
import * as userServices from '@/services/userServices'

const initialValues: any = {
  username: '',
  password: '',
}

export const Login = () => {

  const [pswVisible, setPswVisible] = useState(false)
  //   const { login } = useAuth()
  //   const { handleLogin } = useContext(AuthContext)
  const router = useRouter()

  const togglePswVisibility = () => {
    setPswVisible(visible => !visible)
  }

  const handleSubmit = async (values: any) => {
    const { status, data } = await userServices.login(values)

    if (status === 200) {
      // handleLogin({ token: data.access }) 
      localStorage.setItem('token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      request.interceptors.request.use(
        (config: any) => {
          config.headers['Authorization'] = `Bearer ${data.access}`
          return config
        },
      )
      router.push('/')
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
                  color={formik.touched.email && formik.errors.email ? "danger" : ""}
                  placeholder="Username"
                  validationState={formik.touched.email && formik.errors.email ? "error" : ""}
                  errorMessage={formik.touched.email && formik.errors.email && formik.errors.email}
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
                  // isLoading={login.isLoading}
                  >
                    Ingresar
                  </Button>
                </div>
                <Divider className='my-5' />
                <p>Todavia no tenes cuenta?
                  {/* <Link to='/register' className='text-primary'>Registrate</Link> */}
                </p>
              </CardFooter>

              <div className='relative bottom-0 sm:h-5 h-12 -mb-5 mt-4'>
                <p className={`text-white absolute w-full bottom-0 bg-danger text-center transition duration-500 py-1  `} >
                  {/* {parseError(login.error) || "Ha ocurrido un error. Vuelve a intentar mas tarde."} */}
                </p>
              </div>
            </Form>
        }
      </Formik>
    </Card>
  )
}