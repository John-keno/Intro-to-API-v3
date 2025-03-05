import { Document } from 'mongoose';
export interface Note {
    id?: number;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface NoteDocument extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}