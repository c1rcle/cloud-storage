#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { dispatchCommand } from "./yargs/DispatchCommand.js";

yargs(hideBin(process.argv))
  .scriptName("cloud-testing-env")
  .command(dispatchCommand)
  .demandCommand()
  .wrap(null)
  .parse();
