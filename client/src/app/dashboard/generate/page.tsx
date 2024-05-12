import { CreateForm } from '@/components/form/Form';
import { getForm } from '@/services/server/formServices';

const GeneratePage = async () => {
    return (
        <div className='flex items-center flex-col'>
            <CreateForm />
        </div>
    )
}

export default GeneratePage
