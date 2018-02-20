import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { PersistGate } from 'redux-persist/lib/integration/react'

import { Provider } from 'react-redux'

import CreateCarPage from './components/pages/CreateCarPage'
import ViewCarListPage from './components/pages/car/ViewCarListPage'
import LoginPage from './components/pages/LoginPage'
import ViewCarDetailsPage from './components/pages/ViewCarDetailsPage'

import configureStore from './configureStore'

const { store, persistor } = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
          <BrowserRouter>
            <div className="App">
              <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/cars" exact component={ViewCarListPage} />
                <Route path="/cars/create" exact component={CreateCarPage} />
                <Route path="/cars/:id" exact component={ViewCarDetailsPage} />
              </Switch>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
