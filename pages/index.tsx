import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import styles from '../styles/Home.module.css';

function Upload() {
    const [file, setFile] = useState<File>();
    const [uploadedFile, setUploadedFile] = useState<string>();
    const inputRef = useRef(null);

    const clickEvent = () => {
        // @ts-ignore
        inputRef.current.click()
    }

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFile(event.dataTransfer?.files[0])
    };

    // send files to the server // learn from my other video
    const handleUpload = async () => {
        const formData = new FormData();

        if (!file) return null

        formData.append("file", file);
        const response = await axios.post(`/api/media`, formData, { maxBodyLength: 1000000000, maxContentLength: 1000000000 })

        if (response.data) {
            setUploadedFile(response.data)
        }
    };

    return (

        <div className={styles.container}>
            <div className={styles.containerDropzone}>
                <div className={styles.dropzone}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <p className={styles.dropzoneText}>Drop a File</p>
                    <p className={styles.dropzoneText}> Or </p>
                    < input
                        className={styles.buttonUpload}
                        type="file"
                        onChange={handleFileChange}
                        ref={inputRef}
                        hidden
                    />

                    <button className={styles.dropzoneButton} onClick={clickEvent}> Select Files </button>
                </div>
            </div>
            {file &&
                <div className={styles.containerFile}>
                    <div className={styles.uploads}>
                        <a className={styles.titleFiles}>Files</a>
                        <div className={styles.rowFile}>
                            <table className={styles.customTable}>
                                <tr></tr>
                                <tr className={styles.rowFile}>
                                    <td>
                                        <li>{file.name}</li>
                                    </td>
                                    <td style={{ justifyContent: "end", display: "flex" }}>
                                        {uploadedFile &&
                                            <button className={styles.fileButton}>
                                                <a style={{ textDecoration: "none", color: "white" }} href={uploadedFile} type="button">Open</a>
                                            </button>
                                        }
                                    </td>

                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={styles.action} >
                        < button className={styles.dropzoneButton} onClick={handleUpload} > Upload </button>
                    </div>
                </div>
            }
        </div >
    );
}

export default Upload;