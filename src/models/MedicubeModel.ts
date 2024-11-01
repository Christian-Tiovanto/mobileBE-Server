import { model, Schema, Types } from "mongoose";

export interface IMedicube {
  is_verified: boolean;
  phone_number: string;
  owner: Types.ObjectId;
  schedule: Array<string>;
}

const medicubeSchema = new Schema<IMedicube>({
  is_verified: { type: Boolean, default: false },
  phone_number: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  schedule: [String],
});

const Medicube = model<IMedicube>("medicube", medicubeSchema);
export default Medicube;
