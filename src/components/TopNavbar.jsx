import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function TopNavbar(){
    return(
        <Navbar position="static">
            <NavbarBrand>
                <Link className="font-bold text-inherit" to="/">KanbanMaestro v2</Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link aria-current="page" className="hover:cursor-pointer" to="/">
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="/about" className="hover:cursor-pointer" to="/about">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/documentation" className="hover:cursor-pointer" to="/settings">
                        Documentation
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end"></NavbarContent>
        </Navbar>
    )
}