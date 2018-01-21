import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAll } from '../../actions/edit'
import Header from '../header'

const CarListRow = ({ car, history }) => (
    <Table.Row key={car._id} onClick={() => { history.push("/cars/" + car._id) }}>
        <Table.Cell>
            {car.name}
        </Table.Cell>
        <Table.Cell>
            {car.manufacture}
        </Table.Cell>
        <Table.Cell>
            {car.hsn}/{car.tsn}
        </Table.Cell>
        <Table.Cell>
            {car.engine.powerPS}
        </Table.Cell>
    </Table.Row>
)

class ViewCarListPage extends Component {
    state = {
        cars: []
    }

    componentDidMount() {
        this.searchCars.bind(this)
    }

    searchCars() {
        this.props.fetchCars()
            .then(cars => {
                this.setState({
                    cars
                })
            })
    }

    render() {
        const { cars } = this.state
        return (
            <div>
                <Header/>
                <div className="ui main text container">
                    <h1>Fahrzeuge</h1>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell collapsing>Name</Table.HeaderCell>
                                <Table.HeaderCell collapsing>Hersteller</Table.HeaderCell>
                                <Table.HeaderCell collapsing>HSN/TSN</Table.HeaderCell>
                                <Table.HeaderCell collapsing>PS</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {cars.length > 0 &&
                                cars.map(car => (
                                    <CarListRow car={car} key={car._id} history={this.props.history} />
                                ))
                            }
                        </Table.Body>
                    </Table>
                    <Button onClick={() => this.searchCars()}>Suchen</Button>
                </div>
            </div>
        );
    }
}

ViewCarListPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    fetchCars: PropTypes.func.isRequired
}


export default connect(null, { fetchCars: fetchAll })(ViewCarListPage)