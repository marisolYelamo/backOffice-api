import { Api400Error } from "./http/httpErrors";

const checkNotAllowedParameters = (body, allowedParameters) => {
  const notAllowedParameters: string[] = [];

  for (const prop in body)
    if (!allowedParameters.includes(prop)) notAllowedParameters.push(prop);

  if (notAllowedParameters.length)
    throw new Api400Error(
      `Unexpected parameters. Not allowed: ${notAllowedParameters.join(", ")}.`
    );
};

export default checkNotAllowedParameters;
