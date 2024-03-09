import { deleteToken } from "@/actions/auth";
import { LuHome } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

const logout = async () => {
    await deleteToken()
}
interface SidebarItems {
    key: string;
    label: string;
    startContent: JSX.Element;
    description: string;
    href: string;
    onClick?: () => void;
}

const items = [
    {
        key: 'home-key',
        href: "/",
        label: "Home",
        startContent: <LuHome />,
        description: "Navigate back to home"
    },
    {
        key: "logout-key",
        label: "Logout",
        startContent: <LuLogOut />,
        description: "Leave session",
        href: "/",
        onClick: () => logout(),
    },
];

export default items