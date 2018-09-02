class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this); 
        this.handleDeleteOption=this.handleDeleteOption.bind(this); 
        this.handlePick=this.handlePick.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state={
            options: []
        }; 
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options'); 
            const options = JSON.parse(json);
            
            if (options){
                this.setState(() => ({options}));
            }
        } catch (e){
            //Do nothing
        }
       
    }   
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json =JSON.stringify( this.state.options); 
            localStorage.setItem('options', json)
            console.log('saving data!');
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount!');

    }
    handleDeleteOption(option){
        this.setState((prev) => ({
            options: prev.options.filter((opt) => option!==opt)
        }));
    }
    handleDeleteOptions(){
        this.setState(() => ({options: []}));
    }
   /*
    handleDeleteOptions(){
        this.setState(() => {
            return{
                options: []
            };
        });
    }
    */
    handlePick(){
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        alert(option); 

    }
    handleAddOption(option){
        if(!option){
            return 'Invalid value';
        } else if (this.state.options.indexOf(option) > -1){
            return 'Item already exits. Try again!'
        }   
        this.setState((prev) => ({options: prev.options.concat(option)}));    
    }   
    render () {
        const subTitle = 'Put your life in the hands of a computer';
        return(
            <div>
                <Header subTitle={subTitle} />
                <Action
                handlePick={this.handlePick}
                 hasOption={this.state.options.length > 0} />
                <Options
                 options={this.state.options}
                 handleDeleteOptions={this.handleDeleteOptions}
                 handleDeleteOption={this.handleDeleteOption}
                 />
                <AddOption
                 handleAddOption={this.handleAddOption} />
            </div>
        )
    }
}


const Header= (props) =>{
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
   );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return(
        <div>
            <button
             disabled={!props.hasOption}
             onClick={props.handlePick}
             >
             What should I do?</button>
        </div>
    );
};


const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                     key={option}
                     optionText={option}
                     handleDeleteOption={props.handleDeleteOption} />))
            }
        </div>
    );
};

const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}
            >
            Remove</button>
        </div>
    );
};


class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e){
        e.preventDefault(); //preventing the whole page refreshing
        const option = e.target.elements.option.value.trim(); //trim deletes spaces before the sentence 
        const error = this.props.handleAddOption(option);
        this.setState(() => ({error})); //identical to error: error
        if (!error){
            e.target.elements.option.value = ''; 

        }
        
    };
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));