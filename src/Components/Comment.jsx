import React, { useEffect, useState } from "react";
import { getComment } from "../Api";
import Pdf from "../assests/pdf.png";

export default function Comment({ id }) {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const getData = async () => {
    const res = await getComment(id);
    if (res?.data?.success) {
      setData(res?.data?.comment);
      setFile(res?.data?.file);
      setFileName(res?.data?.fileOriginalName);
    }
  };
  const downloadPdf = (fileName) => {
    window.open(`/${fileName}`, "_blank");
  };
  return (
    <>
      {fileName ? (
        <div className="d-flex " style={{ marginTop: "25px" }}>
          <img src={Pdf} alt="" className="pdf_img" />
          <p style={{ marginTop: "15px" }} onClick={() => downloadPdf(file)}>
            {fileName}
          </p>
        </div>
      ) : null}
      <div className="comt-container">
        <p>Comments</p>
        {data?.length === 0 ? (
          <p style={{ fontSize: "12px", marginTop: "10px" }}>No comment</p>
        ) : (
          <div className="comt">
            {data?.map((obj, _) => (
              <p key={obj._id}>{obj.text}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
