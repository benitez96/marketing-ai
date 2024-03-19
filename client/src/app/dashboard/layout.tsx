import Sidebar from "@/components/Listbox/Sidebar";
import ThemeProvider from "../providers/providers";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <ThemeProvider>
            <div className="flex flex-row border m-8 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] 2xl:ml-auto 2xl:mr-auto">
                <Sidebar />
                {children}
            </div>
        </ThemeProvider>

    );
}