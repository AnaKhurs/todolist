import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

//C-R-UD
//CLI -> GUI -> UI

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
            {id: todoListID_1, title: "What to learn", filter: 'all'},
            {id: todoListID_2, title: "What to buy", filter: 'active'},
        ]
    )


    const [tasks, setTasks] = useState<TasksStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "React", isDone: false}
            ],
            [todoListID_2]: [
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Bear", isDone: true},
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Bread", isDone: false}
            ],
        }
    )


    const removeTask = (taskID: string, todoListID: string) => {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)
        })
    }

    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        )
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TasksType = {id: v1(), title: title, isDone: false}
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }


    const todoListsComponents = todoLists.map(tl => {

        let taskForRender: Array<TasksType> = tasks[tl.id]

        if (tl.filter === 'active') {
            taskForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            taskForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={tl.filter}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}


export default App;
