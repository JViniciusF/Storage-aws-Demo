import { Part } from "aws-sdk/clients/s3";
import axios from "axios";
import { ChangeEvent, useState } from "react";

function Upload() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const uploadToS3 = async () => {

    if (!file) {
      return null;
    }

    const fileSize = file.size;

    const fileType = encodeURIComponent(file.type);

    // @ts-ignore

    const { data } = await axios.get(`/api/media?fileType=${fileType}`);

    const { urlSigned } = data;

    const chunkSize = (1024 * 1024) * 5; // 5MB 

    const numParts = Math.ceil(fileSize / chunkSize);

    const chunks: Blob[] = [];

    const partsUploaded: Part[] = [];

    for (let index = 1; index <= numParts; index++) {
      const start = (index - 1) * chunkSize;
      const end = index * chunkSize;

      chunks.push(
        (index < numParts) ? file.slice(start, end) : file.slice(start)
      );
    };

    chunks.forEach(async (chunk, index) => {
      console.log(chunks)
    })

    return ["TESTES"]
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={uploadToS3}>Upload</button>
    </div>
  );
}

export default Upload;
