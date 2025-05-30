export async function askYesNoQuestion(
  question: string,
  defaultAnswer: boolean = false,
): Promise<boolean> {
  const indicator = defaultAnswer ? "Y/n" : "y/N";

  process.stdout.write(`${question} (${indicator}): `);
  let answer = processYesNoAnswer(await readLine());
  while (answer.error === true) {
    process.stdout.write(`Invalid answer. ${question} (${indicator}): `);
    answer = processYesNoAnswer(await readLine());
  }

  return answer.answer ?? defaultAnswer;
}

function processYesNoAnswer(input: string) {
  input = input.trim().toLowerCase();

  if (input === "") {
    return { answer: null };
  } else if (input === "y" || input === "yes") {
    return { answer: true };
  } else if (input === "n" || input === "no") {
    return { answer: false };
  } else {
    return { error: true as const };
  }
}

async function readLine(): Promise<string> {
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
      process.stdin.pause();
    });
  });
}
