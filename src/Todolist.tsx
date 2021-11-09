import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {v1} from "uuid";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValueType
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
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

    const [error, setError] = useState<boolean>(false) //флаг

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        return ( //"isDone XX" имена классов через пробел если нужно несколько
            <li className={t.isDone ? "isDone" : ""} key={t.id}>
                <input onChange={onChangeStatus} type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = () => {
        const trimTitle = title.trim() //метод trim отрезает пробелы в начале и в конце
        if (trimTitle) { // если не пустая строка и не пробел
            props.addTask(trimTitle.trim(), props.id) //title&&props.addTask(title), trim отрезает пробелы в начале и в конце
        } else {
            setError(true)
        }
        setTitle('')
    }
    const setAll = () => props.changeFilter("all", props.id)
    const setActive = () => props.changeFilter("active", props.id)
    const setCompleted = () => props.changeFilter("completed", props.id)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const allBtnClass = props.filter === "all" ? 'active-filter' : "";
    const activeBtnClass = props.filter === "active" ? 'active-filter' : "";
    const completedBtnClass = props.filter === "completed" ? 'active-filter' : "";
    const errorMessage = error //условный рендеринг
        ? <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>
        : null

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={()=>props.removeTodoList(props.id)}>x</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    placeholder="Enter your task..."
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
                {/* <div className={error ? "error-message" : ''}>{error ? "Title is required!" : ""}</div>*/}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={allBtnClass} onClick={setAll}>All</button>
                <button className={activeBtnClass} onClick={setActive}>Active</button>
                <button className={completedBtnClass} onClick={setCompleted}>Completed
                </button>
            </div>
        </div>
    )
}