import React, { Component } from 'react';
import { Menu, Sidebar, Segment, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from './header'

class AppTemplate extends Component {

    static defaultProps = {
        children: null
    }
    
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

        return (
            <div className="mainContent">
                <Menu className="headerMenu">
                    <Menu.Item header>Car Catalog</Menu.Item>
                    <Menu.Item name="Test" />
                    <Menu.Menu position="right" icon="labeled">
                        <Menu.Item>
                            {user.name}
                            <Icon name="user outline" />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
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
    }).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ])
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(AppTemplate)