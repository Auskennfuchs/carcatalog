import React, { Component } from 'react';
import { Menu, Sidebar, Segment } from 'semantic-ui-react'
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
        const { children } = this.props
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

export default AppTemplate;