import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class CarPicture extends Component {

    onDelete = () => {
        this.props.onDelete(this.props.picId)
    }

    handleRef = (c) => {
        this.imgRef = c
    }

    render() {
        return (
            <div className="previewImage">        
                <img src={"http://localhost:3000/picture/".concat(this.props.picId)} ref={this.handleRef} alt="no preview available" />
                <Button icon="trash" onClick={this.onDelete} size="mini" />
            </div>
        )
    }
}

CarPicture.propTypes = {
    picId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}


export default CarPicture