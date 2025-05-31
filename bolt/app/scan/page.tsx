"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCode } from 'react-qrcode-logo'
import { toast } from "@/hooks/use-toast"
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Camera, Info, QrCode, RefreshCw, Shield, SmartphoneNfc, Instagram as Telegram } from 'lucide-react'
import TelegramSvg from '@/components/illustrations/telegram'

export default function ScanPage() {
  const [hasCamera, setHasCamera] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  
  useEffect(() => {
    // Check if camera is available
    if (navigator?.mediaDevices?.getUserMedia) {
      setHasCamera(true)
    }
  }, [])
  
  const startScanning = () => {
    setScanning(true)
    
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
      toast({
        title: "Consent QR Code Detected",
        description: "A consent token from ABC Bank was found.",
      })
    }, 3000)
  }
  
  const resetScan = () => {
    setScanning(false)
    setScanned(false)
  }
  
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scan to Consent</h1>
          <p className="text-muted-foreground mb-6">Use QR codes to quickly give or verify consent</p>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Quick Consent</AlertTitle>
            <AlertDescription>
              Scan a QR code to instantly view, approve, or revoke consent requests. You can also generate your own QR code to share.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">QR Scan</h3>
                <p className="text-sm text-muted-foreground">Scan a consent QR code from another device</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <SmartphoneNfc className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Tap to Approve</h3>
                <p className="text-sm text-muted-foreground">Use NFC to instantly approve a consent request</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Telegram className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Telegram Bot</h3>
                <p className="text-sm text-muted-foreground">Receive and approve consent requests via Telegram</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="scan">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scan">Scan QR</TabsTrigger>
              <TabsTrigger value="generate">Generate QR</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Consent QR Code</CardTitle>
                  <CardDescription>
                    Point your camera at a consent QR code to process it
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  {!hasCamera ? (
                    <div className="text-center p-6">
                      <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">Camera Not Available</h3>
                      <p className="text-sm text-muted-foreground">
                        We couldn't access your camera. Please ensure you've granted camera permissions.
                      </p>
                    </div>
                  ) : scanned ? (
                    <div className="text-center p-6 w-full">
                      <Shield className="mx-auto h-12 w-12 text-green-500 mb-4" />
                      <h3 className="font-semibold mb-2">Consent Token Detected</h3>
                      <div className="bg-muted p-4 rounded-lg mb-4 text-sm text-left">
                        <p><strong>Recipient:</strong> ABC Bank</p>
                        <p><strong>Document:</strong> Aadhaar Card</p>
                        <p><strong>Expiry:</strong> April 15, 2025</p>
                        <p><strong>Permissions:</strong> View only</p>
                      </div>
                      <Button 
                        className="w-full mb-2" 
                        onClick={() => toast({ title: "Consent approved!" })}
                      >
                        Approve Consent
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={resetScan}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Scan Again
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full aspect-square max-w-xs relative bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
                      {scanning ? (
                        <>
                          <div className="absolute inset-0 bg-muted/20"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-red-500 animate-pulse"></div>
                          <p className="absolute bottom-4 text-sm font-medium">Scanning...</p>
                        </>
                      ) : (
                        <div className="text-center p-6">
                          <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Camera preview will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  {!scanning && !scanned && (
                    <Button onClick={startScanning}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Scanning
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="generate" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Consent QR</CardTitle>
                  <CardDescription>
                    Create a QR code for one of your active consents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-center p-4">
                      <QRCode 
                        value={"https://consentpass.io/verify/sample-consent-token"} 
                        size={180}
                        quietZone={10}
                        logoImage="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTFDMjAgMTUuOTcwNiAxNS45NzA2IDIwIDExIDIwQzYuMDI5NDQgMjAgMiAxNS45NzA2IDIgMTFDMiA2LjAyOTQ0IDYuMDI5NDQgMiAxMSAyQzE1Ljk3MDYgMiAyMCA2LjAyOTQ0IDIwIDExWiIgc3Ryb2tlPSIjM0I4MkY2IiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTggMThMMjIgMjIiIHN0cm9rZT0iIzNCODJGNiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4="
                        logoWidth={40}
                        logoHeight={40}
                      />
                    </div>
                    
                    <Separator />
                    
                    <p className="text-sm font-medium">Share via Telegram</p>
                    <div className="flex justify-center">
                      <Button className="gap-2">
                        <Telegram className="h-4 w-4" />
                        Send to Telegram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Telegram Integration Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Telegram className="h-5 w-5 text-blue-500" />
                Telegram Integration
              </CardTitle>
              <CardDescription>Connect with our Telegram bot for quick consent management</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-28 h-28 flex-shrink-0">
                <TelegramSvg />
              </div>
              <div className="space-y-2">
                <p className="text-sm">Our Telegram bot allows you to:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Receive consent requests instantly</li>
                  <li>Approve or reject with a single tap</li>
                  <li>Get notifications when your data is accessed</li>
                  <li>Revoke consent remotely</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Telegram className="h-4 w-4" />
                Connect Telegram
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}