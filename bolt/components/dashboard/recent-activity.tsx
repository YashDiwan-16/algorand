"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

// Mock activity data - in a real application this would come from an API/database
const activities = [
  {
    id: "act-1",
    type: "view",
    document: "Aadhaar Card",
    recipient: {
      name: "ABC Bank",
      avatar: "AB",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "act-2",
    type: "revoked",
    document: "Salary Slip",
    recipient: {
      name: "XYZ Corp",
      avatar: "XY",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "act-3", 
    type: "granted",
    document: "Address Proof",
    recipient: {
      name: "Rental Agency",
      avatar: "RA",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "act-4",
    type: "expired",
    document: "PAN Card",
    recipient: {
      name: "Tax Department",
      avatar: "TD",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

// Function to determine badge variant based on activity type
const getBadgeVariant = (type: string) => {
  switch (type) {
    case "view":
      return "secondary"
    case "granted":
      return "success"
    case "revoked":
      return "destructive"
    case "expired":
      return "outline"
    default:
      return "default"
  }
}

export default function RecentActivity() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <Avatar>
                <AvatarFallback>{activity.recipient.avatar}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  <span className="font-bold">{activity.recipient.name}</span>
                  {' '}
                  {activity.type === "view" && "viewed your"}
                  {activity.type === "granted" && "was granted access to your"}
                  {activity.type === "revoked" && "had access revoked to your"}
                  {activity.type === "expired" && "access expired for your"}
                  {' '}
                  <span className="font-medium">{activity.document}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
              
              <Badge variant={getBadgeVariant(activity.type)}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}