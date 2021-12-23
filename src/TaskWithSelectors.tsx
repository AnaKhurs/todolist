import React, {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useState, useCallback, useMemo} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Clear} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const TaskWithSelectors = React.memo((props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId]
        .filter(t => t.id === props.taskId)[0]
    );
    const dispatch = useDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskAC(props.taskId, props.todolistId)), [dispatch, props.taskId, props.todolistId])

    const onChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId))
    }, [dispatch, props.taskId, props.todolistId])

    const changeTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.taskId, title, props.todolistId))
    }, [dispatch, props.taskId, props.todolistId])


    return (
        <ListItem
            disableGutters
            divider
            style={{display: "flex", justifyContent: "space-between", padding: "0px"}}
            className={task.isDone ? "isDone" : ""}
            key={task.id}>

            <Checkbox onChange={onChangeStatus} checked={task.isDone} color={"primary"}/>
            <EditableSpan title={task.title} setNewTitle={changeTitle}/>
            <IconButton onClick={removeTask} size={"small"}>
                <Clear fontSize={"small"}/>
            </IconButton>
        </ListItem>
    )

})
