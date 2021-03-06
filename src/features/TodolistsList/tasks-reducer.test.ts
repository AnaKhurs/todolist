import {
    addTaskTC,
    fetchTasksTC,
    removeTaskTC,
    tasksReducer,
    TasksStateType, updateTaskTC,
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {addTodolistTC, removeTodolistTC} from './todolists-reducer';

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.Completed,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
            {
                id: "3",
                title: "JS",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId2"
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId2"
            },
            {
                id: "3",
                title: "beer",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId2"
            },

        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const param = {taskId: "2", todolistId: "todolistId2"}
    const action = removeTaskTC.fulfilled({taskId: "2", todolistId: "todolistId2"}, "requestId", {
        taskId: "2",
        todolistId: "todolistId2"
    });
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.Completed,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
            {
                id: "3",
                title: "JS",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId1"
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId2"
            },
            {
                id: "3",
                title: "beer",
                status: TaskStatuses.New,
                startDate: "",
                priority: TaskPriorities.Low,
                order: 0,
                description: '',
                deadline: '',
                addedDate: '',
                todoListId: "todolistId2"
            },

        ]
    });
});

test('correct task should be added to correct array', () => {

    const task = {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exist"
    }

    const action = addTaskTC.fulfilled(task, 'requestId', {title: task.title, todolistId: task.id});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const updateModel = {
        taskId: "1",
        domainModel: {status: TaskStatuses.Completed},
        todolistId: "todolistId2"
    };
    const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New);
});

test('title task should be changed', () => {

    const updateModel = {
        taskId: "2",
        domainModel: {title: "coffee"},
        todolistId: "todolistId2"
    };

    const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("coffee");
    expect(endState["todolistId1"][1].title).toBe("HTML");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistTC.fulfilled({
        todolist: {
            id: "blabla",
            title: "new todolist",
            addedDate: "",
            order: 0
        }
    }, "requestId", "new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistTC.fulfilled({id: "todolistId2"}, "requestId", "todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('tasks should be added for todolist', () => {

    const action = fetchTasksTC.fulfilled({
        tasks: startState["todolistId1"],
        todolistId: "todolistId1"
    }, "requestId", "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
