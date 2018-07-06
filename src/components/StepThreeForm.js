import React from 'react';
import Files from 'react-files';
import download from 'downloadjs'
import StepSelector from './StepSelector';
import { connect } from 'react-redux';
import { submitThirdForm, nextForm, prevForm } from '../actions/actions';

class StepThreeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: props.file ? props.file : null,
            isLoading: false,
            fileLoaded: props.fileLoaded ? props.fileLoaded : false
        };
    };

    componentDidUpdate() {
        if (this.state.file && !this.state.fileLoaded) {
            let data = new FormData();
            data.append('file', this.state.file)
            fetch('http://127.0.0.1:5000/uploadfile', { method: 'POST', body: data })
                .then(res => res.text())
                .then(text => console.log(text))
                .then(() => this.setState({ fileLoaded: true, isLoading: false }))
                .catch(() => this.setState({ file: null }));
        }
    };

    stepBack = () => {
        if (!this.state.isLoading) {
            this.props.dispatch(submitThirdForm(this.state))
            this.props.dispatch(prevForm());
        } else {
            //modal alert (wait for upload finishing)
        }
        
    };

    stepForward = () => {
        if (this.state.fileLoaded) {
            this.props.dispatch(submitThirdForm(this.state))
            this.props.dispatch(nextForm());
        } else {
            //modal alert
        }
    };

    onFilesChange = (files) => {
        
        if (files.length !== 0) {
            this.setState({ file: files[0], isLoading: true })
        }
    };

    onFileRemove = () => {
        this.setState({ file: null, fileLoaded: false })
        this.refs.files.removeFiles();
    };

    onError = () => {
        //modal alert(file upload failed! try again)
    };

    downloadFile = () => {
        fetch('http://127.0.0.1:5000/getfile')
	        .then(res => res.blob())
	        .then(blob => download(blob))
    }

    render() {
        return (
            <div>
                <p>This if the Third Form</p>
                {this.props.step !==4 && 
                <div>
                    <button onClick={this.downloadFile}>Download a file</button>
                    <Files
                        ref='files'
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={['image/png', 'image/jpeg', 'image/tiff', 'application/pdf']}
                        maxFiles={1}
                        maxFileSize={5242880}
                        minFileSize={0}
                        clickable
                    >
                        Drop files here or click to upload
                    </Files>
                </div>}
                {this.state.isLoading &&<img src="/images/loading.gif" height="50px" width="50px"/>}
                {(this.state.fileLoaded || this.props.step === 4) && <p>{this.state.file.name || this.props.thirdFormState.file.name}</p>}
                {this.state.fileLoaded && <button
                    onClick={this.onFileRemove}
                >X</button>}
                {this.props.step !== 4 && <StepSelector 
                    stepBack={this.stepBack}
                    stepForward={this.stepForward}
                />}
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    return {
        step: state.step,
        ...state.thirdFormState
    };
};

export default connect(mapStateToProps)(StepThreeForm);