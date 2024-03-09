import { LuLogIn } from "react-icons/lu";
import { LuHome } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
const items = [
    {
        key: "/",
        label: "Home",
        icon: <LuHome />,
        description: "Navigate back to home"
    },
    {
        key: "/dashboard/logout",
        label: "Logout",
        icon: <LuLogIn />,
        description: "Leave session"
    },
];

export default items