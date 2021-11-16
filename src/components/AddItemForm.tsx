import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false) //флаг
    const errorInputStyle = {
        border: "red 2px solid", outline: "none"
    }
    const errorMessage = error //условный рендеринг
        ? <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>
        : null

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        const trimTitle = title.trim() //метод trim отрезает пробелы в начале и в конце
        if (trimTitle) { // если не пустая строка и не пробел
            props.addItem(trimTitle.trim()) //title&&props.addTask(title), trim отрезает пробелы в начале и в конце
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }


    return (
        <div>
            <input
                style={error ? errorInputStyle : undefined}
                placeholder="Enter title..."
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}