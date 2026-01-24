import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mangaId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

FavoriteSchema.index({ userId: 1, mangaId: 1 }, { unique: true });

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);