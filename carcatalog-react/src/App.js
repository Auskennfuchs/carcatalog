import React, { Component } from 'react'
import { Link,Route } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import CreateCarPage from './components/pages/CreateCarPage'
import ViewCarListPage from './components/pages/ViewCarListPage'

class App extends Component {
  render() {
    return (
      <div className="App">
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
        <div className="ui main text container">
          <Route path="/cars" exact component={ViewCarListPage}/>
          <Route path="/cars/create" exact component={CreateCarPage}/>
        </div>
      </div>
    );
  }
}

export default App;
