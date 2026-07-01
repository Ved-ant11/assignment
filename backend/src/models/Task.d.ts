import mongoose, { Document } from 'mongoose';
export interface ITask extends Document {
    title: string;
    completed: boolean;
}
export declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, mongoose.DefaultSchemaOptions> & ITask & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITask>;
//# sourceMappingURL=Task.d.ts.map