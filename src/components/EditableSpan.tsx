import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ? <TextField
                style={{width:"140px"}}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            : <div style={{display:"inline-flex", width: "100%", justifyContent: "space-between"}}>
                <div style={{flexGrow: 1}} onDoubleClick={onEditMode}> {props.title}</div>
            <IconButton style={{width:"20px", background:"none"}} onClick={onEditMode} size={"small"} >
                <Edit fontSize={"small"}/>
            </IconButton>
            </div>


/*: <span onDoubleClick={onEditMode}> {props.title}
        <IconButton onClick={onEditMode} size={"small"} >
                <Edit style={{fontSize:18}}/>
            </IconButton>
              </span>*/

    )
}

/*
display: inline-flex
width: 100%
justify-content: space-between
#left
flex-grow: 1
#right
width: 300px



 #parent {
      display: block;
      position: relative;
      width: 200px;
    }
    #left {
      display: inline-block;
      right:20px;
      left:0px;
      position: absolute;
    }
    #right {
      display: inline-block;
      position: absolute;
      width:20px;
      right:0;
*/
