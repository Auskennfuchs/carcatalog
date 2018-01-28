import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

import Apptemplate from '../apptemplate'
import { getCar, save } from '../../actions/edit'
import PageMessage from '../messages/PageMessage';

import CarApi from './../../api'
import { schemaLoad } from './../../actions/schema'

import { Block } from '../block'

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
        this.props.loadSchema().then(carSchema =>
            this.setState({ schemes: carSchema.schema })
        )
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

    onChange = (e, target) => {
        const car = { ...this.state.car }
        const parts = target.name.split('.')
        let schemaPointer = car
        for (let i = 0; i < parts.length - 1; i += 1) {
            const elem = parts[i]
            if (!schemaPointer[elem]) {
                schemaPointer[elem] = {}
            }
            schemaPointer = schemaPointer[elem]
        }
        schemaPointer[parts[parts.length - 1]] = target.value
        this.setState({
            car
        })
    }

    onSubmit = () => {
        this.props.saveCar(this.state.car)
    }

    render() {
        const { car, loading, success, errors } = this.state
        const { schemes } = this.props
        return (
            <Apptemplate>
                {errors.global && <PageMessage text={errors.global} />}
                {loading &&
                    <div>Loading</div>
                }
                {!loading && success &&
                    <Form onSubmit={this.onSubmit}>
                        <h1>{car.name}</h1>
                        {Object.keys(schemes.grouping).map(key =>
                            <Block className="blockGrid" key={key}
                                headerText={schemes.grouping[key].name}
                                groupFields={schemes.grouping[key].fields}
                                fields={schemes.schema} data={car}
                                onChange={this.onChange}
                            />
                        )}
                        <Button primary>Save</Button>
                    </Form>
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