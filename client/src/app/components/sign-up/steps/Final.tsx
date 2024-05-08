import { useRouter } from 'next/navigation'
import React from 'react'
import Link from "next/link";

export const Final = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center'>
      <h1>Final</h1>
      <Link className='mt-10 bg-red ' href={'/dashboard'}>Finish set up</Link>
    </div>
  )
}
