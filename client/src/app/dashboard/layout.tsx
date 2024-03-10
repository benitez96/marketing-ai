import Sidebar from "@/components/Listbox/Sidebar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-row border m-8 rounded-xl bg-slate-50">
            <Sidebar />
            <div className="rounded-xl m-4 border p-4 w-full bg-white">
                {children}
            </div>
        </div>
    );
}