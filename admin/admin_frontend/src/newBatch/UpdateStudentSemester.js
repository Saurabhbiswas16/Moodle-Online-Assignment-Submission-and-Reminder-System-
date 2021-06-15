import React,{useEffect,useState} from 'react'
import axios from "../Axios";
import AddBoxIcon from "@material-ui/icons/AddBox";
function UpdateStudentSemester(props) {
    const [state, setState] = useState({
        departmentId: "",
        semesterId: "",
    })
    const [division, setdivision] = useState([])
    const [batch, setbatch] = useState([])
    const [students, setstudents] = useState([])
    

    useEffect(() => {
        setState((prevVlaue) => ({
          ...prevVlaue,
          departmentId: props.handleDepartmentDetails.departmentId,
          semesterId: props.handleDepartmentDetails.semesterId,   
        }));
       
      }, [props]);
      useEffect(() => {
        const callDivision=async ()=>{
            const temp={divid:state.semesterId}
            const req=await axios.post('/departmentDetails/divison',temp);
            setdivision(req.data);
        }
        callDivision();
      }, [state.semesterId])
      useEffect(() => {
          const allBatch=async (id)=>{
            const temp={batchid:id}
            const req=await axios.post('/departmentDetails/batch',temp);
             setbatch((prev)=>[...prev,req.data]);
          }
        const callBatch= ()=>{
            division.map((data,index) => (
                 allBatch(data)
            ))         
        }
        callBatch();
      }, [division])

      const updateStudents=async(studentId,batid,divid)=>{
          console.log("update");
        const temp = { student:  studentId,batch:batid,div:divid};
        const students=await axios.post("admin/allocateBatch",temp);
      }
      const allocateBatch=async (studentId,) =>{
        const temp = { semester:  state.semesterId};
        const students=await axios.post("admin/allStudents",temp);
        const count=students.length/batch.length;
        var studentIndex=0;
        var counter=0;
        batch.map((data,index)=>{
            console.log("map");
        while(counter!==0){    
            if(counter===count){
                counter=0;                  
            }
            else
            {
               const studentId=students[studentIndex]._id;
               console.log(studentId);
               updateStudents(studentId,data._id,data.divID);
                counter++;
                studentIndex++;
            }
        }
        return 0;
    })
    }
    const allocateRollNo =async ()=>{
        const temp = { semester:  state.semesterId};
        const students=await axios.post("admin/allocateRollNo",temp);
        console.log(students);
    }
    const promotesemester = async () => {
        console.log("in change semester");
        axios.get("/admin/changesemester", (req, res) => {
          console.log(res.data);
        });
      };

    return (
        <>
         <button className="createButton" onClick={promotesemester}>
                <span className="addIcon">
                <AddBoxIcon style={{ fontSize: "50px" }} />
                </span>
                Update semester
            </button>
            <button className="createButton" onClick={allocateRollNo}>
            <span className="addIcon">
            <AddBoxIcon style={{ fontSize: "50px" }} />
            </span>
            Allocte Roll No
            </button> 
           
            <button className="createButton" onClick={allocateBatch}>
            <span className="addIcon">
            <AddBoxIcon style={{ fontSize: "50px" }} />
            </span>
            Allocte Batch
            </button> 
        </>
    )
}

export default UpdateStudentSemester
