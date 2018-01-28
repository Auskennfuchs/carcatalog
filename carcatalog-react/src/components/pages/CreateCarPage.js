import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CreateCarForm from '../forms/editcar'
import { create } from '../../actions/edit'
import Apptemplate from '../apptemplate';

class CreateCarPage extends Component {

    create = (data) =>
        this.props.create(data)

    render() {
        return (
            <Apptemplate>
                <div className="ui main text">
                    <h1>Fahrzeug hinzufügen</h1>
                    <CreateCarForm submit={this.create} />
                </div>
            </Apptemplate>
        )
    }
}

CreateCarPage.propTypes = {
    create: PropTypes.func.isRequired
}

export default connect(null, { create })(CreateCarPage)