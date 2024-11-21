"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TravelActivity } from "@/types"
import { Calendar, ChevronLeft, ChevronRight, MapPin, Plus } from "lucide-react";
import { useState } from "react";

const TravelActivities = () => {
    const activities: TravelActivity[] = [
        { id: "1", date: "2024-11-24", name: "British museum", location: "Londres, Royaume-Unis" },
        { id: "2", date: "2024-11-25", name: "Visite Westminster", location: "Londres, Royaume-Unis" },
        { id: "3", date: "2024-11-26", name: "Studio Harry Potter", location: "Londres, Royaume-Unis" },
        { id: "4", date: "2024-11-27", name: "London Designer Outlet", location: "Londres, Royaume-Unis" },
        { id: "5", date: "2024-11-28", name: "HMS Belfast", location: "Londres, Royaume-Unis" },
        { id: "6", date: "2024-11-28", name: "Winter Wonderland", location: "Londres, Royaume-Unis" },
    ];

    const sortedActivities = activities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const uniqueDates = Array.from(new Set(sortedActivities.map(a => a.date)))
    const [currentDateIndex, setCurrentDateIndex] = useState(0)

    const currentDate = uniqueDates[currentDateIndex]
    const formattedDate = new Date(currentDate).toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })
    const currentActivities = sortedActivities.filter(a => a.date === currentDate)

    const goToPreviousDate = () => {
        setCurrentDateIndex(prev => (prev > 0 ? prev - 1 : prev))
    }

    const goToNextDate = () => {
        setCurrentDateIndex(prev => (prev < uniqueDates.length - 1 ? prev + 1 : prev))
    }

    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Activités du Voyage</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPreviousDate}
                        disabled={currentDateIndex === 0}
                        aria-label="Date précédente"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-semibold flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-primary" />
                        {formattedDate}
                    </h3>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextDate}
                        disabled={currentDateIndex === uniqueDates.length - 1}
                        aria-label="Date suivante"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <ScrollArea className="h-[300px]">
                    <ul className="space-y-3">
                        {currentActivities.map((activity) => (
                        <li key={activity.id} className="bg-muted rounded-lg p-3">
                            <h4 className="font-medium mb-1">{activity.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {activity.location}
                            </p>
                        </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une activité
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TravelActivities;