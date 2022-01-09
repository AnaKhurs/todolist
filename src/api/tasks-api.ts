import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '24771d0b-afb6-4f59-ba2e-1f7f77002e3d'
    }
})
type Created = ResponseType<{ item: TaskType }>
export const tasksAPI = {
    getTasks(todolistId:string) {
        return instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title: string) {
        return instance.post<Created, AxiosResponse<Created>, { title: string }>(`/todo-lists/${todolistId}/tasks`, {title})

    },
    deleteTask(todolistId: string, id:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    updateTaskTitle(todolistId: string, id:string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, {title})
    },
    updateTaskStatus(todolistId: string, id:string, isDone: boolean) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, {isDone})
    }
}

type TaskType = {
    description: null | string
    title: string
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}