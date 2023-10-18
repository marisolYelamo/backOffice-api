import { Api400Error } from "./http/httpErrors";

const checkMissingParameters = (body, requiredParameters) => {
  const missingParameters: string[] = [];

  requiredParameters.forEach((prop) => {
    if (body[prop] === undefined) missingParameters.push(prop);
  });

  if (missingParameters.length)
    throw new Api400Error(
      `Missing parameters. Required: ${missingParameters.join(", ")}.`
    );
};

export default checkMissingParameters;
