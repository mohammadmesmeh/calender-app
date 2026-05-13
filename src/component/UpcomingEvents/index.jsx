
import { EventCard } from "../EventCard";
import { events } from "../../Mock Data/data";
export const UpcomingEvents = () => {

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

      <ul className="flex flex-col overflow-y-auto gap-4 max-h-64">
        {
          events.map((event, index) => {

            return (
              <EventCard key={index} {...event} />
            )
          })
        }
      </ul>
    </div>
  );
};
