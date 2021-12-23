import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
   /* console.log("AddItemForm")*/

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
            <TextField
                variant={"outlined"}
                label={'Title'}
                size={"small"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                error={error}
                helperText={error && "title is required!"}
            />

            {/*            <input
                style={error ? errorInputStyle : undefined}
                placeholder="Enter title..."
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
            />*/}
            <IconButton onClick={addItem} color={"primary"}  size={"small"}>
                <AddBox fontSize={"large"} />
            </IconButton>
            {/*      <button onClick={addItem}>+</button>*/}
            {/*{errorMessage}*/}
        </div>
    )
})