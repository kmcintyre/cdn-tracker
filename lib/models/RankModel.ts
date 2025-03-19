import { Schema, model } from 'mongoose';

interface IRank {
    site: string;
    rank: number;
}

const rankSchema = new Schema<IRank>({
    site: {
        type: String, required: true,
        unique: true,
        index: true
    },
    rank: { type: Number, required: true }
});

const Rank = model('Rank', rankSchema);

export { Rank }