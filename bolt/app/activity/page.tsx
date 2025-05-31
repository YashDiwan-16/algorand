"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarIcon, Search, Filter, ChevronDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import ActivityTimeline from "@/components/activity/timeline"

export default function ActivityPage() {
  const [date, setDate] = useState<Date>()
  const [search, setSearch] = useState("")
  const [activityType, setActivityType] = useState<string[]>(["view", "granted", "revoked", "expired"])
  
  const toggleActivityType = (type: string) => {
    if (activityType.includes(type)) {
      setActivityType(activityType.filter(t => t !== type))
    } else {
      setActivityType([...activityType, type])
    }
  }
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Activity Log</h1>
            <p className="text-muted-foreground">Track access to your documents</p>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuCheckboxItem
                  checked={activityType.includes("view")}
                  onCheckedChange={() => toggleActivityType("view")}
                >
                  View Events
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activityType.includes("granted")}
                  onCheckedChange={() => toggleActivityType("granted")}
                >
                  Granted Events
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activityType.includes("revoked")}
                  onCheckedChange={() => toggleActivityType("revoked")}
                >
                  Revoked Events
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activityType.includes("expired")}
                  onCheckedChange={() => toggleActivityType("expired")}
                >
                  Expired Events
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search activities..." 
            className="pl-10" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">All Activities</p>
            <p className="text-3xl font-bold">152</p>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Views</p>
            <p className="text-3xl font-bold">87</p>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Grants</p>
            <p className="text-3xl font-bold">42</p>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Revokes</p>
            <p className="text-3xl font-bold">23</p>
          </Card>
        </div>
        
        <ActivityTimeline />
        
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}