import { TravelsLayoutProps } from "@/types";
import TravelCard from "@/components/app/travels/travel-card";

const TravelsLayout = ({ travels }: TravelsLayoutProps) => {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {travels.map((travel, index) => (
                <TravelCard
                    key={index}
                    id={travel.id}
                    destination={travel.destination}
                    startDate={travel.startDate}
                    endDate={travel.endDate}
                />
            ))}
        </div>
    );
}

export default TravelsLayout;