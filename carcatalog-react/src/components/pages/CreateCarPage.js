import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CreateCarForm from '../forms/editcar'
import { create } from '../../actions/edit'
import Header from '../header'

class CreateCarPage extends Component {

    create = (data) =>
        this.props.create(data)

    render() {
        return (
            <div>
                <Header />
                <div className="ui main text container">
                    <h1>Fahrzeug hinzufügen</h1>
                    <CreateCarForm submit={this.create} />
                </div>
            </div>
        )
    }
}

CreateCarPage.propTypes = {
    create: PropTypes.func.isRequired
}

export default connect(null, { create })(CreateCarPage)