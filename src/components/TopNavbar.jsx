import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import { Link } from "react-router-dom";
import WhatsNewModal from "./WhatsNewModal";

export default function TopNavbar({activePage}){
    return(
        <Navbar position="static">
            <NavbarBrand>
                <Link className="font-bold text-inherit" to="/">KanbanMaestro</Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={activePage === "Dashboard"}>
                    <Link aria-current="page" className="hover:cursor-pointer" to="/dashboard">
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activePage === "Documentation"}>
                    <Link color="foreground" className="hover:cursor-pointer" to="/documentation">
                        Documentation
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <WhatsNewModal />
            </NavbarContent>
        </Navbar>
    )
}