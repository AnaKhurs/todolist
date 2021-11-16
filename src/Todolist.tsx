import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string)=>void
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

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        return ( //"isDone XX" имена классов через пробел если нужно несколько
            <li className={t.isDone ? "isDone" : ""} key={t.id}>
                <input onChange={onChangeStatus} type="checkbox" checked={t.isDone}/>
                <EditableSpan title={t.title} setNewTitle={changeTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const setAll = () => props.changeFilter("all", props.id)
    const setActive = () => props.changeFilter("active", props.id)
    const setCompleted = () => props.changeFilter("completed", props.id)


    const allBtnClass = props.filter === "all" ? 'active-filter' : "";
    const activeBtnClass = props.filter === "active" ? 'active-filter' : "";
    const completedBtnClass = props.filter === "completed" ? 'active-filter' : "";

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title,props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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