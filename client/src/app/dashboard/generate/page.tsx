import { CreateForm } from '@/components/form/Form';
import { getForm } from '@/services/server/formServices';

const GeneratePage = async () => {
    const form = await getForm()
    return (
        <div className="rounded-xl sm:m-4 border p-4 w-full bg-white flex flex-col items-center">
            <CreateForm form={form} />
        </div>
    )
}

export default GeneratePage
