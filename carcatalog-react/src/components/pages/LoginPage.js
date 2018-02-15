import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import '../../styles/login.css'

import LoginForm from '../forms/login'
import { loggedIn } from '../../actions/login'

import UserAPI from '../../api'

class LoginPage extends Component {
    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/cars")
        }
    }

    submit = (data) => (
        this.props.login(data).then(() => this.props.history.push("/cars"))
    )

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
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    login: (credentials) => (
        UserAPI({}).user.login({ email: credentials.loginId, password: credentials.password })
            .then(user => {
                dispatch(loggedIn(user))
                document.cookie = "jwt=".concat(user.jwt).concat(";path=/")
            })
    )
})

const mapStateToProps = ({
    user
}) => ({
    isAuthenticated: !!user.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)