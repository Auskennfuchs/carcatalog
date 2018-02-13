import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { normalize } from "normalizr"
import { fetchAll } from '../../actions/edit'
import { CarListSchema } from '../../model/gridcar'
import AppTemplate from '../apptemplate'

const get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const CarListRow = ({ car, onRowClick }) => (
    <Table.Row key={car._id} onClick={() => onRowClick(car._id)} >
        <Table.Cell>
            {get(['name'], car)}
        </Table.Cell>
        <Table.Cell>
            {get(['manufacture'], car)}
        </Table.Cell>
        <Table.Cell>
            {get(['codes', 'kba', 'hsn'], car)}/{get(['codes', 'kba', 'tsn'], car)}
        </Table.Cell>
        <Table.Cell>
            {get(['engine', 'power', 'ps'], car)}
        </Table.Cell>
    </Table.Row>
)

CarListRow.propTypes = {
    onRowClick: PropTypes.func.isRequired,
    car: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        manufacture: PropTypes.string.isRequired,
        codes: PropTypes.shape({
            kba: PropTypes.shape({
                hsn: PropTypes.string.isRequired,
                tsn: PropTypes.string.isRequired,
            }),
        }),
        engine: PropTypes.shape({
            power: PropTypes.shape({
                PS: PropTypes.number.isRequired
            }),
        }).isRequired
    }).isRequired
}

CarListRow.defaultProps = {
    car: {
        codes: {
            hsn: '',
            tsn: '',
        }
    }
}

class ViewCarListPage extends Component {
    state = {
        cars: {}
    }

    componentDidMount() {
        this.searchCars.bind(this)
    }

    onRowClick = (id) => {
        this.props.history.push("/cars/" + id)
    }

    searchCars = () => {
        this.props.fetchCars(this.props.user.jwt)
            .then(cars => {
                this.setState({
                    cars: normalize(cars.cars, CarListSchema).entities.cars
                })
            })
    }

    render() {
        const { cars } = this.state
        return (
            <AppTemplate>
                <div className="ui main text">
                    <h1>Fahrzeuge</h1>
                    <Table celled selectable size="small">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell collapsing>Name</Table.HeaderCell>
                                <Table.HeaderCell collapsing>Hersteller</Table.HeaderCell>
                                <Table.HeaderCell collapsing>HSN/TSN</Table.HeaderCell>
                                <Table.HeaderCell collapsing>PS</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.keys(cars).map((id) => (
                                <CarListRow car={cars[id]} key={id} onRowClick={this.onRowClick} />
                            ))}
                        </Table.Body>
                    </Table>
                    <Button onClick={() => this.searchCars()}>Suchen</Button>
                </div>
            </AppTemplate>
        );
    }
}

ViewCarListPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    fetchCars: PropTypes.func.isRequired
}

const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps, { fetchCars: fetchAll })(ViewCarListPage)