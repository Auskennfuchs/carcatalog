import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class CarPicture extends Component {

    static propTypes = {
        picId: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
        onMouseDown: PropTypes.func,
    }

    static defaultProps = {
        onMouseDown: () => { }
    }

    onDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onDelete(this.props.picId)
    }

    onMouseDown = (e) => {
        e.target = this.imgRef
        this.props.onMouseDown(e, this.props.picId)
    }

    handleRef = (c) => {
        this.imgRef = c
    }

    render() {
        return (
            <div className="previewImage" onMouseDown={this.onMouseDown} role="presentation" ref={this.handleRef}>
                <img src={process.env.REACT_APP_URL_PICTUREAPI.concat("/picture/").concat(this.props.picId)} alt="no preview available" />
                <Button icon="trash" onClick={this.onDelete} size="mini" />
            </div>
        )
    }
}

export default CarPicture