/**
 * Renders the top navigation bar component.
 * @param {Object} props - The component props.
 * @param {string} props.activePage - The currently active page.
 * @returns {JSX.Element} The top navigation bar component.
*/

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
                    <Link className="hover:cursor-pointer" to="/dashboard">
                        Dashboard
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <WhatsNewModal />
            </NavbarContent>
        </Navbar>
    )
}