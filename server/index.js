import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ConsentRequest from '../models/consentRequest.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3009', 'http://localhost:3010', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017/consentchain';

// Connect to MongoDB using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Create Document Schema
const documentSchema = new mongoose.Schema({
  owner: { 
    type: String, 
    required: true,
    index: true // Add index for better query performance
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number },
  ipfsHash: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add compound index for owner and createdAt
documentSchema.index({ owner: 1, createdAt: -1 });

const Document = mongoose.model('Document', documentSchema);

// API Routes
app.post('/api/consent', async (req, res) => {
  try {
    console.log('Received consent request:', req.body);
    const request = new ConsentRequest(req.body);
    console.log('Creating new consent request:', request);
    
    await request.save();
    console.log('Consent request saved:', request);
    
    res.status(201).json(request);
  } catch (error) {
    console.error('Error creating consent request:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/consent/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    console.log('Fetching consent request:', requestId);
    
    // Try to find by requestId first (for string IDs)
    let request = await ConsentRequest.findOne({ requestId });
    console.log('Found request by requestId:', request ? {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documentIds: request.documents,
      _id: request._id
    } : 'Not found');
    
    // If not found by requestId, try to find by _id
    if (!request) {
      try {
        request = await ConsentRequest.findById(requestId);
        console.log('Found request by _id:', request ? {
          requestId: request.requestId,
          status: request.status,
          documentCount: request.documents ? request.documents.length : 0,
          documentIds: request.documents,
          _id: request._id
        } : 'Not found');
      } catch (err) {
        console.log('Invalid ObjectId format, continuing with null request');
      }
    }
    
    if (!request) {
      return res.status(404).json({ error: 'Consent request not found' });
    }

    // Log the request before population
    console.log('Request before population:', {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documentIds: request.documents,
      _id: request._id
    });

    // Populate documents
    await request.populate({
      path: 'documents',
      model: 'Document',
      select: 'name type size ipfsHash owner createdAt'
    });
    
    // Log the request after population
    console.log('Request after population:', {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documents: request.documents ? request.documents.map(doc => ({
        id: doc._id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        ipfsHash: doc.ipfsHash,
        owner: doc.owner,
        createdAt: doc.createdAt
      })) : [],
      _id: request._id
    });

    // Convert to plain object and ensure documents are included
    const response = request.toObject();
    response.documents = request.documents || [];

    res.json(response);
  } catch (error) {
    console.error('Error fetching consent request:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/consent/user/:address', async (req, res) => {
  try {
    const { address } = req.params;
    console.log('Fetching consent requests for address:', address);
    
    const requests = await ConsentRequest.find({
      $or: [
        { sender: address },
        { recipient: address }
      ]
    });
    
    console.log('Found requests:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching consent requests:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/consent/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    console.log('Updating consent request:', requestId, req.body);

    // Prepare update object
    const updateObj = { $set: { ...req.body } };

    // Try to find and update by requestId first
    let request = await ConsentRequest.findOneAndUpdate(
      { requestId },
      updateObj,
      { 
        new: true,
        runValidators: true
      }
    );
    console.log('Updated request by requestId:', request ? {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documentIds: request.documents
    } : 'Not found');

    // If not found by requestId, try to find and update by _id
    if (!request) {
      try {
        request = await ConsentRequest.findByIdAndUpdate(
          requestId,
          updateObj,
          { 
            new: true,
            runValidators: true
          }
        );
        console.log('Updated request by _id:', request ? {
          requestId: request.requestId,
          status: request.status,
          documentCount: request.documents ? request.documents.length : 0,
          documentIds: request.documents
        } : 'Not found');
      } catch (err) {
        console.log('Invalid ObjectId format, continuing with null request');
      }
    }

    if (!request) {
      return res.status(404).json({ error: 'Consent request not found' });
    }

    // Populate documents
    await request.populate({
      path: 'documents',
      model: 'Document',
      select: 'name type size ipfsHash owner createdAt'
    });

    console.log('Populated updated request with documents:', {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documents: request.documents ? request.documents.map(doc => ({
        id: doc._id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        ipfsHash: doc.ipfsHash,
        owner: doc.owner,
        createdAt: doc.createdAt
      })) : []
    });
    res.json(request);
  } catch (error) {
    console.error('Error updating consent request:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    console.log('Creating document:', req.body);
    
    // Validate required fields
    const { owner, name, type, size, ipfsHash } = req.body;
    if (!owner || !name || !type || !ipfsHash) {
      console.error('Missing required fields:', { owner, name, type, ipfsHash });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'owner, name, type, and ipfsHash are required'
      });
    }

    // Create document with proper validation
    const document = new Document({
      owner,
      name,
      type,
      size: size || 0,
      ipfsHash,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Save document with error handling
    try {
      const savedDocument = await document.save();
      console.log('Document saved successfully:', {
        id: savedDocument._id,
        name: savedDocument.name,
        type: savedDocument.type,
        ipfsHash: savedDocument.ipfsHash,
        owner: savedDocument.owner
      });
      res.status(201).json(savedDocument);
    } catch (saveError) {
      console.error('Error saving document:', saveError);
      if (saveError.name === 'ValidationError') {
        return res.status(400).json({ 
          error: 'Validation error',
          details: saveError.message
        });
      }
      throw saveError;
    }
  } catch (error) {
    console.error('Error storing document:', error);
    res.status(500).json({ 
      error: 'Failed to store document',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.get('/api/documents/:address', async (req, res) => {
  console.log('--- DEBUG: /api/documents/:address endpoint HIT ---');
  try {
    const { address } = req.params;
    console.log('Fetching documents for address:', address);

    if (!address) {
      console.error('No address provided');
      return res.status(400).json({ error: 'Address is required' });
    }

    // First check if the collection exists
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));

      const documentCollectionExists = collections.some(col => col.name === 'documents');
      console.log('Documents collection exists:', documentCollectionExists);

      if (!documentCollectionExists) {
        console.log('Documents collection does not exist yet');
        return res.json([]);
      }
    } catch (error) {
      console.error('--- DEBUG: Error checking collections:', error);
      return res.status(500).json({ error: error.message, stack: error.stack, full: error });
    }

    // Fetch documents for the address
    const documents = await Document.find({ owner: address });
    console.log('Found documents:', documents.map(doc => ({
      id: doc._id,
      name: doc.name,
      type: doc.type,
      ipfsHash: doc.ipfsHash,
      owner: doc.owner
    })));
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/consent/:requestId/documents', async (req, res) => {
  try {
    const { requestId } = req.params;
    console.log('Fetching documents for consent request:', requestId);
    
    // Try to find by requestId first
    let request = await ConsentRequest.findOne({ requestId });
    
    // If not found by requestId, try to find by _id
    if (!request) {
      try {
        request = await ConsentRequest.findById(requestId);
      } catch (err) {
        console.log('Invalid ObjectId format, continuing with null request');
      }
    }
    
    if (!request) {
      return res.status(404).json({ error: 'Consent request not found' });
    }

    // Get the document IDs from the request
    const documentIds = request.documents || [];
    console.log('Document IDs:', documentIds);

    // Fetch the documents
    const documents = await Document.find({ _id: { $in: documentIds } });
    console.log('Found documents:', documents);

    res.json({
      requestId: request.requestId,
      status: request.status,
      documentCount: documents.length,
      documents: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/documents', async (req, res) => {
  try {
    console.log('Fetching all documents');
    const documents = await Document.find({});
    console.log('Found documents:', documents);
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/debug/documents', async (req, res) => {
  try {
    console.log('Fetching all documents from database');
    const documents = await Document.find({});
    console.log('Found documents:', documents.map(doc => ({
      id: doc._id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      ipfsHash: doc.ipfsHash,
      owner: doc.owner,
      createdAt: doc.createdAt
    })));
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/debug/consent/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    console.log('Debug: Fetching consent request:', requestId);
    
    // Try to find by requestId first
    let request = await ConsentRequest.findOne({ requestId });
    console.log('Debug: Found request by requestId:', request ? {
      requestId: request.requestId,
      status: request.status,
      documentCount: request.documents ? request.documents.length : 0,
      documentIds: request.documents,
      _id: request._id
    } : 'Not found');
    
    if (!request) {
      return res.status(404).json({ error: 'Consent request not found' });
    }

    // Fetch associated documents
    const documents = await Document.find({
      _id: { $in: request.documents }
    });
    
    console.log('Debug: Found associated documents:', documents.map(doc => ({
      id: doc._id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      ipfsHash: doc.ipfsHash,
      owner: doc.owner,
      createdAt: doc.createdAt
    })));

    res.json({
      request,
      documents
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 