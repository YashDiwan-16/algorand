import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  source: 'digilocker' | 'upload';
}

const DigiLocker: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to connect to DigiLocker
  const connectDigiLocker = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock documents from DigiLocker
      const mockDocuments: Document[] = [
        {
          id: '1',
          name: 'Aadhaar Card',
          type: 'PDF',
          size: '2.5 MB',
          date: '2024-03-15',
          source: 'digilocker'
        },
        {
          id: '2',
          name: 'PAN Card',
          type: 'PDF',
          size: '1.8 MB',
          date: '2024-03-15',
          source: 'digilocker'
        },
        {
          id: '3',
          name: 'Driving License',
          type: 'PDF',
          size: '3.2 MB',
          date: '2024-03-15',
          source: 'digilocker'
        }
      ];

      setDocuments(mockDocuments);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to DigiLocker:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      // Create form data for Pinata upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to Pinata
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NWQ2NDhlMy03ZGQwLTQxZjEtODg3Yi1kNDYzNGNjMGYwYmEiLCJlbWFpbCI6InNhcnRoYWtuaW1qZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2YxZDdiOGQ0MjllYTg0ZjcyNjMiLCJzY29wZWRLZXlTZWNyZXQiOiJiNjljOTgyNTkwNDYyNWI3OTc1NDZhZTE3NDU4NTFhZTBhNzUwODE3NDg0NDUxOWUwMmQ1NDM1MTJlYjNkYzllIiwiZXhwIjoxNzc5NjA0MDgzfQ.2Es9XUQF85i2vvNYhotN3KOhUG-O8jxqFGLmAOkEbHU'
        },
        body: formData
      });

      const data = await response.json();

      // Add new document to the list
      const newDocument: Document = {
        id: data.IpfsHash,
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date().toISOString().split('T')[0],
        source: 'upload'
      };

      setDocuments(prev => [...prev, newDocument]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!isConnected ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectDigiLocker}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DocumentIcon className="w-5 h-5" />
          {isLoading ? 'Connecting...' : 'Connect DigiLocker'}
        </motion.button>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Your Documents
            </h3>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white rounded-lg hover:border-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowUpTrayIcon className="w-5 h-5" />
                Upload Document
              </motion.div>
            </label>
          </div>

          <div className="grid gap-4">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-green-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <DocumentIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{doc.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {doc.type} • {doc.size} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
                      {doc.source}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigiLocker; 