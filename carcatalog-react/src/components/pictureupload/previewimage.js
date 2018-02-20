import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class PreviewImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: props.file,
            href: '#'
        }
    }

    componentDidMount() {
        const reader = new FileReader()
        const { file } = this.props
        reader.onload = (e) => {
            this.setState({ href: e.target.result })
        }
        reader.readAsDataURL(file)
    }

    onDelete = () => {
        this.props.onDelete(this.state.file)
    }

    handleRef = (c) => {
        this.imgRef = c
    }

    render() {
        return (
            <div className="previewImage">
                <img src={this.state.href} ref={this.handleRef} alt="no preview available" />
                <Button icon="trash" onClick={this.onDelete} size="mini" />
            </div>
        )
    }
}

PreviewImage.propTypes = {
    file: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
}


export default PreviewImage