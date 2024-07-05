import { MdDelete } from "react-icons/md";
import { GoIssueClosed } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import 'animate.css';
import "./index.css"

const TaskInput =(props)=>{

    //props from TaskList component
    const{details, fnc, fnc1, fnc2} = props
    const {id, task, isComplete} = details

    //onClick Delete button function
    const ondelete = ()=>{
        fnc(id)
    }

    //onClick isComplete and  InComplete Button function
    const onpressFnc = ()=>{
        fnc1(id)
    } 

    //onEdit onClick function
    const onEdit = ()=>{
        fnc2(id, task)
    }
    
    //CSS for complete and incomplete button 
    const inputContainerClass = isComplete ? 'inputContainer2' : 'inputContainer1' 

    //return statement
    return(
        <li className={`${inputContainerClass}`}>
            {isComplete ?(<p className="strike">{task}</p>):(<p>{task}</p>)}
            <div className="dv1">
                {isComplete?
                (<button type="button" className="ic1 ic2" onClick={onpressFnc}><IoIosCloseCircleOutline /></button>):
                 (<button type="button" className="ic1" onClick={onpressFnc}><GoIssueClosed /></button>)}
                <button type="button" className="ic" onClick={onEdit}><CiEdit /></button>
                <button onClick={ondelete} type="button" className="ic"><MdDelete /></button>
            </div>
        </li>
    )
}
export default TaskInput