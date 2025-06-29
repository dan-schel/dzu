// TODO: Move this to js-utils.

// Ripped from Zod v3.25.67 to avoid the peer dependency. May need updating to
// support future Zod versions.
const zodCustom = "custom" as const;
const zodNever = Object.freeze({ status: "aborted" }) as never;
type ZodAddIssueArgs = { code: typeof zodCustom; message: string };
type ZodRefinementCtx = { addIssue: (args: ZodAddIssueArgs) => void };

export function buildZodTransform<I, O>(
  transformFn: (input: I) => O,
  errorMessage?: string,
) {
  return (input: I, ctx: ZodRefinementCtx): O => {
    try {
      return transformFn(input);
    } catch (error) {
      const message =
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : (errorMessage ?? "Failed to transform input");

      ctx.addIssue({
        code: zodCustom,
        message,
      });
      return zodNever;
    }
  };
}
