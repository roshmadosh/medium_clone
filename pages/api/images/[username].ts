import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';
import { Stream } from "stream";

// get env vars from correct .env file
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  const IMAGE_PATH = path.join(process.env.IMAGES_LOCATION, username as string);
  
  if (req.method === 'GET') {
    const { filename } = req.query;
    console.log('FUAK');
    fs.readFile(path.join(IMAGE_PATH, filename as string), (err, data) => {
      if (err) {
        console.error('MED-CLONE-ERROR: Failed to fetch image.');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg'});
        res.end(data);
      }
    })
  } 
  
  else if (req.method === 'POST') {
    const { image, username } = req.body;
    console.log(image);
    console.log(username);
    res.writeHead(200);
    res.end('yay');
  }

}