import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './navMenuStyle.css';

export class NavMenu extends Component {
    state = {
        collapsed: true
    }

    toggleNavbar = () => this.setState(state => ({ collapsed: !state.collapsed }))

    render() {
        const { collapsed } = this.state

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Curupira Car</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Início</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/apolices">Apolices</NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/apolices/adicionar">Criar Apolices</NavLink>
                                </NavItem>

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }
}
