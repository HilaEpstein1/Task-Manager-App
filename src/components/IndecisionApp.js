import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleDeleteOption = (option) => {
        this.setState((prev) => ({
            options: prev.options.filter((opt) => option!==opt)
        }));
    };
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };
   
    handlePick = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => ({selectedOption: option}));

    };
    handleAddOption = (option) => {
        if(!option){
            return 'Invalid value';
        } else if (this.state.options.indexOf(option) > -1){
            return 'Item already exits. Try again!'
        }   
        this.setState((prev) => ({options: prev.options.concat(option)}));    
    }; 
    handleClearSelectedOption =() => {
        this.setState(() => ({selectedOption: undefined}));
    };

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
    render () {
        const subTitle = 'Choose the next task for today!';
        return(
            <div>
                <Header subTitle={subTitle} />
                <div className="container">
                    <Action
                    handlePick={this.handlePick}
                    hasOption={this.state.options.length > 0} />
                    <div className="widget">  
                        <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                        handleAddOption={this.handleAddOption} />
                    </div>
                </div>
               
                 <OptionModal
                  selectedOption={this.state.selectedOption}
                  handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        )
    }
}
