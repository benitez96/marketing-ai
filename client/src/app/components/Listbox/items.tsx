import { deleteToken } from "@/actions/auth";
import { LuHome } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const logout = async () => {
    const result = await deleteToken()
    console.log('logging out.... (2)', result)
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
        href: "/dashboard",
        label: "Home",
        startContent: <LuHome />,
        description: "Navigate back to home"
    },
    {
        key: 'account-key',
        href: "/dashboard/account",
        label: "Account",
        startContent: <RiAccountCircleLine />,
        description: "Navigate back to home"
    },
    {
        key: 'brands-key',
        href: "/dashboard/brands",
        label: "Brands",
        startContent: <FaRegStar />,
        description: "See all your brands"
    },
    {
        key: 'emails-key',
        href: "/dashboard/projects",
        label: "Emails",
        startContent: <AiOutlineMail />,
        description: "Emails history"
    },
    {
        key: "logout-key",
        label: "Logout",
        startContent: <LuLogOut />,
    },

];

export default items