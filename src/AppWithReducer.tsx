import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

//C-R-UD
//CLI -> GUI -> UI

export function AppWithReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
            {id: todoListID_1, title: "What to learn", filter: 'all'},
            {id: todoListID_2, title: "What to buy", filter: 'active'},
        ]
    )

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        dispatchToTodoLists(ChangeTodolistFilterAC(todoListID, filter))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(ChangeTodolistTitleAC(todoListID, title))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListID))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID))
    }


    const removeTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }


    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }


    const todoListsComponents = todoLists.map(tl => {

        let taskForRender: Array<TaskType> = tasks[tl.id]

        if (tl.filter === 'active') {
            taskForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            taskForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForRender}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "29px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

/*
class Example extends React.Component {
    state = {
        name: "qww"
    }


    changeState = () => {
        this.setState({name: "qwwer"}, () => this.setState({name: 'qwertyu'}))
        console.log(this.state.name)
    }
    render() {
        return <div>{this.state.name}
            <button onClick={this.changeState}>CHANGE NAME</button>
        </div>;
    }
}*/
