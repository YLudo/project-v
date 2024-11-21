import { Travel } from "@/types";
import TravelCard from "@/components/app/travels/travel-card";
import TravelFiles from "@/components/app/travels/travel-files";
import TravelActivities from "@/components/app/travels/travel-activities";
import TravelMap from "@/components/app/travels/travel-map";

const TravelShowLayout = (travel: Travel) => {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
                <TravelCard
                    id={travel.id}
                    destination={travel.destination}
                    startDate={travel.startDate}
                    endDate={travel.endDate}
                />
                <TravelFiles />
            </div>
            <TravelActivities />
            <TravelMap />
        </div>
    )
}

export default TravelShowLayout;