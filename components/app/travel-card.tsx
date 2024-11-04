import { TravelCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { calculateDuration, formatDate } from "@/lib/utils";

const TravelCard = ({ destination, startDate, endDate }: TravelCardProps) => {
    const duration = calculateDuration(startDate, endDate);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    {destination}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-2">
                    <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-sm font-medium text-gray-600">Dates de voyage</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-lg font-semibold mb-1 sm:mb-0">{formatDate(startDate)}</div>
                    <ArrowRight className="hidden sm:block w-5 h-5 text-gray-400 mx-2" />
                    <div className="text-lg font-semibold mb-1 sm:mb-0">{formatDate(endDate)}</div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                    Durée : {duration} jour{duration !== 1 ? "s" : ""} 
                </div>
            </CardContent>
        </Card>
    )
}

export default TravelCard;