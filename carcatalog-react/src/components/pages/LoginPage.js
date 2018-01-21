import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import '../../styles/login.css'

import LoginForm from '../forms/login'
import { loggedIn } from '../../actions/login'

class LoginPage extends Component {

    submit = (data) => {
        this.props.login(data).then(() => this.props.history.push("/cars"))
        .catch(()=>{})
    }

    render() {
        return (
            <div className="loginbackground">
                <div className="logincontainer">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <div className="textcontainer">
                                    <h1>Don't have an account?</h1>
                                    <p>Register a new account for more awsomeness</p>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <div className="textcontainer">
                                    <h1>Have an account?</h1>
                                    <p>Login using your credentials</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div className="signupcontainer">
                        <h1>Login</h1>
                        <LoginForm submit={this.submit} />
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

const mapDispatchToProps = (dispatch) => ({
    login: (credentials) => {
        if (credentials.loginId === "123") {
            return Promise.resolve(dispatch(loggedIn({ name: "icke", email: "hier@da.de" })))
        }
        return Promise.reject("credentials invalid")
    }
})

export default connect(null, mapDispatchToProps)(LoginPage)