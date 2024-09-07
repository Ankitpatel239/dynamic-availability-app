"use client";

import React, { useState } from "react";
import Select from "react-select";

const CreateEvent: React.FC = () => {
  const inputClasses =
    "w-full mt-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300";
  const buttonClasses =
    "bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105";

  const options = [
    { value: "one-to-one", label: "One-to-One" },
    { value: "group", label: "Group" },
  ];
  const duration = [
    { value: "15min", label: "15 min" },
    { value: "30min", label: "30 min" },
    { value: "45min", label: "45 min" },
    { value: "1hr", label: "1 hr" },
    { value: "1hr 30min", label: "1 hr 30 min" },
    { value: "2hr", label: "2 hr" },
  ];
  const time = [
    { value: "12:00 AM", label: "12:00 AM" },
    { value: "12:30 AM", label: "12:30 AM" },
    { value: "1:00 AM", label: "1:00 AM" },
    { value: "1:30 AM", label: "1:30 AM" },
    { value: "2:00 AM", label: "2:00 AM" },
    { value: "2:30 AM", label: "2:30 AM" },
    { value: "3:00 AM", label: "3:00 AM" },
    { value: "3:30 AM", label: "3:30 AM" },
    { value: "4:00 AM", label: "4:00 AM" },
    { value: "4:30 AM", label: "4:30 AM" },
    { value: "5:00 AM", label: "5:00 AM" },
    { value: "5:30 AM", label: "5:30 AM" },
    { value: "6:00 AM", label: "6:00 AM" },
    { value: "6:30 AM", label: "6:30 AM" },
    { value: "7:00 AM", label: "7:00 AM" },
    { value: "7:30 AM", label: "7:30 AM" },
    { value: "8:00 AM", label: "8:00 AM" },
    { value: "8:30 AM", label: "8:30 AM" },
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "9:30 AM", label: "9:30 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "12:30 PM", label: "12:30 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "1:30 PM", label: "1:30 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "2:30 PM", label: "2:30 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "3:30 PM", label: "3:30 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "4:30 PM", label: "4:30 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
    { value: "5:30 PM", label: "5:30 PM" },
    { value: "6:00 PM", label: "6:00 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "7:00 PM", label: "7:00 PM" },
    { value: "7:30 PM", label: "7:30 PM" },
    { value: "8:00 PM", label: "8:00 PM" },
    { value: "8:30 PM", label: "8:30 PM" },
    { value: "9:00 PM", label: "9:00 PM" },
    { value: "9:30 PM", label: "9:30 PM" },
    { value: "10:00 PM", label: "10:00 PM" },
    { value: "10:30 PM", label: "10:30 PM" },
    { value: "11:00 PM", label: "11:00 PM" },
    { value: "11:30 PM", label: "11:30 PM" },
  ];

  const [events, setEvents] = useState<any[]>([]);

  // State for the current event being added
  const [currentEvent, setCurrentEvent] = useState<{
    eventType: any;
    eventDuration: any;
    eventName: string;
    eventDate: string;
    eventTime: { value: string; label: string } | null;
    eventDescription: string;
  }>({
    eventType: null,
    eventDuration: null,
    eventName: "",
    eventDate: "",
    eventTime: null,
    eventDescription: "",
  });
const [text, setText] = useState("Submit All Events");
  const handleAddEvent = () => {
    setEvents([...events, currentEvent]);
    setCurrentEvent({
      eventType: null,
      eventDuration: null,
      eventName: "",
      eventDate: "",
      eventTime: null,
      eventDescription: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/dashboard/event/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setText("Events Created Successfully");
      console.log("Events created successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
          Create an Event
        </h2>

        {events.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Events List</h3>
            {events.map((event, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm transition-transform transform hover:scale-105"
              >
                <h4 className="text-lg font-medium mb-1">Event {index + 1}</h4>
                <p><strong>Name:</strong> {event.eventName}</p>
                <p><strong>Date:</strong> {event.eventDate}</p>
                <p><strong>Time:</strong> {event.eventTime?.label}</p>
                <p><strong>Description:</strong> {event.eventDescription}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form to add one event */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label htmlFor="event-type" className="block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <Select
                options={options}
                id="event-type"
                name="event-type"
                className="mt-1"
                value={currentEvent.eventType}
                onChange={(selectedOption) =>
                  setCurrentEvent({ ...currentEvent, eventType: selectedOption })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="event-duration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <Select
                options={duration}
                id="event-duration"
                name="event-duration"
                className="mt-1"
                value={currentEvent.eventDuration}
                onChange={(selectedOption) =>
                  setCurrentEvent({ ...currentEvent, eventDuration: selectedOption })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="event-name"
                name="event-name"
                value={currentEvent.eventName}
                onChange={(e) => setCurrentEvent({ ...currentEvent, eventName: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                id="event-date"
                name="event-date"
                value={currentEvent.eventDate}
                onChange={(e) => setCurrentEvent({ ...currentEvent, eventDate: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="event-time" className="block text-sm font-medium text-gray-700">
                Event Time
              </label>
              <Select
                options={time}
                id="event-time"
                name="event-time"
                className="mt-1"
                value={currentEvent.eventTime}
                onChange={(selectedOption) =>
                  setCurrentEvent({ ...currentEvent, eventTime: selectedOption })
                }
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label htmlFor="event-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="event-description"
                name="event-description"
                value={currentEvent.eventDescription}
                onChange={(e) => setCurrentEvent({ ...currentEvent, eventDescription: e.target.value })}
                rows={4}
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddEvent}
              className={buttonClasses}
            >
              Add Event
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`${buttonClasses} mt-4 ${events.length === 0 ? "hidden" : ""}`}

            >
              {text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

