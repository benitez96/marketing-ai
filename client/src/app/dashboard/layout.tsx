import Sidebar from "@/components/Listbox/Sidebar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-row">
            <Sidebar />
            {children}
        </div>
    );
}