import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'


//C-R-UD
//CLI -> GUI -> UI

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "React", isDone: false}
    ])

    const [filter, setFilter] = React.useState<FilterValueType>("all")

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        //return undefined
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TasksType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let taskForRender: Array<TasksType> = tasks

    if (filter === 'active') {
        taskForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        taskForRender = tasks.filter(t => t.isDone === true)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

/*    const changeTaskStatus = (taskId: string) => { //вариант через map вместо find
        const updatedTask = tasks.map(t => {
            if (t.id === taskId) {
                return {...t, isDone: !t.isDone} //!t.isDone если не придется тестировать иначе вводим новый параметр функции isDone
            }
            return t
        })
        setTasks(updatedTask)
    }*/

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeStatus={changeStatus}
            />
            {/* <Todolist title="Songs" tasks={tasks2}/>*/}
        </div>
    );
}


export default App;
