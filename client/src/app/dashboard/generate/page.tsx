import { CreateForm } from '@/components/form/Form';
import { getForm } from '@/services/server/formServices';

const GeneratePage = async () => {
    const form = await getForm()
    return (
        <div className='flex items-center flex-col'>
            <CreateForm form={form} />
        </div>
    )
}

export default GeneratePage
