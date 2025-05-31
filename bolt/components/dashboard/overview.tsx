"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, Clock, Eye, FileCheck, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardOverview() {
  // In a real application, this would come from a database or API
  const activeConsents = 3
  const pendingRequests = 1
  const expiringToday = 1
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consent Overview</CardTitle>
        <CardDescription>Monitor your active data sharing permissions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between p-4 rounded-lg bg-primary/10"
        >
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium">Active Consents</p>
              <p className="text-2xl font-bold">{activeConsents}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">View All</Button>
        </motion.div>
        
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-medium">Pending Requests</p>
            </div>
            <Badge variant="outline">{pendingRequests}</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Expiring Today</p>
            </div>
            <Badge variant="outline">{expiringToday}</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium">Access Events (7d)</p>
            </div>
            <Badge variant="outline">12</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-indigo-500" />
              <p className="text-sm font-medium">Documents Shared</p>
            </div>
            <Badge variant="outline">7</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-red-500" />
              <p className="text-sm font-medium">Viewed Today</p>
            </div>
            <Badge variant="outline">3</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}