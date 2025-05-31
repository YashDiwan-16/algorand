"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for charts
const consentsByType = [
  { name: "View Only", value: 40 },
  { name: "View & Download", value: 30 },
  { name: "One-Time", value: 20 },
  { name: "Full Access", value: 10 },
]

const consentsByDocument = [
  { name: "Aadhaar", value: 5 },
  { name: "PAN Card", value: 3 },
  { name: "Bank Statement", value: 2 },
  { name: "Salary Slip", value: 4 },
  { name: "Address Proof", value: 1 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export default function ConsentStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consent Analytics</CardTitle>
        <CardDescription>Track and analyze your consent patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="by-type">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="by-type">By Permission Type</TabsTrigger>
            <TabsTrigger value="by-document">By Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="by-type" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consentsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {consentsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {consentsByType.map((type, index) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs font-medium">{type.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="by-document">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={consentsByDocument}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}