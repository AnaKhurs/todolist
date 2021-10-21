import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'


//C-R-UD
//CLI -> GUI -> UI

function App() {


    const [filter, setFilter] = React.useState<FilterValueType>("all")

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "Redux", isDone: false},
        {id: 4, title: "React", isDone: false}
    ])

    //BLL
    /*    let tasks = [
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "Redux", isDone: false},
            {id: 4, title: "React", isDone: false}
        ]*/

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        //return undefined
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    /* const tasks2 = [
         {id: 1, title: "Lalala", isDone: true},
         {id: 2, title: "Hi", isDone: false},
         {id: 3, title: "Yoyo", isDone: false},
     ]*/

    //UI

    let taskForRender: Array<TasksType> = tasks

    if (filter === 'active') {
        taskForRender = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        taskForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/* <Todolist title="Songs" tasks={tasks2}/>*/}
        </div>
    );
}


export default App;
