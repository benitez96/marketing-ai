"use client"
import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button, Link as LinkNextUI } from "@nextui-org/react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

import { menuItems } from "./static";
import { ThemeContext } from "providers/providers";
import Loader from "../loader/Loader";

export default function Navigation() {
    const { user, isLoading } = useContext(ThemeContext)
    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">KangarooWriter</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">KangarooWriter</p>
                </NavbarBrand>
                <NavbarItem>
                    <Button
                        href="/dashboard"
                        as={LinkNextUI}
                        color="primary"
                        variant="solid"
                        showAnchorIcon={true}
                        anchorIcon={<FaExternalLinkAlt />}
                    >
                        Write
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <Loader>
                {
                    user.username.length > 0
                        ?
                        <Link href="/dashboard">Dashboard</Link>
                        :
                        <NavbarContent justify="end">
                            <NavbarItem className="hidden md:flex">
                                <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={Link} href="/signup" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </NavbarContent>
                }
            </Loader>




            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href={item.path}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}