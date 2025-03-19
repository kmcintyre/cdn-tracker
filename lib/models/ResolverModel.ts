import { Schema, model } from 'mongoose';

interface IResolver {
    domain: string;
    resolvesTo: string;
}

const resolverSchema = new Schema<IResolver>({
    domain: {
        type: String, required: true,
        unique: true,
        index: true
    },
    resolvesTo: { type: String, required: true }
});

const Resolver = model('Resolver', resolverSchema);

export { Resolver }