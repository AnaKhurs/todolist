import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

//C-R-UD
//CLI -> GUI -> UI

export function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }

    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, filter))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }


    const removeTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }


    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    },[dispatch])

    const todoListsComponents = todoLists.map(tl => {

        let taskForRender: Array<TasksType> = tasks[tl.id]

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
