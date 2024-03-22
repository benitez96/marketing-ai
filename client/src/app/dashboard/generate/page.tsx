import { CreateForm } from '@/components/form/Form';
import { getForm } from '@/services/server/formServices';

const GeneratePage = async () => {
    const form = await getForm()
    return (
        <div className="flex flex-col container mx-auto max-w-screen-md">
            <CreateForm form={form} />
        </div>
    )
}

export default GeneratePage
