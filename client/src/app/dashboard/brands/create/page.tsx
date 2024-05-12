"use client"
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import { InputUrl } from '@/components/Input';

const CreateBrandPage = async () => {
    const router = useRouter()

    const cb = (response: AxiosResponse<any, any>) => {
        if (response.status === 200) {
            router.push(`/dashboard/projects/${response.data.id}`)
        }
    }

    const cancelCallBack = () => {
        router.push(`/dashboard`)
    }

    return (
        <div>
            <InputUrl continueCallBack={cb} cancelCallBack={cancelCallBack} />
        </div>
    );
}

export default CreateBrandPage
