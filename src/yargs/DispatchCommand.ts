import { ArgumentsCamelCase, CommandModule } from "yargs";
import dispatchAction from "../github/dispatchAction.js";

export interface DispatchOptions {
  event: string;
  token: string;
  owner: string;
  repo: string;
}

type CommandOptions = ArgumentsCamelCase & DispatchOptions;

const dispatchCommand: CommandModule = {
  command: "dispatch <event>",
  describe: "Trigger a repository dispatch event",
  builder: yargs =>
    yargs
      .positional("event", {
        type: "string",
        describe: "Selected event type",
        choices: ["benchmark_native", "benchmark_web"],
        demandOption: true,
      })
      .option("token", {
        type: "string",
        describe: "Github access token",
        demandOption: true,
      })
      .option("owner", {
        type: "string",
        describe: "Repository owner",
        default: "c1rcle",
      })
      .option("repo", {
        type: "string",
        describe: "Repository name",
        default: "cloud-ci",
      }),
  handler: async args => await dispatchAction(args as CommandOptions),
};

export default dispatchCommand;
