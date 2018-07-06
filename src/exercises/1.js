console.log('exercise-1 app is running!');

class VisibilityToggle extends React.Component {
    
    render() {
        const title = 'Visibility Toggle';
        return (
            <div>
                <Header title={title} />
                <Toggler /> 
            </div>
        ); 
    };
};

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    };
};

class Toggler extends React.Component {
    constructor(props) {
        super(props);
        this.toggleText = this.toggleText.bind(this);
        this.state = {
            isVisible: false,
        }
    }
    
    toggleText() {
        this.setState((prevState) => {
            return {
                isVisible: !prevState.isVisible,
            };
        });
    }
    
    render () {
        
        return (
            <div>
                <button onClick={this.toggleText}>{this.state.isVisible ? 'Hide Text' : 'Show Text'}</button>
                {this.state.isVisible && <ToggledText />}
            </div>
        );
    }
};

class ToggledText extends React.Component {
    render() {
        return (
            <div>
                <p>HIDDEN KNOWLEDGE IS RIGHT IN FRONT OF YOU</p>
            </div>
        );
    }
};



ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));