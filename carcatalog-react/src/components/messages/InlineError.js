import React from 'react'
import PropTypes from 'prop-types'
import {Label} from 'semantic-ui-react'


const InlineError = ({text}) => (
    <Label pointing color="red" basic>{text}</Label>
)

InlineError.propTypes = {
    text: PropTypes.string.isRequired
}

export default InlineError