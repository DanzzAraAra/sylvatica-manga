import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema({
  mangaId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["like", "dislike"], required: true }
});

ReactionSchema.index({ mangaId: 1, userId: 1 }, { unique: true });

export default mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);