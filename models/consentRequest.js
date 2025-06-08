import mongoose from 'mongoose';

const consentRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  documentTypes: [{
    type: String,
    required: true
  }],
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'granted', 'revoked'],
    default: 'pending'
  },
  permissions: {
    view: { type: Boolean, default: true },
    edit: { type: Boolean, default: false },
    download: { type: Boolean, default: false },
    screenshot: { type: Boolean, default: false }
  },
  expiry: Date,
  grantedAt: Date,
  revokedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  ipfsHash: {
    type: String,
    required: false
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
});

// Add indexes for better query performance
consentRequestSchema.index({ sender: 1, status: 1 });
consentRequestSchema.index({ recipient: 1, status: 1 });

const ConsentRequest = mongoose.model('ConsentRequest', consentRequestSchema);

export default ConsentRequest; 