import { User } from '@/components/user/User';
import { getUser, getUserCached } from '@/services/server/userService';
import { Divider } from '@nextui-org/react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const CreateBrandPage = async () => {
    return (
        <div>
            <h1>Wanna create a brand ?</h1>
        </div>
    );
}

export default CreateBrandPage
