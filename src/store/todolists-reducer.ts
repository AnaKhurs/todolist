import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
};

export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodoListType> = []

export const todolistsReducer =
    (todoLists = initialState, action: ActionType): Array<TodoListType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todoLists.filter(tl => tl.id !== action.id)
            case "ADD-TODOLIST":
                const newTodoList: TodoListType = {
                    id: action.id,
                    title: action.title,
                    filter: 'all'
                }
                return [...todoLists, newTodoList]
            case "CHANGE-TODOLIST-TITLE":
                return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

            default:
                return todoLists
        }
    }


export const RemoveTodoListAC = (id: string): RemoveTodolistAT => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }
}

export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1()
    }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}