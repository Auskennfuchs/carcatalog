import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import EditCarForm from '../forms/editcar'
import { create } from '../../actions/edit'
import Apptemplate from '../apptemplate';

import CarApi from './../../api'
import { schemaLoad } from './../../actions/schema'

class CreateCarPage extends Component {

    state = {
        schemes: null
    }

    componentDidMount() {
        //        if (!this.props.schemes) {
        this.props.loadSchema().then(carSchema =>
            this.setState({ schemes: carSchema.schema })
        )
    }

    create = (carData) =>
        this.props.create(carData).then( car =>
            this.props.history.push("/cars/".concat(car._id))
        )

    render() {
        const { schemes } = this.props
        const car = {}
        return (
            <Apptemplate>
                <div className="ui main text">
                    <h1>Fahrzeug hinzufügen</h1>
                    <EditCarForm schema={schemes} car={car} submit={this.create} />
                </div>
            </Apptemplate>
        )
    }
}

CreateCarPage.propTypes = {
    create: PropTypes.func.isRequired,
    schemes: PropTypes.shape({
        grouping: PropTypes.object.isRequired,
        schema: PropTypes.array.isRequired,
    }).isRequired,
    history:PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    create: (carData) => create(carData),
    loadSchema: () => () => (
        CarApi.car.schema().then(
            schemaCar => dispatch(schemaLoad("cars", schemaCar))
        )
    ),
}, dispatch)

const mapStateToProps = ({ schemes }) => ({ schemes });


export default connect(mapStateToProps, mapDispatchToProps)(CreateCarPage)