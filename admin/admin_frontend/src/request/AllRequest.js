import React,{useState} from 'react'
import '../createDepartment/CreateNew.css';
import StudentRequest from './StudentRequest'
import TeacherRequest from './TeacherRequest'
function AllRequest() {
    const [teacher, setteacher] = useState(false);
    const [student, setstudent] = useState(false);
    const onStudentRequest=(event)=>{
        event.preventDefault();
        setteacher(false);
        setstudent(true);
    }
    const onTeacherRequest=(event)=>{
        event.preventDefault();
        setstudent(false);
        setteacher(true);
        
    }
    return (
        <>
            <div className="mainbutton">
            <button variant="contained" name="studentRequest" activeClassName="navbar_link" onClick={onStudentRequest}>
            Student Request
            </button>
            <button variant="contained" name="teacherRequest" onClick={onTeacherRequest}>
            Teacher Request
            </button>

            </div>
            {teacher?<TeacherRequest/>:null}
            {student?<StudentRequest/>:null}
            
        </>
    )
}

export default AllRequest
