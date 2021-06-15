import React from 'react'

function StudentAssignmentBlock(props) {
    return (
        <div>
            <h1>title</h1>
            <h1>{props.assignment._id}</h1>
        </div>
    )
}

export default StudentAssignmentBlock
