import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import TaskInput from "../TaskInput"
import "./index.css"

const TaskList = ()=>{

    //Todo list data from local storage
    let data = JSON.parse(localStorage.getItem("TodoList"))
    if(data === null){
        data = []
    }

    //useState for Task Input
    const[task, setTask] = useState('')


    //useState for TodoList data
    const [dataList, setList] = useState(data)

    //input task data from user
    const onChangeInput = (event)=>{
        setTask(event.target.value)
    }

    //onDelete function 
    const onDelete = (id)=>{
        setList(dataList.filter(l=>l.id !== id))
    }

    //count of incomplete
    const countIncomplete = dataList.filter(l=>(l.isComplete === false))

    //count of complete
    const countComplete = dataList.filter(l=>(l.isComplete === true))

    //onToggle Function
    const onPressBtn = (id)=>{
        setList(dataList.map((l)=>(l.id === id ? {...l, isComplete:!l.isComplete}: l)))
    }

    //onAdd Task function 
    const onSubmitFnc = ()=>{
        const newObj = {
            id:uuidv4(),
            task,
            isComplete:false,
        }
        if(task !== ""){
            setList(((prevState)=>([...prevState,newObj])))
            setTask('')
        }
        
    }

    //onEdit Task function
    const onEditBtn = (id, value)=>{
        setTask(value)
        setList(dataList.filter(l=>l.id !== id))
    }
    

    //useEffect function
    useEffect(()=>{
        localStorage.setItem("TodoList", JSON.stringify(dataList))
    })

    //return 
    return(
        <div className="bgContainer">
            <h1 className="heading">Personal Todo App</h1>
            <div className="inputContainer">
            <input value={task} type="text" placeholder="What need to be done?" className="inp" onChange={onChangeInput}/>
            <div>
            <button type="button" className="add-btn" onClick={onSubmitFnc}><IoMdAdd /></button>
            </div>
            </div>
            {dataList.length===0 ? 
            (
            <div className="dv">
                <img src="https://img.freepik.com/free-vector/task-concept-illustration_114360-7788.jpg?t=st=1720019522~exp=1720023122~hmac=81994ccbbd5bb8d29cea58e19976da367f2c6a3de199b467aaa4070a6ccba705&w=826" alt="empty list" className="img"/>
                <h1 className="empt">Empty Task</h1>
            </div>)
             :
             ( <ul className="listContainer">
                <div className="fl1">
                    <div className="fl">
                       <h1 className="hh">My Tasks</h1>
                        <div className="count">
                          {dataList.length}
                         </div>
                    </div>
                    <div className="fl">
                        <div className="fl">
                             <h1 className="h11">Incomplete</h1>
                             <div className="count in">
                                {countIncomplete.length}
                              </div>
                        </div>
                        <div className="fl">
                             <h1 className="h11">Complete</h1>
                             <div className="count com">
                                {countComplete.length}
                              </div>
                        </div>
                    </div>
                </div>
                {dataList.map((l)=>(
                    //TaskInput Component
                    <TaskInput key={l.id} fnc2={onEditBtn} details={l} fnc={onDelete} fnc1={onPressBtn}/>
                ))}
            </ul>) }
        </div>
    )
}

export default TaskList