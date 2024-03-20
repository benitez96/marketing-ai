import Sidebar from "@/components/listbox/Sidebar";
import ThemeProvider from "../providers/providers";
import { getUser } from "@/services/server/userService";
import { redirect } from "next/navigation";
import { deleteToken } from "@/actions/auth";
import { CheckAuth } from "@/components/auth/CheckAuth";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/utils/const";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row border m-8 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] 2xl:ml-auto 2xl:mr-auto">
            <Sidebar />
            {children}
        </div>
    );
}