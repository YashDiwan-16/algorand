import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField, 
  Card, 
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  AccountCircle, 
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import algosdk from 'algosdk';
import { getAlgodClient } from '@algorandfoundation/algokit-utils';

interface Consent {
  id: string;
  recipient: string;
  scope: string;
  expiry: number;
  status: string;
  metadata: string;
}

function App() {
  const [account, setAccount] = useState<string>('');
  const [consents, setConsents] = useState<Consent[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newConsent, setNewConsent] = useState({
    recipient: '',
    scope: '',
    expiry: '',
    metadata: ''
  });

  useEffect(() => {
    // Connect to wallet and load consents
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      // Implement wallet connection logic here
      // This is a placeholder for actual wallet integration
      setAccount('DEMO_ACCOUNT');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleGrantConsent = async () => {
    try {
      const algodClient = getAlgodClient();
      
      // Create transaction
      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: account,
        appIndex: 0, // Replace with actual app ID
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs: [
          new Uint8Array(Buffer.from('grant_consent')),
          new Uint8Array(Buffer.from(newConsent.recipient)),
          new Uint8Array(Buffer.from(newConsent.scope)),
          new Uint8Array(Buffer.from(newConsent.metadata))
        ],
        suggestedParams: await algodClient.getTransactionParams().do()
      });

      // Sign and send transaction
      // Implement actual transaction signing and sending logic here

      setOpenDialog(false);
      // Refresh consents
      loadConsents();
    } catch (error) {
      console.error('Error granting consent:', error);
    }
  };

  const handleRevokeConsent = async (consentId: string) => {
    try {
      const algodClient = getAlgodClient();
      
      // Create transaction
      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: account,
        appIndex: 0, // Replace with actual app ID
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs: [
          new Uint8Array(Buffer.from('revoke_consent'))
        ],
        suggestedParams: await algodClient.getTransactionParams().do()
      });

      // Sign and send transaction
      // Implement actual transaction signing and sending logic here

      // Refresh consents
      loadConsents();
    } catch (error) {
      console.error('Error revoking consent:', error);
    }
  };

  const loadConsents = async () => {
    // Implement loading consents from blockchain
    // This is a placeholder for actual data loading
    setConsents([
      {
        id: '1',
        recipient: '0x123...',
        scope: 'medical',
        expiry: Date.now() + 86400000,
        status: 'active',
        metadata: 'Patient records'
      }
    ]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Consent Manager
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Your Consents</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Grant New Consent
          </Button>
        </Box>

        <Grid container spacing={3}>
          {consents.map((consent) => (
            <Grid item xs={12} md={6} key={consent.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{consent.scope}</Typography>
                  <Typography color="textSecondary">
                    Recipient: {consent.recipient}
                  </Typography>
                  <Typography color="textSecondary">
                    Expires: {new Date(consent.expiry).toLocaleDateString()}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {consent.status}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton onClick={() => handleRevokeConsent(consent.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Grant New Consent</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Recipient Address"
            fullWidth
            value={newConsent.recipient}
            onChange={(e) => setNewConsent({ ...newConsent, recipient: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Scope"
            fullWidth
            value={newConsent.scope}
            onChange={(e) => setNewConsent({ ...newConsent, scope: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Expiry (days)"
            type="number"
            fullWidth
            value={newConsent.expiry}
            onChange={(e) => setNewConsent({ ...newConsent, expiry: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Metadata"
            fullWidth
            multiline
            rows={4}
            value={newConsent.metadata}
            onChange={(e) => setNewConsent({ ...newConsent, metadata: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleGrantConsent} variant="contained">
            Grant Consent
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App; 