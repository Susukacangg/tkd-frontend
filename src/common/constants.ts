import {NavLinkProps} from "react-router-dom";

export const PASS_REGEX: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/])[A-Za-z\d@$!%*?&\/]{8,}$/;
export const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9])*$/;
export const MENU_ITEMS: NavLinkProps[] = [
    {to: "/home", children: "Home"},
    {to: "/about", children: "About"},
];
