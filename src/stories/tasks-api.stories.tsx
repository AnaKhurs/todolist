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
    const [todolistId, setTodolistId] = useState("")
    const onClickHandler = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"id"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>GetTasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")

    const onClickHandler = () => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>CreateTask</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [id, setId] = useState("")

    const onClickHandler = () => {
        tasksAPI.deleteTask(todolistId, id)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={id} onChange={(e) => setId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>DeleteTask</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [id, setId] = useState("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<null | string>(null)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<null | string>(null)
    const [deadline, setDeadline] = useState<null | string>(null)

    const onClickHandler = () => {
        tasksAPI.updateTaskTitle(todolistId, id, {
            title,
            description,
            status,
            priority,
            startDate,
            deadline,
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={id} onChange={(e) => setId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={"description"} value={description ? description : ""}
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={"status"} value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={"priority"} value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <input placeholder={"startDate"} value={startDate ? startDate : ""}
                   onChange={(e) => setStartDate(e.currentTarget.value)}/>
            <input placeholder={"deadline"} value={deadline ? deadline : ""}
                   onChange={(e) => setDeadline(e.currentTarget.value)}/>

            <button onClick={onClickHandler}>UpdateTask</button>
        </div>
    </div>
}
