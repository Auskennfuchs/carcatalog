import React from 'react';
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PageMessage = ({ text, header }) => (
    <Message negative>
        {!!header && <Message.Header>{header}</Message.Header>}
        {text}
    </Message>
)

PageMessage.propTypes = {
    text: PropTypes.string.isRequired,
    header: PropTypes.string    
}

PageMessage.defaultProps = {
    header: null
}

export default PageMessage