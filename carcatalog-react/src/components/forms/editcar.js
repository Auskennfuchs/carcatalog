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
        const parts = target.name.split('.')
        let fieldName = ""
        for (let i = 0; i < parts.length; i += 1) {
            fieldName = fieldName.concat(parts[i].charAt(0).toUpperCase() + parts[i].slice(1))
        }
        if (this.hasOwnProperty("onChange".concat(fieldName))) {
            this["onChange".concat(fieldName)](e, target)
        }
        this._updateStateCar(target.name, target.value)
    }

    onSubmit = () => {
        this.props.submit(this.state.car)
    }

    onChangeEnginePowerPs = (e, target) => {
        const newPS = target.value
        const newKw = Math.round(newPS * 0.735499)

        this._updateStateCar("engine.power.kw", newKw)
    }
    onChangeEnginePowerKw = (e, target) => {
        const newKw = target.value
        const newPS = Math.round(newKw * 1.35962)

        this._updateStateCar("engine.power.ps", newPS)
    }

    _updateStateCar = (fieldName, value) => {
        const car = { ...this.state.car }
        const parts = fieldName.split('.')
        let schemaPointer = car
        for (let i = 0; i < parts.length - 1; i += 1) {
            const elem = parts[i]
            if (!schemaPointer[elem]) {
                schemaPointer[elem] = {}
            }
            schemaPointer = schemaPointer[elem]
        }
        schemaPointer[parts[parts.length - 1]] = value
        this.setState({
            car
        })
    }

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