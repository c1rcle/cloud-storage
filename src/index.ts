#!/usr/bin/env node

import chalk from "chalk";
import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import benchmarkS3Command from "./yargs/BenchmarkS3Command.js";
import benchmarkBlobStorageCommand from "./yargs/BenchmarkBlobStorageCommand.js";
import benchmarkCloudStorageCommand from "./yargs/BenchmarkCloudStorageCommand.js";
import benchmarkDummyCommand from "./yargs/BenchmarkDummyCommand.js";

const onFail = (message: string, error: Error, yargs: Argv) => {
  if (error) {
    console.log(chalk.red(error.message));
  } else if (message) {
    console.log(chalk.red(message));
    yargs.showHelp();
  }

  process.exit(1);
};

yargs(hideBin(process.argv))
  .scriptName("cloud-storage")
  .command(benchmarkS3Command)
  .command(benchmarkBlobStorageCommand)
  .command(benchmarkCloudStorageCommand)
  .command(benchmarkDummyCommand)
  .strictCommands()
  .demandCommand(1)
  .fail(onFail)
  .wrap(null)
  .parse();
