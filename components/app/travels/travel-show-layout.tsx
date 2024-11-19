import { Travel } from "@/types";
import TravelCard from "./travel-card";
import TravelFiles from "./travel-files";
import TravelActivities from "./travel-activities";

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
        </div>
    )
}

export default TravelShowLayout;