// credit to https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap

import React from 'react';
import {Nav} from "react-bootstrap";
import "../SideBar/sidebar.css";

export const SideBar = () => {
    return (
        <>
        <Nav className="d-none d-md-block bg-light sidebar">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/recommendations" eventKey="/recommendations">Recommendations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/combos" eventKey="/combos">Combos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href='/about' eventKey="/about">About</Nav.Link>
            </Nav.Item>
        </Nav>
        </>
    )
}