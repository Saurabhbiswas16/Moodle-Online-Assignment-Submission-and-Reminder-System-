import React, { useState } from "react";

function UploadFiles(props) {
  const [selectedFile, setselectedFile] = useState(null);

  const onChangeHandler = (event) => {
    console.log("onChange handler in uploadfile");
    const file = event.target.files[0];
    console.log(file);
    setselectedFile(file);
  };

  const onClickHandler = () => {
    console.log("on clickhandler in uploadfile");
    props.addUploadedFile(selectedFile);
  };

  return (
    <div>
      <input
        type="file"
        className="form-group files"
        name="file"
        multiple
        onChange={onChangeHandler}
      />
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={onClickHandler}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadFiles;