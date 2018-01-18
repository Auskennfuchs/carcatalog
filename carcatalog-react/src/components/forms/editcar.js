import React, { Component } from 'react';
import { Form, Button, Input } from "semantic-ui-react";
import PropTypes from 'prop-types'

class EditCarForm extends Component {
    state = {
        data: {
            name: "",
            manufacture: "",
            hsn: "",
            tsn: "",
            powerPS: 0,
            powerKW: 0
        }
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    })

    onSubmit = () => {
        this.props.submit(this.state.data)
    }

    onChangePS = (e) => {
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

    render() {
        const formData = this.state.data
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label htmlFor="name">Typbezeichnung</label>
                    <input type="text" id="name" name="name" placeholder="Name" onChange={this.onChange} value={formData.name||''} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="manufacture">Fabrikat</label>
                    <input type="text" id="manufacture" name="manufacture" placeholder="Hersteller" onChange={this.onChange} value={formData.manufacture||''} />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label htmlFor="hsn">HSN</label>
                        <input type="text" id="hsn" name="hsn" onChange={this.onChange} value={formData.hsn||''} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="tsn">TSN</label>
                        <input type="text" id="tsn" name="tsn" onChange={this.onChange} value={formData.tsn||''} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label htmlFor="powerPS" >Leistung</label>
                        <Input
                            label={{ content: "PS" }}
                            labelPosition="right"
                            placeholder="PS"
                            name="powerPS" id="powerPS"
                            type="text"
                            onChange={this.onChangePS}
                            value={formData.powerPS||''}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="powerKW">&nbsp;</label>
                        <Input
                            label={{ content: "kW" }}
                            labelPosition="right"
                            placeholder="KW"
                            name="powerKW" id="powerKW"
                            type="text"
                            onChange={this.onChangeKW}
                            value={formData.powerKW||''}
                        />
                    </Form.Field>
                </Form.Group>
                <Button primary>Speichern</Button>
            </Form>
        )
    }
}

EditCarForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default EditCarForm