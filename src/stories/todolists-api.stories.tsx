import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '24771d0b-afb6-4f59-ba2e-1f7f77002e3d'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")

    const onClickHandler = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'new Todolist title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>+</button>
        </div>

    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    
    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')

    const onClickHandler = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Update Todolist Title</button>
        </div>
    </div>
}
