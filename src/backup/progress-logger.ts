import { clamp } from "@dan-schel/js-utils";

export class ProgressLogger {
  report(
    operation: string,
    progress: number | "pending" | "indeterminate" | "done" | "failed",
  ) {
    if (typeof progress === "number") {
      console.log(`${operation}: ${(clamp(progress, 0, 1) * 100).toFixed(2)}%`);
    } else {
      const progressDisplayString = {
        pending: "pending",
        indeterminate: "loading...",
        done: "done",
        failed: "failed",
      }[progress];

      console.log(`${operation}: ${progressDisplayString}`);
    }
  }
}
