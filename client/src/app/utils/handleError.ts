import { isAxiosError } from "axios";
import { redirect } from 'next/navigation'

export const handleAxiosError = (error: unknown) => {
    if (isAxiosError(error)) {
        if (error.status === 401) {
            redirect('/login')
        }
    }
}