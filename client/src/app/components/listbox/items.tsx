import { LuHome } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";

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
        key: 'projects-key',
        href: "/dashboard/projects",
        label: "Projects",
        startContent: <TfiWrite />,
        description: "History of projects"
    },
];

export default items
