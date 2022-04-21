import chalk from "chalk";
import { Octokit } from "@octokit/rest";
import { DispatchOptions } from "../yargs/DispatchCommand.js";

const dispatchAction = async (options: DispatchOptions) => {
  const api = new Octokit({ auth: options.token });
  const result = await api.rest.repos.createDispatchEvent({
    owner: options.owner,
    repo: options.repo,
    event_type: options.event,
  });

  result.status == 204
    ? console.log(chalk.green(`\u2705 Event successfully dispatched`))
    : console.log(chalk.red(`Failed to dispatch event: ${result.status}`));
};

export default dispatchAction;
