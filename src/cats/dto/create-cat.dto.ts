import Joi from 'joi';

export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}
export const createCatSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
})