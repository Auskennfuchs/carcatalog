import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'

import Apptemplate from '../apptemplate'
import { getCar, save } from '../../actions/edit'
import PageMessage from '../messages/PageMessage';

import CarApi from './../../api'
import { schemaLoad } from './../../actions/schema'

import EditCarForm from './../forms/editcar'
import PictureUpload from '../pictureupload/pictureupload'

import LoadingSpinner from '../elements/loadingspinner'

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
        this.props.loadSchema(this.props.user.jwt)
            .then(carSchema =>
                this.setState({ schemes: carSchema.schema })
            )
            .catch(() => {
                this.setState({ errors: { global: "error loading schema" } })
            })
        //        }
        const { id } = this.props.match.params
        this.props.getCar(id, this.props.user.jwt)
            .then(car =>
                this.setState({ car, loading: false, success: true })
            )
            .catch((err) => {
                const respObj = {
                    car: {},
                    loading: false,
                    success: false,
                    errors: err.response.data.errors || {}
                }
                if (err.response.status === 401) {
                    respObj.errors = { global: "Unauthorized" }
                }
                this.setState(respObj)
            })
    }

    onSubmit = (carData) => {
        this.props.saveCar(carData, this.props.user.jwt)
            .then(car => this.setState({ car }))
            .catch(err => {
                console.log("error".concat(err))
            })
    }

    onSubmitPicture = (pictures) => (
        CarApi(this.props.user.jwt).car.uploadPictures(this.state.car._id, pictures)
            .then(res => {
                this.setState({ car: res.car })
            })
    )

    onDeletePicture = (picId) => (
        CarApi(this.props.user.jwt).car.deletePicture(this.state.car._id, picId)
            .then(res => {
                this.setState({ car: res.car })
            })
    )

    getText = (t) => t

    render() {
        const { car, loading, success, errors } = this.state
        const { schemes } = this.props
        return (
            <Apptemplate>
                {!!errors.global && errors.global && <PageMessage text={errors.global} />}
                {loading &&
                    <LoadingSpinner />
                }
                {!loading && success &&
                    <div>
                        <h1>{car.name}</h1>
                        <Tab menu={{ secondary: true, pointing: true }} panes={[
                            { menuItem: this.getText('Daten'), render: () => <EditCarForm schema={schemes} car={car} submit={this.onSubmit} /> },
                            {
                                menuItem: this.getText('Bilder'), render: () => <div>
                                    <PictureUpload onSubmit={this.onSubmitPicture} pictures={car.pictures} onDeletePicture={this.onDeletePicture} />
                                </div>
                            },
                        ]} />
                    </div>
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
    user: PropTypes.shape({
        jwt: PropTypes.string.isRequired
    }).isRequired
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCar: (id, token) => getCar(id, token),
    loadSchema: (token) => () => (
        CarApi(token).car.schema().then(
            schemaCar => dispatch(schemaLoad("cars", schemaCar))
        )
    ),
    saveCar: (car, token) => save(car, token),
}, dispatch)

const mapStateToProps = ({ schemes, user }) => ({ schemes, user });

export default connect(mapStateToProps, mapDispatchToProps)(ViewCarDetailsPage)