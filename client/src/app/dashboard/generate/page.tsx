import axios from 'axios'
import { CreateForm } from '@/components/form/Form';

const getForm = async () => {
    const response = await axios.get('http://localhost:8000/api/forms/free')
    return response.data
}

export const GeneratePage = async () => {
    const form = await getForm()
    return (<CreateForm form={form} />)
}

export default GeneratePage
