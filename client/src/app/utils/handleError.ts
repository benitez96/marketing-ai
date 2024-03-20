import { isAxiosError } from "axios";
import { RedirectType, redirect } from 'next/navigation'

export const handleAxiosError = (error: unknown) => {
    if (isAxiosError(error)) {
        if (error.response?.status === 401) {
            return redirect(`/login`, RedirectType.push)
        }
    }
}