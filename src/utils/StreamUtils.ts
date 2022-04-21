import fs from "fs-extra";
import { Readable } from "stream";

export const writeStreamToFile = async (stream: Readable, filePath: string): Promise<void> =>
  await new Promise((resolve, reject) => {
    stream
      .pipe(fs.createWriteStream(filePath))
      .on("error", error => reject(error))
      .on("close", () => resolve());
  });
