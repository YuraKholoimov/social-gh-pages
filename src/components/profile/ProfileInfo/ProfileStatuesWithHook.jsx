import React, { useEffect, useState } from "react";

const ProfileStatuesWithHook = (props) => {
 
    let [editMode, setEditMode ] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunk(status)

    }

    const addText = (e) => {
        setStatus(e.currentTarget.value)
    }

    return <>
        { !editMode
        ? <div>
            <span onDoubleClick={activateEditMode} >{props.status || "NO STATUS"}</span>
        </div>
        : <div>
            <input onChange={addText} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
        </div> 
        }
    </>
}

export default ProfileStatuesWithHook