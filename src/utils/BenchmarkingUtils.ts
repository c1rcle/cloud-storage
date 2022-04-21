import { hrtime } from "process";
import { TransferRequestResult } from "../storage/StorageClient.js";

const mebi = 1024 * 1024;
const nano = 10 ** 9;

export const megabytesToBytes = (value: number) => value * mebi;

export const getAverageMbps = (seconds: number, fileSize: number) => fileSize / mebi / seconds;

export const measureTransferTime = async (
  fileSize: number,
  block: () => Promise<void>
): Promise<TransferRequestResult> => {
  const start = hrtime.bigint();
  await block();
  const timeElapsed = Number(hrtime.bigint() - start) / nano;

  return {
    timeElapsed: timeElapsed,
    averageMbps: getAverageMbps(timeElapsed, fileSize),
  };
};

export const measureExecutionTime = async (block: () => Promise<void>): Promise<number> => {
  const start = hrtime.bigint();
  await block();
  return Number(hrtime.bigint() - start) / nano;
};
