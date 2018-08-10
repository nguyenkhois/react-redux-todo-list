/**
 * STEP 1 - Creating reducer
 * Input: @state, @action 
 * Output: a new @state
 * Tip! View again step 0 to know about @state and @action structures
 */
export let userReducer = (state, action) => {
    switch (action.type){
        case 'ADD_TASK':
            return state.concat(action.task);
        case 'REMOVE_TASK':
            return state.filter((item) => item.id !== action.task.id);
        case 'CHECKED':
            const itemIndex = state.findIndex((item) => item.id === action.task.id);
            const newState = state.map((item, index) => index === itemIndex ? {...item, isDone: !item.isDone} : item);
            return newState;
        case 'REMOVE_COMPLETED':
            return state.filter((item) => !item.isDone);
        default:
            return state;
    }
};