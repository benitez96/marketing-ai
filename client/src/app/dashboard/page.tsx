import { User } from '@/components/user/User';
import { getUser, getUserCached } from '@/services/server/userService';
import { Divider } from '@nextui-org/react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const DashboardPage = async () => {
    return (
        <div>
            <User />
        </div>
    );
}

export default DashboardPage
