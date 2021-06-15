import React,{useState} from 'react'
import CreateAnnouncement from './CreateAnnouncement'
import SendAnnouncement from './SendAnnouncement';
import AllAnnouncement from './AllAnnouncement';
function Announcement() {
    const [deptDetails, setdeptDetails] = useState({})
    const [isDepartment, setisDepartment] = useState(false)
    const selectDepartmentDetails=(dept)=>{
        console.log(dept);
        if(JSON.stringify(dept)!==JSON.stringify({}))
        {
            setisDepartment(true);
            setdeptDetails(dept);
            
        }
        else{
            setisDepartment(false);
        }
    }
   
    return (
        <>
            <SendAnnouncement selectDepartmentDetails={selectDepartmentDetails} />  
            <div className="middleContainer">
                <div>
                {isDepartment?<AllAnnouncement handleDepartmentDetails={deptDetails} />:null} 
                </div>
                <div>          
                {isDepartment?<CreateAnnouncement handleDepartmentDetails={deptDetails}/>:null}
                </div>
                
             </div>
        </>
    )
}

export default Announcement
