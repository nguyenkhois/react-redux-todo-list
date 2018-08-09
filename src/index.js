import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import css from './styles.css';
import { userReducer } from './reducer';
import { App } from './app';

/**
 * STEP 0 - STRUCTURES
 * 1/ The main STATE object that is an object array
 * let state = [{task1}, {task2}, {task3}, {taskn}];
 * 
 * 2/ The ACTION object must has @type property
 * let action = {
 *      type: 'YOUR_TYPE',
 *      task: { id: <task_id>,
 *              description: <task_description>,
 *              isDone: <task_status:true/false> }
 * }
 * 
 * 3/ A task is an object that is an action object property
 * let task = { id: <task_id>,
 *              description: <task_description>,
 *              isDone: <task_status:true/false> }
 */


/**
 * STEP 2 - Creating store
 * View more about createStore() here:
 * https://redux.js.org/api/createstore
 * Tip! View again step 0 to know about @state structure
 */
const preloadedState = []; // Initial main state value (Redux state)
const store = createStore(userReducer, 
                            preloadedState,
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * STEP 6 - Rendering
 */
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
