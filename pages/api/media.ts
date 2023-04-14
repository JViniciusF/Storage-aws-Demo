// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//@ts-nocheck
import axios from "axios";
import formidable from "formidable";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false
    }
}

async function readFile(req: NextApiRequest): Promise<{ files: formidable.Files }> {
    const form = formidable()
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ files })
        })
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { files } = await readFile(req);

    if (!files.file.length) {

        const file = files.file.toJSON()

        const response = await axios.post(process.env.BUCKET_URL, { fileName: file.originalFilename }, {
            headers: {
                Authorization: process.env.ACCESS_KEY
            }
        }).catch(error => {
            return { error }
        })

        if (response.error) return res.json(error.message)

        const fileContent = readFileSync(file.filepath)

        await axios.put(response.data.urlSigned, fileContent, {
            headers: {
                "Content-Type": file.mimetype,
            },
            maxBodyLength: 1000000000,
            maxContentLength: 1000000000
        })

        return res.json(response.data.urlSigned.split("?")[0])
    }
    else {
        //implementar multifile
    }
}
