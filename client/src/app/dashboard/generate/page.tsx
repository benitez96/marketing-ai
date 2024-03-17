import axios from 'axios'
import { CreateForm } from '@/components/form/Form';

import { IFormInput } from "interfaces/form"
import { api } from '@/utils/axios';

const getForm = async () => {
    const response = await api.get<IFormInput[]>('forms/free')
    return response.data
}

const GeneratePage = async () => {
    const form = await getForm()
    return (
        <div className="rounded-xl m-4 border p-4 w-full bg-white flex flex-col items-center">
            <CreateForm form={form} />
        </div>
    )
}

export default GeneratePage
