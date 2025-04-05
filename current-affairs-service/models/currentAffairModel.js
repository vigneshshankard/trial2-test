const currentAffairSchema = new mongoose.Schema({
  // ...existing fields...
  source_url: {
    type: String,
    required: true,
  },
});