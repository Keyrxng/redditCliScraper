import Ajv, { ValidateFunction } from 'ajv'
const ajv = new Ajv()

const searchSchema = {
    type: 'object',
    properties: {
        query: { type: 'string' },
    },
    required: ['query'],
}

const sortSchema = {
    type: 'object',
    properties: {
        subreddit: { type: 'string' },
        sortType: {
            type: 'string',
            enum: ['hot', 'new', 'top', 'controversial'],
        },
        storyCount: { type: 'integer', minimum: 1, maximum: 100 },
    },
    required: ['subreddit', 'sortType'],
}

const authenticationSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
}

export const validSearchInput = ajv.compile(searchSchema)
export const validSortInput = ajv.compile(sortSchema)
export const validAuthInput = ajv.compile(authenticationSchema)

export function validateInput(
    validate: ValidateFunction,
    data: object
): boolean {
    const valid = validate(data)
    if (!valid) {
        console.error(validate.errors)
    }
    return valid
}
