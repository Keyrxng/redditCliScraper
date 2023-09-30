import Ajv, { ValidateFunction } from "ajv";
const ajv = new Ajv();

const subredditSchema = {
    type: "object",
    properties: {
        subredditOrCommand: { type: "string" },
        filterOrSubreddit: { type: "string" },
        storyCount: { type: "integer", minimum: 1, maximum: 100 },
    },
    required: ["subredditOrCommand"],
};

const authenticationSchema = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" },
    },
    required: ["username", "password"],
};

export const validSubInput = ajv.compile(subredditSchema);
export const validAuthInput = ajv.compile(authenticationSchema);


export function validateInput(validate: ValidateFunction, data: object): boolean {
    const valid = validate(data);
    if (!valid) {
        // eslint-disable-next-line no-console
        console.error(validate.errors);
    }
    return valid;
  }
  