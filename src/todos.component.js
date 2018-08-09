import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TodoList, DoneList } from './lists.component';
import { actions } from './actions';

/**
 * STEP 4A - Mapping all actions (Redux dispatchs) to React props
 * <React props>: <Redux action>
 */
const mapDispatchToProps = {
    addTask: actions.addTask,
    removeTask: actions.removeTask,
    checked: actions.checked,
    removeCompleted: actions.removeCompleted
};

/**
 * STEP 4B - Mapping Redux state to React props
 * Redux state is @state that is default name
 * React prop is @todos that you name it
 * <React props>: <Redux state>
 */
const mapStateToProps = (state) => {
    return {
        todos: state
    };
};

/**
 * STEP 4C - Creating React class component
 */
class TodoApp extends Component {
    handleEnterKey = (e) => {
        const userInput = e.target.value.trim(); // Get data from text input
        if (e.keyCode === 13 && userInput.length > 0) {
            const newItem = {
                id: Date.now(), 
                description: userInput, 
                isDone: false
            };
            this.props.addTask(newItem); // Using actions (Redux dispatch) that have created on step 3 and mapped on step 4A

            e.target.value = ''; // Clear text input
        }
    }

    handleCheck = (itemId, e) => {
        e.preventDefault();
        const checkedItem = { id: itemId };
        this.props.checked(checkedItem);
    }

    handleRemove = (itemId, e) => {
        e.preventDefault();
        const removedItem = { id: itemId };
        this.props.removeTask(removedItem);
    }

    handleClearCompleted = (e) => {
        e.preventDefault();
        this.props.removeCompleted();
    }

    render(){
        // this.props.todos is component state that has mapped on step 4B
        let todoTasks = this.props.todos.filter((item) => !item.isDone);
        let doneTasks = this.props.todos.filter((item) => item.isDone);

        return(
            <div>
                {/* Using for testing purpose - Main state */}
                { console.log('this.props.todos', this.props.todos) }

                <p>To-Do list</p>
                <input onKeyDown={(e)=>this.handleEnterKey(e)}
                    type="text" minLength="1" maxLength="50" placeholder="Enter your task"/>

                <TodoList items={todoTasks} 
                    fnCheck={(itemId, e)=>this.handleCheck(itemId, e)} 
                    fnRemove={(itemId, e)=>this.handleRemove(itemId, e)}/>

                <DoneList items={doneTasks} 
                    fnCheck={(itemId, e)=>this.handleCheck(itemId, e)} 
                    fnRemove={(itemId, e)=>this.handleRemove(itemId, e)} 
                    fnClearCompleted={(e)=>this.handleClearCompleted(e)}/>
            </div>
        );        
    }
};

TodoApp.propTypes = {
    todos: PropTypes.array
}

/**
 * STEP 5 - Creating connection to React class component
 * Creating connection between Redux state and dispatchs with React class component
 */
export const TodoX = connect(mapStateToProps, mapDispatchToProps)(TodoApp);