"use client";
import React, { useState, useEffect, ReactNode, Key } from "react";

interface Event {
  eventsDetails: any;
  email: ReactNode;
  _id: Key | null | undefined;
  id: string;
  title: string;
  description: string;
  date: string;
}

const CreateEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch event data when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/dashboard/event");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Event[] = await response.json();
      
        setEvents(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: string) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("en-GB"); // Formats date to DD-MM-YYYY
  };

  if (loading)
    return (
      <div className="text-center text-lg font-semibold text-gray-700">
        Loading events...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Organizer: {event.email}
            </h3>
            <div className="space-y-4">
              {event?.eventsDetails.map(
                (
                  detail: {
                    eventName: string;
                    eventTime: string;
                    eventType: string;
                    timeStamp: string;
                    description: string;
                    duration: string;
                    eventDate: string;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 space-y-1"
                  >
                    <p className="text-sm">
                      <span className="font-semibold">Event Name:</span>{" "}
                      {detail.eventName}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Event Date:</span>{" "}
                      {formatDate(detail.eventDate)}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Event Time:</span>{" "}
                      {detail.eventTime}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Event Type:</span>{" "}
                      {detail.eventType}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Duration:</span>{" "}
                      {detail.duration}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Description:</span>{" "}
                      {detail.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Timestamp: {detail.timeStamp}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateEvent;
