import React, { Component } from 'react';

class TodoList extends Component {
    render() {
        return <tr>
            <td>{this.props.name}</td>
        </tr>
    }
}

export default TodoList;