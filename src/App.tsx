import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

    const changeTodolistTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        )
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }

    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title} : t)
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
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
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
            <Grid item  key={tl.id}>
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


export default App;

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
