import { clamp } from "@dan-schel/js-utils";
import chalk from "chalk";

export class ProgressLogger {
  private _operationYPositions: Map<string, number>;
  private _cursorY: number;

  constructor() {
    this._operationYPositions = new Map();
    this._cursorY = 0;
  }

  report(
    operation: string,
    progress: number | "pending" | "indeterminate" | "done" | "failed",
  ) {
    if (typeof progress === "number") {
      const text = `${(progress * 100).toFixed(1)}%`;
      this._writeFor(operation, this._formatPercentage(progress, text));
    } else {
      const { text, percentage } = {
        pending: { text: "Pending", percentage: 0 },
        indeterminate: { text: "Loading...", percentage: 0 },
        done: { text: chalk.green("Done"), percentage: 1 },
        failed: { text: chalk.red("Failed"), percentage: null },
      }[progress];

      if (percentage === null) {
        this._writeFor(operation, text);
      } else {
        this._writeFor(operation, this._formatPercentage(percentage, text));
      }
    }
  }

  end() {
    const max = this._maxYPosition();
    const finalPosition = max == null ? 0 : max + 1;
    this._moveCursorToYPosition(finalPosition);
  }

  private _writeFor(operation: string, text: string) {
    this._moveCursorToYPosition(this._getYPosition(operation));

    process.stdout.clearLine(0);
    process.stdout.write(`${operation}: ${text}`);
  }

  private _formatPercentage(
    percentage: number,
    text: string,
    width: number = 40,
  ): string {
    const clamped = clamp(percentage, 0, 1);
    const filledLength = Math.floor(clamped * width);
    const filledPart = "=".repeat(filledLength);
    const emptyPart = " ".repeat(width - filledLength);
    return `[${filledPart}${emptyPart}] ${text}`;
  }

  private _getYPosition(operation: string): number {
    const current = this._operationYPositions.get(operation);
    if (current != null) return current;

    const max = this._maxYPosition();
    const position = max == null ? 0 : max + 1;
    this._operationYPositions.set(operation, position);
    return position;
  }

  private _maxYPosition(): number | null {
    const positions = Array.from(this._operationYPositions.values());
    if (positions.length === 0) return null;
    return Math.max(...positions);
  }

  private _moveCursorToYPosition(y: number) {
    const dy = y - this._cursorY;

    if (dy < 0) {
      process.stdout.moveCursor(0, dy);
    }

    for (let i = 0; i < dy; i++) {
      process.stdout.write("\n");
    }
    process.stdout.cursorTo(0);

    this._cursorY = y;
  }
}
