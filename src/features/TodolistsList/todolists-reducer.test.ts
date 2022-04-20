import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    changeTodolistFilterAC, TodolistDomainType, FilterValuesType, fetchTodolistsTC
} from './todolists-reducer';

let todolistId1: string = "todolistId1"
let todolistId2: string = "todolistId2"
let startState: Array<TodolistDomainType>

beforeEach(() => {
    let todolistId1 = "todolistId1"
    let todolistId2 = "todolistId2"
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC({
        todolist: {
            title: newTodolistTitle,
            id: "any id",
            addedDate: "",
            order: 0
        }
    }))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('todolists should be added', () => {

    const action = fetchTodolistsTC.fulfilled({todolists: startState}, "requestId")
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title: newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});