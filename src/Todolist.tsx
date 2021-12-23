import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState, useCallback, useMemo} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValueType
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: PropsType) => {
    /*console.log("Todolist")*/

    const changeStatus = useCallback((taskId: string, isDone: boolean) => {
        /* console.log("changeStatus")*/
        props.changeStatus(taskId, isDone, props.id)
    }, [props.changeStatus, props.id])

    const removeTask = useCallback((taskID: string) => {
        /* console.log("removeTask")*/
        props.removeTask(taskID, props.id)
    }, [props.removeTask, props.id])

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        /*console.log("changeTaskTitle")*/
        props.changeTaskTitle(taskId, title, props.id)
    }, [props.changeTaskTitle, props.id])

    /*
        let taskForRender = props.tasks
        if (props.filter === 'active') {
            taskForRender = props.tasks.filter(t => !t.isDone)
        }
        if (props.filter === 'completed') {
            taskForRender = props.tasks.filter(t => t.isDone)
        }
    */

    let taskForRender = props.tasks
    let taskForRenderMemo = useMemo(() => {

        if (props.filter === 'active') {
            taskForRender = props.tasks.filter(t => !t.isDone)
        }
        if (props.filter === 'completed') {
            taskForRender = props.tasks.filter(t => t.isDone)
        }
        return taskForRender
    }, [props.filter, props.tasks])


    const tasksJSXElements = taskForRenderMemo.map(t => {
            return <Task key={t.id}
                         task={t}
                         changeStatus={changeStatus}
                         removeTask={removeTask}
                         changeTaskTitle={changeTaskTitle}/>
        }
    )

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const setAll = useCallback(() => props.changeFilter("all", props.id), [props.id])
    const setActive = useCallback(() => props.changeFilter("active", props.id), [props.id])
    const setCompleted = useCallback(() => props.changeFilter("completed", props.id), [props.id])


    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])

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
                <IconButton onClick={removeTodoList} style={{width: "10px"}}>
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
})