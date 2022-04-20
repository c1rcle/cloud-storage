import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuid } from "uuid";

export interface TestFile {
  size: number;
  sourceFilePath: string;
  downloadFilePath: string;
  remoteFilePath: string;
}

export interface TestFileGenerator {
  createTestFile(size: number): TestFile;
  dispose(file: TestFile): void;
}

export const getTestFileGenerator = (): TestFileGenerator => {
  const getTempDir = (dirName: string): string => {
    const dirPath = path.join(os.tmpdir(), "cloud-testing-env", dirName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    return dirPath;
  };

  const sourceDir = getTempDir("src");
  const downloadDir = getTempDir("dl");

  return {
    createTestFile: size => {
      const fileName = uuid();
      const sourceFilePath = path.join(sourceDir, fileName);
      const downloadFilePath = path.join(downloadDir, fileName);

      const file = fs.openSync(sourceFilePath, "w");
      fs.writeSync(file, "0", Math.max(0, size - 1));
      fs.closeSync(file);

      return {
        size: size,
        sourceFilePath: sourceFilePath,
        downloadFilePath: downloadFilePath,
        remoteFilePath: fileName,
      };
    },
    dispose: file => {
      fs.rmSync(file.sourceFilePath);
    },
  };
};
