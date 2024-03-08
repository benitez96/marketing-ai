"use server"

import { IToken } from "interfaces/user"
import { cookies } from "next/headers"


export async function storeToken(request: IToken) {
    cookies().set({
        name: "accessToken",
        value: request.access_token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })
}