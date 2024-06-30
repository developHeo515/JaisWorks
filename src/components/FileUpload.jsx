import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState({});

  const imageUpload = (e) => {
    console.log(e.target.files.length); //파일 갯수

    //파일이 없을 때는 선택된 파일 없게 설정
    if (e.target.files.length == 0) {
      setFile({ image: false, video: false });
      return;
    }

    const imageTpye = e.target.files[0].type.includes("image");
    const videoTpye = e.target.files[0].type.includes("video");

    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      image: imageTpye, //이미지를 선택하면 image에 true, 비디오면 false들어감
      video: videoTpye, //비디오를 선택하면 video에 true, 이미지면 false들어감
    });
    // console.log(e);
    // console.log(imageTpye);
  };

  return (
    <>
      <h1>1번</h1>
      <input type="file" onChange={imageUpload} />
      {/* 사진 or 비디오 선택된거만 보여줌 */}
      {file.image && <img src={file.url} />}
      {file.video && (
        <div>
          <h1>My Video</h1>
          <video width="320" height="180" controls>
            <source src={InputVideo} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv1} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv2} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv3} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv4} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv5} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv6} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv7} type="video/mp4" />
          </video>

          <video width="320" height="180" controls>
            <source src={mv8} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default FileUpload;
