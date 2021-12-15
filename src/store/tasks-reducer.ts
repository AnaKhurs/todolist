import {FilterValueType, TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type RemoveTaskAT = {
    type: "REMOVE-TASKS"
    taskID: string
    todoListID: string
}

type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListID: string
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListID: string
}
export type ActionType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | RemoveTodolistAT
    | AddTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer =
    (tasks = initialState, action: ActionType): TasksStateType => {
        switch (action.type) {
            case "REMOVE-TASKS":
                return ({
                    ...tasks,
                    [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.taskID)
                })
            case "ADD-TASK":
                const newTask: TasksType = {id: v1(), title: action.title, isDone: false}
                return ({
                    ...tasks,
                    [action.todoListID]: [newTask, ...tasks[action.todoListID]]
                })
            case "CHANGE-TASK-STATUS":
                return ({
                    ...tasks,
                    [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskId ? {
                        ...t,
                        isDone: action.isDone
                    } : t)
                })
            case "CHANGE-TASK-TITLE":
                return ({
                    ...tasks,
                    [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskId ? {
                        ...t,
                        title: action.title
                    } : t)
                })
            case "REMOVE-TODOLIST":

                /*let {[action.id]: [], ...newState} = {...tasks}
                *  return newState*/
                let copyTasks = {...tasks}
                delete copyTasks[action.id]
                return copyTasks
            case "ADD-TODOLIST":
                return ({...tasks, [action.id]: []})
            default:
                return tasks
        }
    }

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASKS",
        taskID,
        todoListID
    }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        title,
        todoListID
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todoListID
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todoListID
    }
}
