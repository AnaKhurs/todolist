import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '24771d0b-afb6-4f59-ba2e-1f7f77002e3d'
    }
})
type Created = ResponseType<{ item: TodoType }>
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<Created, AxiosResponse<Created>, { title: string }>('todo-lists', {title})

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}