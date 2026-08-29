import { spawnSync } from "node:child_process";

const commandArgs = process.argv.slice(2);

if (commandArgs.length === 0) {
  console.error("A CLI script is required.");
  process.exitCode = 1;
} else {
  const nodeArgs = ["--import", "tsx"];

  if (
    process.platform === "win32" &&
    process.allowedNodeEnvironmentFlags.has("--use-system-ca")
  ) {
    nodeArgs.unshift("--use-system-ca");
  }

  const result = spawnSync(process.execPath, [...nodeArgs, ...commandArgs], {
    stdio: "inherit",
  });

  if (result.error) {
    console.error("Could not start the CLI script.");
    process.exitCode = 1;
  } else {
    process.exitCode = result.status ?? 1;
  }
}
