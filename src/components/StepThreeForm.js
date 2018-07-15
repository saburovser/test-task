import React from 'react';
import Files from 'react-files';
import download from 'downloadjs'
import ErrorModal from './ErrorModal';
import StepSelector from './StepSelector';
import { connect } from 'react-redux';
import { submitThirdForm, nextForm, prevForm } from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


class StepThreeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: props.file ? props.file : null,
            isLoading: false,
            fileLoaded: props.fileLoaded ? props.fileLoaded : false,
            error: '',
        };
    };

    componentDidUpdate() {
        if (this.state.file && !this.state.fileLoaded) {
            let data = new FormData();
            data.append('file', this.state.file);
            fetch('http://127.0.0.1:5000/uploadfile', { method: 'POST', body: data })
                .then(res => res.text())
                .then(text => console.log(text))
                .then(() => this.setState({ fileLoaded: true, isLoading: false }))
                .catch(() => this.setState({ file: null }));
        };
    };

    stepBack = () => {
        if (!this.state.isLoading) {
            this.props.dispatch(submitThirdForm(this.state))
            this.props.dispatch(prevForm());
        } else {
            this.setState({ error: this.state.isLoading ? 'Дождитесь окончания загрузки' : 'Загрузите файл, чтобы продолжить'})
        };
        
    };

    stepForward = () => {
        if (this.state.fileLoaded) {
            this.props.dispatch(submitThirdForm(this.state))
            this.props.dispatch(nextForm());
        } else {
            this.setState({ error: this.state.isLoading ? 'Дождитесь окончания загрузки' : 'Загрузите файл, чтобы продолжить'})
        }
    };

    onFilesChange = (files) => {
        if (files.length !== 0) {
            this.setState({ file: files[0], isLoading: true })
        }
    };

    onFileRemove = () => {
        this.setState({ fileLoaded: false, file: null })
        this.refs.files.removeFiles();
    };

    onError = () => {
        this.setState({ error: 'Файл не загружен, попробуйте ещё раз' })
    };

    onFilesError = () => {
        this.setState({ error: 'Недопустимый тип файла' })
    };

    downloadFile = () => {
        fetch('http://127.0.0.1:5000/getfile')
	        .then(res => res.blob())
	        .then(blob => download(blob))
    };

    onModalClose = () => {
        this.setState({ error: '' });
    };

    render() {
        return (
            <div className="APP">
                {this.props.step !==4 && <h1>Заявка на оформление полиса ДМС</h1>}
                <div className="FORM">
                    <div className="FORM__BIGITEM">
                        <p>Скачать заявление</p>
                        <button
                            onClick={this.downloadFile}
                            disabled={this.props.step === 4}
                        >
                            <FontAwesomeIcon 
                                icon={faDownload}
                                size="2x"
                            />
                        </button>
                    </div>
                    <div className="FORM__BIGITEM">
                        {!this.state.fileLoaded && <p>Загрузите скан или фото заявления с вашей подписью</p>}
                        {!this.state.fileLoaded && !this.state.isLoading && <Files
                            ref='files'
                            onChange={this.onFilesChange}
                            onError={this.onFilesError}
                            accepts={['image/png', 'image/jpeg', 'image/tiff', 'application/pdf']}
                            maxFiles={1}
                            maxFileSize={5242880}
                            minFileSize={0}
                            clickable
                        >
                            <FontAwesomeIcon 
                                icon={faUpload}
                                size="2x"
                            />
                        </Files>}
                        {this.state.isLoading &&
                            <FontAwesomeIcon 
                                icon={faSpinner}
                                spin
                                size="2x"
                            />
                        }
                        {this.state.fileLoaded && <p>{this.state.file.name}</p>}
                        {this.state.fileLoaded && this.props.step !== 4 && <button
                                onClick={this.onFileRemove}
                        >
                            <FontAwesomeIcon 
                                icon={faTimesCircle}
                                size="2x"
                            />
                        </button>}
                    </div>
                </div>
                {this.props.step !== 4 && <StepSelector 
                    stepBack={this.stepBack}
                    stepForward={this.stepForward}
                />}
                <ErrorModal
                    error={this.state.error}
                    onModalClose={this.onModalClose}
                />
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