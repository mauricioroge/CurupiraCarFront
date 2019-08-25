import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './style.css';

export const Layout = ({ children }) => (
    <div>
        <NavMenu />
        <Container>
            {children}
        </Container>
    </div>
)