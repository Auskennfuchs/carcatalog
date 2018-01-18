import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CreateCarForm from '../forms/editcar'
import {create} from '../../actions/edit'

class CreateCarPage extends Component {

    create = (data) => 
        this.props.create(data)

    render() {
        return (
            <div>
                <h1>Fahrzeug hinzufügen</h1>
                <CreateCarForm submit={this.create}/>
            </div>
        )
    }
}

CreateCarPage.propTypes = {
    create: PropTypes.func.isRequired
}

export default connect(null,{create})(CreateCarPage)