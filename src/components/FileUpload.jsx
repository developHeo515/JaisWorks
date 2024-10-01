import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState({});

  const imageUpload = (e) => {
    console.log(e.target.files.length); // 파일 갯수 확인

    // 파일이 선택되지 않았을 경우 파일 상태 초기화
    if (e.target.files.length === 0) {
      setFile({ image: false, video: false });
      return;
    }

    const imageType = e.target.files[0].type.includes("image");
    const videoType = e.target.files[0].type.includes("video");

    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      image: imageType, // 이미지일 경우 true
      video: videoType, // 비디오일 경우 true
    });
  };

  return (
    <>
      <input type="file" onChange={imageUpload} />

      {/* 선택된 이미지나 비디오만 보여줌 */}
      {file.image && <img src={file.url} alt="선택된 이미지" />}
      {file.video && (
        <div>
          <h1>비디오 미리보기</h1>
          <video width="400" controls>
            <source src={file.url} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      )}
    </>
  );
};

export default FileUpload;
