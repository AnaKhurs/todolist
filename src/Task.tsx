import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState, useCallback, useMemo} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Clear} from "@material-ui/icons";

type TaskPropsType = {
    task: TaskType
    changeStatus: (taskId: string, isDone: boolean) => void
    removeTask: (taskID: string) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id)
    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked)
    }
    return (
        <ListItem
            disableGutters
            divider
            style={{display: "flex", justifyContent: "space-between", padding: "0px"}}
            className={props.task.isDone ? "isDone" : ""}
            key={props.task.id}>

            <Checkbox onChange={onChangeStatus} checked={props.task.isDone} color={"primary"}/>
            <EditableSpan title={props.task.title} setNewTitle={changeTitle}/>
            <IconButton onClick={removeTask} size={"small"}>
                <Clear fontSize={"small"}/>
            </IconButton>
        </ListItem>
    )

})
