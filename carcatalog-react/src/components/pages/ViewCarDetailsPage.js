import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Apptemplate from '../apptemplate'
import { getCar, save } from '../../actions/edit'
import PageMessage from '../messages/PageMessage';

import CarApi from './../../api'
import { schemaLoad } from './../../actions/schema'

import EditCarForm from './../forms/editcar'

class ViewCarDetailsPage extends Component {
    state = {
        car: {},
        loading: true,
        success: false,
        errors: {},
        schemes: null
    }

    componentDidMount() {
        //        if (!this.props.schemes) {
        this.props.loadSchema()
            .then(carSchema =>
                this.setState({ schemes: carSchema.schema })
            )
            .catch(err => {
                this.setState({ errors: { global: "error loading schema" } })
            })
        //        }
        const { id } = this.props.match.params
        this.props.getCar(id)
            .then(car =>
                this.setState({ car, loading: false, success: true })
            )
            .catch((err) => {
                this.setState({ car: {}, loading: false, success: false, errors: err.response.data.errors })
            })
    }

    onSubmit = (carData) => {
        this.props.saveCar(carData)
            .catch(err => {
                console.log("error" + err)
            })
    }

    render() {
        const { car, loading, success, errors } = this.state
        const { schemes } = this.props
        return (
            <Apptemplate>
                {!!errors.global && errors.global && <PageMessage text={errors.global} />}
                {loading &&
                    <div>Loading</div>
                }
                {!loading && success &&
                    <EditCarForm schema={schemes} car={car} submit={this.onSubmit} />
                }
            </Apptemplate>
        )
    }
}

ViewCarDetailsPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    getCar: PropTypes.func.isRequired,
    loadSchema: PropTypes.func.isRequired,
    schemes: PropTypes.shape({
        grouping: PropTypes.object.isRequired,
        schema: PropTypes.array.isRequired,
    }).isRequired,
    saveCar: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCar: id => getCar(id),
    loadSchema: () => () => (
        CarApi.car.schema().then(
            schemaCar => dispatch(schemaLoad("cars", schemaCar))
        )
    ),
    saveCar: (car) => save(car),
}, dispatch)

const mapStateToProps = ({ schemes }) => ({ schemes });

export default connect(mapStateToProps, mapDispatchToProps)(ViewCarDetailsPage)