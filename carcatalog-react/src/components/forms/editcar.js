import React, { Component } from 'react';
import { Form, Button } from "semantic-ui-react";
import PropTypes from 'prop-types'

import { Block } from '../elements/block'

class EditCarForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            car: props.car
        }
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
        this.props.submit(this.state.car)
    }

    /*    onChangePS = (e) => {
            const newPS = e.target.value
            const newKw = Math.round(newPS * 0.735499)
    
            this.setState({
                data: { ...this.state.data, powerKW: newKw, powerPS: newPS }
            })
        }
        onChangeKW = (e) => {
            const newKw = e.target.value
            const newPS = Math.round(newKw * 1.35962)
    
            this.setState({
                data: { ...this.state.data, powerKW: newKw, powerPS: newPS }
            })
        }
    */

    render() {
        const { car } = this.state
        const { schema } = this.props
        return (
            <Form onSubmit={this.onSubmit}>
                {Object.keys(schema.grouping).map(key =>
                    <Block className="blockGrid" key={key}
                        headerText={schema.grouping[key].name}
                        groupFields={schema.grouping[key].fields}
                        fields={schema.schema} data={car}
                        onChange={this.onChange}
                    />
                )}
                <Button primary>Save</Button>
            </Form>
        )
    }
}

EditCarForm.propTypes = {
    submit: PropTypes.func.isRequired,
    schema: PropTypes.shape({
        grouping: PropTypes.object.isRequired,
        schema: PropTypes.array.isRequired,
    }).isRequired,
    car: PropTypes.object.isRequired,
}

export default EditCarForm