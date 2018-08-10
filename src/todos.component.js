import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TodoList, DoneList } from './lists.component';
import { actions } from './actions';

/**
 * STEP 3A - Creating React component props from actions by using a mapping function
 * <reactProps>: you name it whatever name you want
 * <reduxAction>: you have created them on step 2
 * const mapDispatchToProps = {
 *      <reactProps>: <reduxAction>
 * };
 */
const mapDispatchToProps = {
    addTask: actions.addTask,
    removeTask: actions.removeTask,
    checked: actions.checked,
    removeCompleted: actions.removeCompleted
};

/**
 * STEP 3B - Creating React component props that used like component state
 *           from Redux state by using a mapping function
 * @state is Redux state (default)
 * @todos is React component props that you name it by yourself
 * const mapStateToProps = (state) => {
 *      return {
 *          <reactProps>: <reduxState>
 *      };
 * };
 */
const mapStateToProps = (state) => {
    return {
        todos: state
    };
};

/**
 * STEP 3C - Creating React class component with its props that were created on above steps
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

            // Dispatch Redux actions that have created on step 2 and mapped on step 3A
            this.props.addTask(newItem);

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
 * STEP 4 - Creating a container component by using connect() function from Redux 
 */
export const TodoX = connect(mapStateToProps, mapDispatchToProps)(TodoApp);