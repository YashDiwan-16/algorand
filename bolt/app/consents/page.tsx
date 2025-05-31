"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Clock, CheckCircle2, AlertTriangle, XCircle, Link2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock consent data
const consents = [
  {
    id: "consent-1",
    recipient: "ABC Bank",
    documentType: "Aadhaar Card",
    permissions: ["view"],
    status: "active",
    expiry: "2025-06-15",
    created: "2025-03-10",
    lastAccessed: "2025-03-15",
  },
  {
    id: "consent-2",
    recipient: "XYZ Corp HR",
    documentType: "Salary Slip",
    permissions: ["view", "download"],
    status: "active",
    expiry: "2025-04-30",
    created: "2025-03-01",
    lastAccessed: "2025-03-12",
  },
  {
    id: "consent-3",
    recipient: "Rental Agency",
    documentType: "Address Proof",
    permissions: ["view"],
    status: "pending",
    expiry: "2025-05-15",
    created: "2025-03-14",
    lastAccessed: null,
  },
  {
    id: "consent-4",
    recipient: "Tax Department",
    documentType: "PAN Card",
    permissions: ["view", "download"],
    status: "revoked",
    expiry: "2025-07-10",
    created: "2025-02-20",
    lastAccessed: "2025-03-05",
  },
  {
    id: "consent-5",
    recipient: "University Admissions",
    documentType: "Mark Sheets",
    permissions: ["view"],
    status: "expired",
    expiry: "2025-03-01",
    created: "2025-01-15",
    lastAccessed: "2025-02-28",
  },
]

export default function ConsentsPage() {
  const [search, setSearch] = useState("")
  
  const filteredConsents = consents.filter(consent => 
    consent.recipient.toLowerCase().includes(search.toLowerCase()) ||
    consent.documentType.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Consents</h1>
            <p className="text-muted-foreground">Manage who has access to your documents</p>
          </div>
          
          <Button asChild>
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              Create New Consent
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by recipient or document..." 
            className="pl-10" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="revoked">Revoked</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4">
              {filteredConsents.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No consents found</p>
                </div>
              ) : (
                filteredConsents.map(consent => (
                  <ConsentCard key={consent.id} consent={consent} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4">
              {filteredConsents.filter(c => c.status === 'active').map(consent => (
                <ConsentCard key={consent.id} consent={consent} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <div className="grid gap-4">
              {filteredConsents.filter(c => c.status === 'pending').map(consent => (
                <ConsentCard key={consent.id} consent={consent} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="revoked" className="mt-4">
            <div className="grid gap-4">
              {filteredConsents.filter(c => c.status === 'revoked').map(consent => (
                <ConsentCard key={consent.id} consent={consent} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="expired" className="mt-4">
            <div className="grid gap-4">
              {filteredConsents.filter(c => c.status === 'expired').map(consent => (
                <ConsentCard key={consent.id} consent={consent} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ConsentCard({ consent }: { consent: any }) {
  const getStatusIcon = () => {
    switch (consent.status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />
      case 'revoked':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }
  
  const getStatusBadge = () => {
    switch (consent.status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Active</Badge>
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">Pending</Badge>
      case 'revoked':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Revoked</Badge>
      case 'expired':
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20">Expired</Badge>
      default:
        return null
    }
  }
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-stretch">
          <div className={cn(
            "w-full sm:w-2 h-2 sm:h-auto",
            consent.status === 'active' && "bg-green-500",
            consent.status === 'pending' && "bg-amber-500",
            consent.status === 'revoked' && "bg-red-500",
            consent.status === 'expired' && "bg-gray-500",
          )} />
          
          <div className="flex-1 p-6">
            <div className="flex flex-wrap gap-4 justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {getStatusIcon()}
                  {consent.recipient}
                </h3>
                <p className="text-sm text-muted-foreground">{consent.documentType}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Created: {new Date(consent.created).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Expires: {new Date(consent.expiry).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 items-center">
                {getStatusBadge()}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex gap-1 flex-wrap">
                {consent.permissions.includes('view') && (
                  <Badge variant="secondary">View Only</Badge>
                )}
                {consent.permissions.includes('download') && (
                  <Badge variant="secondary">Download</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/40 px-6 py-3 justify-between">
        <div className="text-xs text-muted-foreground">
          {consent.lastAccessed 
            ? `Last accessed: ${new Date(consent.lastAccessed).toLocaleDateString()}`
            : "Never accessed"}
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Details</Button>
          {consent.status === 'active' && (
            <Button variant="destructive" size="sm">Revoke</Button>
          )}
          {consent.status === 'pending' && (
            <Button variant="destructive" size="sm">Cancel</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}