import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function ViewPdf() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    console.log(window.location.origin + "/CE_026_AT_Harshit_Chudasama.pdf");
  }, []);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <a href="file:///C:/Users/faizan/Desktop/SDP_PROJECT/version%203/front/public/UploadedFiles/CE_026_AT_Harshit_Chudasama.pdf">
        a
      </a>
      <Document
        file="file:///C:/Users/faizan/Desktop/SDP_PROJECT/version%203/front/public/UploadedFiles/CE_026_AT_Harshit_Chudasama.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default ViewPdf;
