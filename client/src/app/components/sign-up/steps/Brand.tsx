"use client"
import { AxiosResponse } from 'axios'
import React, { useContext } from 'react'

import { CreateBrand } from '@/components/CreateBrand'
import { UserContext } from 'providers/providers'

export const Brand = ({ setStep }: any) => {
  const { logoutUser } = useContext(UserContext)

  const cb = (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      setStep(3)
    }
  }

  const cancelCallBack = () => {
    logoutUser()
  }

  return (
    <div>
      <CreateBrand continueCallBack={cb} cancelCallBack={cancelCallBack} />
    </div>
  )
}
