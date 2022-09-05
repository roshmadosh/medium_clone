import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageId } = req.query;
  const dir = typeof(imageId) === 'string' ? imageId.substring(0,2) : imageId[0].substring(0,2);
  fs.readFile(`C:/Users/hiros/Desktop/medium_images/${dir}/${imageId}`, (err, data) => {
    if (err) {
      console.error('Failed to fetch image.');
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg'});
      res.end(data);
    }
  })
}