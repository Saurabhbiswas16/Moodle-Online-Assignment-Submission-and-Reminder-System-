import React, { useState } from 'react'

function UploadFiles(props) {
   
    const [selectedFile, setselectedFile] = useState({});

  const onChangeHandler = async (event) => {
    console.log("onChange handler in uploadfile");
    
    var file = event.target.files[0];
    console.log(file);
    setselectedFile(file);
  };

  const onClickHandler = () => {
    console.log("on clickhandler in uploadfile");
    props.addUploadedFile(selectedFile);
  };

    return (
        <div>    
                <input type="file" name="file" onChange={onChangeHandler}/>
                <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button> 
            </div>
    )
}

export default UploadFiles
