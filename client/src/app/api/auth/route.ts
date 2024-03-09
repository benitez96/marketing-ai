import { cookies } from "next/headers"
import { TOKEN_NAME } from "@/utils/const"
import { deleteToken } from "@/actions/auth"
import { NextRequest } from "next/server"

export async function DELETE(request: NextRequest) {
    cookies().delete(TOKEN_NAME)
    return new Response('OK', {
        status: 200,
    })
}