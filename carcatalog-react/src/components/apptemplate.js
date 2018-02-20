import React, { Component } from 'react';
import { Menu, Sidebar, Segment, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from './header'

class AppTemplate extends Component {

    state = {
        menuSize: 'very thin',
    }

    onMouseOver = () => {
        this.setState({
            menuSize: 'thin'
        })
    }

    onMouseOut = () => {
        this.setState({
            menuSize: 'very thin'
        })
    }

    render() {
        const { children, user } = this.props
        /*
        <Menu inverted>
                <Menu.Item header>Car Catalog</Menu.Item>
                <Menu.Item name="Test" />
                <Menu.Menu position="right" icon="labeled">
                    <Menu.Item>
                        <Icon name="user outline" />
                        {user.name}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            */
        return (
            <div className="mainContent">
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} visible icon vertical inverted width={this.state.menuSize} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                        <Header />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            {children}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div >
        );
    }
}

AppTemplate.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(AppTemplate)