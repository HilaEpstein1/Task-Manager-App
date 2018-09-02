console.log('App.js is running!');

// JSX JavaScript XML

const App ={
    title: 'Indesicion App',
    subTitle: 'My subtitle',
    options: []
};

const onFormSubmit = (e) =>{
    e.preventDefault(); //preventing the whole page refreshing
    
    const option = e.target.elements.option.value; //this is how we get to the input of the user 

    if (option){
        App.options.push(option);
        e.target.elements.option.value= '';
        appRender();
    }
};

const removeAll =() =>{
    App.options=[];
    appRender();
};

const onMakeDesicion = () =>{
    const randomNumber = Math.floor(Math.random() * App.options.length);
    const option = App.options[randomNumber];
    alert(option); 
};

const appRoot = document.getElementById('app');

const appRender =() =>{
//we dont call onFormSubmit() because its return value is undefined
    const template = (
        <div>
            <h1>{App.title}</h1>
            {App.subTitle&& <p>{App.subTitle}</p>}
            <p>{App.options.length > 0?'Here are your options: ' : 'No options'}</p>
            <button disabled={App.options.length === 0} onClick={onMakeDesicion}>What Should I Do?</button> 
                <ol>        
                    {App.options.map((opt) => {
                       return <li key={opt}> Item one: {opt}</li>;
                    })}
                </ol>
                <button onClick={removeAll}>Remove All</button>
                <form onSubmit={onFormSubmit}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
        </div>
    );
    ReactDOM.render(template, appRoot); 
};

appRender();