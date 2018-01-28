import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'


const InlineError = ({ text, pointer }) => (
    <Label pointing={pointer} color="red" basic>{text}</Label>
)

InlineError.propTypes = {
    text: PropTypes.string.isRequired,
    pointer: PropTypes.bool
}

InlineError.defaultProps = {
    pointer: false
}

export default InlineError