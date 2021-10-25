import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {v1} from "uuid";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

// function addTask(){
//     let task = {id: v1(), title: "New Task", isDone: false},
//         let NewTasks = [task, ...tasks]
// }

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>("")


    const tasksJSXElements = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id)

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) { // если не пустая строка и не пробел
            props.addTask(trimTitle) //title&&props.addTask(title)
            setTitle('')
        }
    }
    const setAll = () => props.changeFilter("all")
    const setActive = () => props.changeFilter("active")
    const setCompleted = () => props.changeFilter("completed")
    const changeFilter = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeFilter}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}