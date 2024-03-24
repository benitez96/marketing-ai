import Sidebar from "@/components/listbox/Sidebar";
import ThemeProvider from "../providers/providers";
import { getUser } from "@/services/server/userService";
import { redirect } from "next/navigation";
import { deleteToken } from "@/actions/auth";
import { CheckAuth } from "@/components/auth/CheckAuth";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/utils/const";
import Navigation from "@/components/navbar/Navbar";
import { 
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button, Link as LinkNextUI 
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
    <body className="text-foreground bg-background min-h-[100dvh] flex flex-col">
      <Navbar 
        disableAnimation 
        isBordered
        maxWidth="full"
        classNames={{
          wrapper: 'px-3',
        }}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">KangarooWriter</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">KangarooWriter</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/signup" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <Sidebar />
        </NavbarMenu>

      </Navbar>
      <div className="grid sm:grid-cols-[300px_1fr] h-full flex-grow">
        <aside className="border-r-3 border-content3 p-2 hidden sm:block">
          <Sidebar />
        </aside>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </div>
    </body>
    );
}
