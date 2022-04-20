import dispatchAction from "../github/dispatchAction.js";

export const dispatchCommand = {
  command: "dispatch <event>",
  describe: "Trigger a repository dispatch event",
  builder: {
    event: {
      type: "string",
      describe: "Selected event type",
      choices: ["benchmark_native", "benchmark_web"],
      demandOption: true,
    },
    token: {
      type: "string",
      describe: "Github access token",
      demandOption: true,
    },
    owner: {
      type: "string",
      describe: "Repository owner",
      default: "c1rcle",
    },
    repo: {
      type: "string",
      describe: "Repository name",
      default: "cloud-ci",
    },
  },
  handler: async args => {
    await dispatchAction({
      event: args.event,
      token: args.token,
      owner: args.owner,
      repo: args.repo,
    });
  },
};
