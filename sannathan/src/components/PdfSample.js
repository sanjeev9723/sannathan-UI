import React from "react";

const PdfSamplePage = () => {
  const handleDownloadPdf = () => {
    // Replace the URL with the actual URL of the PDF file
    const pdfUrl = "https://example.com/sample.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <h1>PDF Sample Page</h1>
      <p>This is a sample page where you can download a PDF file.</p>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default PdfSamplePage;
