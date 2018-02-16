import React, { Component } from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class PreviewImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: props.file
        }
    }

    handleRef = (c) => {
        this.imgRef = c
    }

    onDelete = (e) => {
        this.props.onDelete(this.state.file)
    }

    render() {
        const reader = new FileReader()
        const $this = this
        const { file } = this.props
        reader.onload = (e) => {
            $this.imgRef.src = e.target.result
        }
        reader.readAsDataURL(file)
        return (
            <div className="previewImage">
                <img src="#" ref={this.handleRef} alt="no preview available" />
                <Button icon="trash" onClick={this.onDelete} size="mini" />
            </div>
        )
    }
}

PreviewImage.propTypes = {
    file: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
}

let lastId = 0
function newId(prefix = 'id') {
    lastId++;
    return `${prefix}${lastId}`;
}

class PictureUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasAdvancedUpload: false,
            uploading: false,
            sucess: false,
            previewFiles: [],
            dragOver: false,
        }
        this.id = newId('pictureUpload')
    }

    componentDidMount() {
        const div = document.createElement('div');
        const advancedUpload = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
        this.setState({ hasAdvancedUpload: advancedUpload })
    }

    submit = (e) => {
        this.props.onSubmit(this.state.previewFiles)
            .then(() => {
                this.setState({ previewFiles: [] })
            })
    }

    onChange = (e, target) => {
        const { previewFiles } = this.state
        this.setState({ previewFiles: this.addFiles(e.target.files, previewFiles) })
    }

    handleRef = (c) => {
        this.inputRef = c
    }

    onDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!this.state.dragOver) {
            this.setState({ dragOver: true })
        }
    }

    onDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (this.state.dragOver) {
            this.setState({ dragOver: false })
        }
    }

    getFileExtension = (fileName) => {
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(fileName)[1]
        if (ext !== undefined) {
            return ".".concat(ext.toLowerCase())
        }
        return undefined
    }

    addFiles = (files, fileList) => {
        const acceptedExtensions = this.props.accept.split(',')

        for (let i = 0; i < files.length; i++) {
            const fileExt = this.getFileExtension(files[i].name)
            if (acceptedExtensions.length === 0 || acceptedExtensions.find(ext => ext === fileExt)) {
                fileList.push(files[i])
            }
        }
        return fileList
    }

    onDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let { previewFiles } = this.state
        const files = e.dataTransfer.files

        this.setState({ dragOver: false, previewFiles: this.addFiles(files, previewFiles) })
    }

    onDeleteFile = (file) => {
        const { previewFiles } = this.state
        this.setState({ previewFiles: previewFiles.filter(f => f !== file) })
    }

    render() {
        const { hasAdvancedUpload, uploading, success, previewFiles, dragOver } = this.state
        const { accept } = this.props
        return (
            <div>
                <Form encType="multipart/form-data" className={"box"
                    .concat(hasAdvancedUpload ? " has-advanced-upload" : "")
                    .concat(dragOver ? " is-dragover" : "")}
                    onSubmit={this.submit}
                    onDragEnter={this.onDragEnter} onDragOver={this.onDragEnter}
                    onDragLeave={this.onDragLeave} onDragEnd={this.onDragLeave}
                    onDrop={this.onDrop}
                >
                    <div className="box__input">
                        <Icon name="upload" className="box__icon" />
                        <input type="file" id={this.id} name="files[]" multiple className="box__file" ref={this.handleRef} onChange={this.onChange}
                            accept={accept} />
                        <label htmlFor={this.id}><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
                        <Button primary className="box__button">Upload</Button>
                    </div>
                    {uploading && <div className="box__uploading">Uploading&hellip;</div>}
                    {success && <div className="box__success">Done!</div>}
                    <div className="box__error">Error! <span></span>.</div>
                </Form>
                {previewFiles.length > 0 && previewFiles.map(file => <PreviewImage file={file} key={"prevImg".concat(file.name)} onDelete={this.onDeleteFile} />)}
            </div>
        )
    }
}

PictureUpload.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    accept: PropTypes.string
}

PictureUpload.defaultProps = {
    accept: '.gif,.jpg,.jpeg,.png'
}

export default PictureUpload