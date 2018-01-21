import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
    render() {
        return (
            <header className="ui fixed inverted menu">
                <div className="ui container">
                    <div className="header item">
                        Car Catalog
              </div>
                    <Menu inverted>
                        <Menu.Item>
                            <Link to="/cars">Grid</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/cars/create">New Car</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </header>
        );
    }
}