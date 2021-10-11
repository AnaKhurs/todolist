import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";



export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks_1: TaskType = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" />
            <Todolist title="Songs"/>
            <Todolist title="Books"/>
        </div>
    );
}


export default App;
