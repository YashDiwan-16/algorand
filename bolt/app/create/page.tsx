"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCode } from 'react-qrcode-logo'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CalendarIcon, Clipboard, FileText, Link2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import CreateConsentSvg from "@/components/illustrations/create-consent"

// Form schema validation
const formSchema = z.object({
  recipientName: z.string().min(2, { message: "Recipient name is required" }),
  recipientWallet: z.string().min(10, { message: "Valid wallet address is required" }),
  documentType: z.string().min(1, { message: "Document type is required" }),
  expiry: z.date().min(new Date(), { message: "Expiry date must be in the future" }),
  accessDays: z.number().min(1).max(365),
  permissions: z.object({
    view: z.boolean(),
    download: z.boolean(),
    share: z.boolean(),
  }),
  notificationPreference: z.string(),
})

export default function CreateConsentPage() {
  const [step, setStep] = useState(1)
  const [consentCreated, setConsentCreated] = useState(false)
  const [qrValue, setQrValue] = useState("")
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: "",
      recipientWallet: "",
      documentType: "",
      expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      accessDays: 7,
      permissions: {
        view: true,
        download: false,
        share: false,
      },
      notificationPreference: "telegram",
    },
  })
  
  const updateExpiryFromSlider = (value: number[]) => {
    const days = value[0]
    const newDate = new Date()
    newDate.setDate(newDate.getDate() + days)
    form.setValue("expiry", newDate)
    form.setValue("accessDays", days)
  }
  
  const updateSliderFromExpiry = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(date.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    form.setValue("accessDays", diffDays)
  }
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would create a consent token on the blockchain
    console.log(values)
    
    // Generate a fake consent token and QR code
    const consentToken = {
      id: `consent-${Math.random().toString(36).substring(2, 10)}`,
      recipientName: values.recipientName,
      recipientWallet: values.recipientWallet,
      documentType: values.documentType,
      expiry: values.expiry.toISOString(),
      permissions: values.permissions,
    }
    
    setQrValue(JSON.stringify(consentToken))
    setConsentCreated(true)
    setStep(2)
    
    toast({
      title: "Consent created successfully!",
      description: "Your consent token has been created and is ready to share.",
    })
  }
  
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Consent</h1>
          <p className="text-muted-foreground mb-6">Define who can access your documents and for how long</p>
          
          <div className="relative hidden md:block h-[400px] mt-10">
            <CreateConsentSvg />
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form" disabled={step === 2}>Consent Details</TabsTrigger>
              <TabsTrigger value="share" disabled={step === 1}>Share Consent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Document Consent</CardTitle>
                  <CardDescription>
                    Create a new consent token to share your documents securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="recipientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Recipient Name</FormLabel>
                              <FormControl>
                                <Input placeholder="E.g., ABC Bank, XYZ Corp" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="recipientWallet"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Recipient Wallet Address</FormLabel>
                              <FormControl>
                                <Input placeholder="0x..." {...field} />
                              </FormControl>
                              <FormDescription>
                                The blockchain address of the recipient
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="documentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select document" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                                  <SelectItem value="pan">PAN Card</SelectItem>
                                  <SelectItem value="salary">Salary Slip</SelectItem>
                                  <SelectItem value="address">Address Proof</SelectItem>
                                  <SelectItem value="bank">Bank Statement</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-2">
                          <FormLabel>Access Duration</FormLabel>
                          <div className="space-y-4">
                            <Slider 
                              value={[form.watch("accessDays")]} 
                              min={1} 
                              max={30} 
                              step={1}
                              onValueChange={updateExpiryFromSlider}
                            />
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">1 day</span>
                              <span className="text-sm font-medium">{form.watch("accessDays")} days</span>
                              <span className="text-xs text-muted-foreground">30 days</span>
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem className="flex flex-col mt-2">
                                <FormLabel>Expiry Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        field.onChange(date);
                                        if (date) updateSliderFromExpiry(date);
                                      }}
                                      disabled={(date) =>
                                        date < new Date()
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel>Access Permissions</FormLabel>
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name="permissions.view"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                      disabled 
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    View (Always required)
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="permissions.download"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    Download
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="permissions.share"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    Share with others
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="notificationPreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notification Preference</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select notification preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="telegram">Telegram</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Create Consent Token</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="share">
              <Card>
                <CardHeader>
                  <CardTitle>Share Consent</CardTitle>
                  <CardDescription>
                    Your consent token has been created and is ready to share
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    {qrValue && (
                      <div className="p-4 bg-white rounded-lg">
                        <QRCode 
                          value={qrValue} 
                          size={200}
                          quietZone={10}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Consent Token ID</Label>
                    <div className="flex gap-2">
                      <Input value="0xf7a8...3d21" readOnly />
                      <Button variant="outline" size="icon">
                        <Clipboard className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This token is stored on the blockchain and uniquely identifies this consent.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Share via:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">
                        <Link2 className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Send to Telegram
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back to Form
                  </Button>
                  <Button onClick={() => window.location.href = "/consents"}>
                    View All Consents
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}