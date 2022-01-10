import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '24771d0b-afb6-4f59-ba2e-1f7f77002e3d'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "51d62a77-baf3-4461-878f-ced00aaf65ff"
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "51d62a77-baf3-4461-878f-ced00aaf65ff"
        tasksAPI.createTask(todolistId, "newTask")
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a3881f07-a545-4eb1-baf6-b597e305eb88"
        const id = "f153373c-576c-406e-a928-a0a966f7adc1"
        tasksAPI.deleteTask(todolistId, id)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "51d62a77-baf3-4461-878f-ced00aaf65ff"
        const id = "e9f4079a-b1e1-4503-b8e5-5d666ec2aa90"
        tasksAPI.updateTaskTitle(todolistId, id, "newTask1")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
