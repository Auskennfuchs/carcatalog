import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import InlineError from '../messages/InlineError'

class LoginForm extends Component {

    state = {
        data: {
            loginId: "",
            password: ""
        },
        errors: {}
    }

    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
        }
    }

    validate = (data) => {
        const errors = {}
        if (!data.loginId) {
            errors.loginId = "Bitte geben Sie den Login an"
        }
        if (!data.password) {
            errors.password = "Bitte geben Sie ein Passwort an"
        }
        return errors
    }

    render() {
        const { errors } = this.state
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label htmlFor="loginId">Login</label>
                    <Input icon="user" type="text" id="loginId" name="loginId" onChange={this.onChange} />
                    {errors.loginId && <InlineError text={errors.loginId} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Passwort</label>
                    <Input icon="key" type="password" id="password" name="password" onChange={this.onChange} />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary floated="right">Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm