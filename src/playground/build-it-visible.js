class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);
        this.handleVisibilityToggle=this.handleVisibilityToggle.bind(this);
        this.state = {
            show: false
        }
    }

    handleVisibilityToggle(){
        this.setState((prev)=>{
            return{
                show: !(prev.show)
            };
        });
    }
    render(){
        return(
            <div>
                <button onClick={this.handleVisibilityToggle}>{this.state.show? 'hide' : 'show details'}</button>
                {this.state.show && <p>Here you can see the details</p>}
            </div>
        )
    }

}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));


/*

const appRoot = document.getElementById('app');

let show=false;

const onShow = () =>{
    show = !show;
    render();
};

const render =() => {
    const template =(
        <div>
            <h1>Visibility</h1>
            <button onClick={(onShow)}>{show? 'hide' : 'show details'}</button>
            {show && <p>Here you can see the details</p>}
        </div>
    );
    ReactDOM.render(template, appRoot);
};

render();
*/