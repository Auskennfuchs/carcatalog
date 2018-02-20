import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

import { loggedOut } from '../actions/login';

class Header extends Component {
    state = {
        activeItem: window.location.pathname
    }

    onLogout = () => {
        this.props.logout().then(this.props.history.push("/"))
    }

    onRoute = (e, { destination }) => {
        this.props.history.push(destination)
        this.setState({
            activeItem: destination
        })
    }

    render() {
        const { activeItem } = this.state;
        return [
            <Menu.Item onClick={this.onRoute} destination="/cars" active={activeItem.startsWith("/cars")} key="car">
                <Icon name="car" size="large" />
            </Menu.Item>,
            <Menu.Item onClick={this.onRoute} destination="/cars/create" active={activeItem === "/cars/create"} key="createcar">
                <Icon name="user circle outline" size="large" />
            </Menu.Item>,
            <Menu.Item onClick={this.onLogout} key="signout">
                <Icon name="sign out" size="large" />
            </Menu.Item>
        ]
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => Promise.resolve(dispatch(loggedOut()))
})

export default withRouter(connect(null, mapDispatchToProps)(Header))