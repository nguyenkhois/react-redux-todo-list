import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoList extends Component {
    render(){
        let arrTasks = this.props.items;
        if (arrTasks.length > 0)
            return(
                <div>
                    <p>Uncompleted tasks</p>
                    <ul>           
                        {arrTasks.map((item,key)=>{                    
                            return (
                                <li key={key}>
                                    <input type="checkbox" onClick={e=>this.props.fnCheck(item.id, e)}/>
                                    {item.description}
                                    <button type="button" onClick={e=>this.props.fnRemove(item.id,e)}>Remove</button>
                                </li>                    
                            )
                        })}
                    </ul>
                </div>
            )
        return null
    }
};

TodoList.propTypes = {
    items: PropTypes.array,
    fnCheck: PropTypes.func.isRequired,
    fnRemove: PropTypes.func.isRequired
}

export class DoneList extends Component{
    render(){
        let arrTasks = this.props.items;
        if (arrTasks.length > 0)
            return(
                <div>
                <p>Completed tasks</p>
                    <ul>           
                        {arrTasks.map((item,key)=>{                    
                            return (
                                <li key={key}>
                                    <input type="checkbox" onClick={e=>this.props.fnCheck(item.id,e)} defaultChecked/>
                                    <span>{item.description}</span>
                                    <button type="button" onClick={e=>this.props.fnRemove(item.id,e)}>Remove</button>
                                </li>
                            )
                        })}
                    </ul>
                    <button type="button" onClick={e=>this.props.fnClearCompleted(e)}>Clear completed</button>
                </div>                    
            )
        return null
    }
};

DoneList.propTypes = {
    items: PropTypes.array,
    fnCheck: PropTypes.func.isRequired,
    fnRemove: PropTypes.func.isRequired,
    fnClearCompleted: PropTypes.func.isRequired
}