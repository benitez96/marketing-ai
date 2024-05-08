import React from 'react'
import SignUp from '../SignUp'

export const Account = ({setStep}: any) => {
  return (
    <div className={`transition-opacity duration-500`}>
      <SignUp setStep={setStep}/>
    </div>
  )
}
