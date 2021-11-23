import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";

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
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

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
            <ListItem
                disableGutters
                divider
                style={{display: "flex", justifyContent: "space-between", padding: "0px"}}
                className={t.isDone ? "isDone" : ""}
                key={t.id}>

                <Checkbox onChange={onChangeStatus} checked={t.isDone} color={"primary"}/>
                {/*<input onChange={onChangeStatus} type="checkbox" checked={t.isDone}/>*/}
                <EditableSpan title={t.title} setNewTitle={changeTitle}/>
                <IconButton onClick={removeTask} size={"small"}>
                    <Clear fontSize={"small"}/>
                    {/*  <Delete fontSize={"small"}/>*/}
                </IconButton>
                {/*      <button onClick={removeTask}>x</button>*/}
            </ListItem>
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
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div>
            <Typography variant={"h6"} align={"center"} style={{
                fontWeight: "bold",
                display: "inline-block",
                right: "20px",
                left: 0,
                position: "relative"
            }}>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)} style={{width: "10px"}}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    style={{display: "flex", justifyContent: "space-between"}}
                >
                    <Button color={props.filter === "all" ? "secondary" : "primary"} onClick={setAll}>All</Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={setActive}>Active</Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={setCompleted}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}