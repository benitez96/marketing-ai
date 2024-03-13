"use server"

import { TOKEN_NAME } from "@/utils/const"
import { IToken } from "interfaces/user"
import { cookies } from "next/headers"

export async function storeToken(request: IToken) {
    cookies().set({
        name: TOKEN_NAME,
        value: request.access_token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })
}

export async function getToken() {
    return cookies().get(TOKEN_NAME)
}

export async function deleteToken() {
    cookies().delete(TOKEN_NAME)
}