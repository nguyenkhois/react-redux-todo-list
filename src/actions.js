/**
 * STEP 2 - Creating actions for Redux dispatchs
 * View again step 0 to know about @action structure
 * An @action must has @type
 * Tip! View again step 0 to know about @action structure
 */

export const actions = {
    addTask: (item) => ({ type: 'ADD_TASK', task: item }),
    removeTask: (item) => ({ type: 'REMOVE_TASK', task: item }),
    checked: (item) => ({ type: 'CHECKED', task: item }),
    removeCompleted: () => ({ type: 'REMOVE_COMPLETED' })
};
