import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "HTML", isDone: false},
    ]
    const tasks2 = [
        {id: 1, title: "Lalala", isDone: true},
        {id: 2, title: "Hi", isDone: false},
        {id: 3, title: "Yoyo", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Songs" tasks={tasks2}/>
        </div>
    );
}


export default App;
