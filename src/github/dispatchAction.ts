import { Octokit } from "@octokit/rest";
import { DispatchOptions } from "../yargs/DispatchOptions.js";

const dispatchAction = async (options: DispatchOptions) => {
  try {
    const api = new Octokit({ auth: options.token });
    const result = await api.rest.repos.createDispatchEvent({
      owner: options.owner,
      repo: options.repo,
      event_type: options.event,
    });

    result.status == 204
      ? console.log(`Event successfully dispatched`)
      : console.log(`Failed to dispatch event: ${result.status}`);
  } catch (error) {
    error instanceof Error && console.log(`Failed to dispatch event: ${error.message}`);
  }
};

export default dispatchAction;
