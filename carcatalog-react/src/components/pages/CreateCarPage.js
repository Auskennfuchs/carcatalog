import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import EditCarForm from '../forms/editcar'
import { create } from '../../actions/edit'
import Apptemplate from '../apptemplate';

import Calendar from '../calendar'

import CarApi from './../../api'
import { schemaLoad } from './../../actions/schema'

import PageMessage from '../messages/PageMessage'

class CreateCarPage extends Component {

    state = {
        schemes: null,
        errors: {}
    }

    componentDidMount() {
        //        if (!this.props.schemes) {
        this.props.loadSchema(this.props.user.jwt).then(carSchema =>
            this.setState({ schemes: carSchema.schema })
        )
    }

    create = (carData) =>
        this.props.create(carData, this.props.user.jwt)
            .then((car) => {
                this.props.history.push("/cars/".concat(car._id))
            })
            .catch(err => {
                const errors = err.errors
                console.log(errors)
                this.setState({ errors: errors })
                console.log(this.state)
            })

    render() {
        const { schemes } = this.props
        const car = {}
        const { errors } = this.state
        return (
            <Apptemplate>
                <div className="ui main text">
                    <Calendar />
                    {errors.global && <PageMessage text={errors.global} />}
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    create: (carData, token) => create(carData, token),
    loadSchema: (token) => () => (
        CarApi(token).car.schema().then(
            schemaCar => dispatch(schemaLoad("cars", schemaCar))
        )
    ),
}, dispatch)

const mapStateToProps = ({ schemes, user }) => ({ schemes, user });


export default connect(mapStateToProps, mapDispatchToProps)(CreateCarPage)