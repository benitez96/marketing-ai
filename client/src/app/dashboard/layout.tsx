import Sidebar from "@/components/Listbox/Sidebar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-row border m-4 rounded-xl bg-slate-50 min-h-[100vh] max-w-[1600px] mx-auto">
            <Sidebar />
            {children}
        </div>
    );
}