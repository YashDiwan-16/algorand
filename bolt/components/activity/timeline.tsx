"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { format } from "date-fns"

// Mock data for the activity timeline
const activities = [
  {
    id: 1,
    date: new Date(2025, 2, 15, 14, 30),
    type: "view",
    recipient: {
      name: "ABC Bank",
      avatar: "AB",
    },
    document: "Aadhaar Card",
    details: "Accessed from 10.0.0.123 via secure viewer",
    consent: "consent-1",
  },
  {
    id: 2,
    date: new Date(2025, 2, 15, 11, 15),
    type: "granted",
    recipient: {
      name: "XYZ Corp HR",
      avatar: "XY",
    },
    document: "Salary Slip",
    details: "Permissions: view, download",
    consent: "consent-2",
  },
  {
    id: 3,
    date: new Date(2025, 2, 14, 17, 45),
    type: "revoked",
    recipient: {
      name: "Tax Department",
      avatar: "TD",
    },
    document: "PAN Card",
    details: "Manual revocation by user",
    consent: "consent-4",
  },
  {
    id: 4,
    date: new Date(2025, 2, 14, 9, 20),
    type: "view",
    recipient: {
      name: "ABC Bank",
      avatar: "AB",
    },
    document: "Aadhaar Card",
    details: "Accessed from 10.0.0.123 via secure viewer",
    consent: "consent-1",
  },
  {
    id: 5,
    date: new Date(2025, 2, 13, 15, 10),
    type: "granted",
    recipient: {
      name: "Rental Agency",
      avatar: "RA",
    },
    document: "Address Proof",
    details: "Permissions: view",
    consent: "consent-3",
  },
  {
    id: 6,
    date: new Date(2025, 2, 12, 23, 59),
    type: "expired",
    recipient: {
      name: "University Admissions",
      avatar: "UA",
    },
    document: "Mark Sheets",
    details: "Expired automatically",
    consent: "consent-5",
  },
]

// Group activities by date
const groupByDate = (activities: any[]) => {
  const groups: { [key: string]: any[] } = {}
  
  activities.forEach(activity => {
    const date = format(activity.date, 'yyyy-MM-dd')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
  })
  
  return Object.entries(groups)
}

// Function to get badge variant based on activity type
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

export default function ActivityTimeline() {
  const groupedActivities = groupByDate(activities)
  
  return (
    <div className="space-y-8">
      {groupedActivities.map(([date, dayActivities], groupIndex) => (
        <div key={date} className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">
            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
          </h3>
          
          <div className="space-y-4">
            {dayActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: (groupIndex * 0.1) + (index * 0.05),
                  duration: 0.3
                }}
              >
                <div className="flex gap-4">
                  <div className="w-12 flex-shrink-0 text-sm text-muted-foreground">
                    {format(activity.date, 'HH:mm')}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarFallback>{activity.recipient.avatar}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 bg-card border rounded-lg p-4">
                    <div className="flex flex-wrap gap-2 items-center justify-between mb-1">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium">{activity.recipient.name}</span>
                        <Badge variant={getBadgeVariant(activity.type)}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Consent #{activity.consent.split('-')[1]}
                      </span>
                    </div>
                    
                    <p className="mb-2">
                      {activity.type === "view" && (
                        <span>Viewed your <strong>{activity.document}</strong></span>
                      )}
                      {activity.type === "granted" && (
                        <span>Was granted access to your <strong>{activity.document}</strong></span>
                      )}
                      {activity.type === "revoked" && (
                        <span>Had access revoked to your <strong>{activity.document}</strong></span>
                      )}
                      {activity.type === "expired" && (
                        <span>Access expired for your <strong>{activity.document}</strong></span>
                      )}
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                </div>
                
                {index < dayActivities.length - 1 && (
                  <div className="ml-16 my-4">
                    <Separator className="h-8 w-px bg-border" orientation="vertical" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}