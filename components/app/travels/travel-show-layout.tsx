import { Travel } from "@/types";
import TravelCard from "./travel-card";

const TravelShowLayout = (travel: Travel) => {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
            <TravelCard
                id={travel.id}
                destination={travel.destination}
                startDate={travel.startDate}
                endDate={travel.endDate}
            />
        </div>
    )
}

export default TravelShowLayout;