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

    // @ts-ignore

    const { data } = await axios.get(`/api/media?fileType=${fileType}`);

    //Arrumar para conseguir fazer o envio dos arquivos no padrão da AWS
    const uploadedFile = await axios.post(data);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name}`}</div>

      <button onClick={uploadToS3}>Upload</button>
    </div>
  );
}

export default Upload;
