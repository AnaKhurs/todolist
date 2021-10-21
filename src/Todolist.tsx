import React from "react";
import {FilterValueType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValueType) => void
}

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {


    const tasksJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}