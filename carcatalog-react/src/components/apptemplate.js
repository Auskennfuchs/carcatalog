import React from 'react';
import Header from './header'

const AppTemplate = ({ children }) => (
    <div className="appContent">
        <nav className="mainMenu">
            <Header />
        </nav>
        <div className="mainContent">
            {children}
        </div>
    </div>
)

export default AppTemplate;