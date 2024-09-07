"use client";
import React, { useEffect, useState } from "react";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilitySlot {
  _id: string;
  user: string;
  day: string;
  timeSlots: TimeSlot[];
}

const AvailabilityPage: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [day, setDay] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ start: "", end: "" }]);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  const fetchAvailability = async () => {
    try {
      const response = await fetch("/api/dashboard/available");
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleAddSlot = async () => {
    if (!day || timeSlots.some(slot => !slot.start || !slot.end)) {
      alert("Please fill in all fields");
      return;
    }

    const newSlot = { day, timeSlots };

    try {
      const response = await fetch("/api/dashboard/available", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlot),
      });

      if (!response.ok) {
        throw new Error("Failed to add slot");
      }

      const data = await response.json();
      setAvailability([...availability, data]);
      setDay("");
      setTimeSlots([{ start: "", end: "" }]); // Reset to default
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await fetch(`/api/dashboard/available?id=${id}`, { method: "DELETE" });
      setAvailability(availability.filter((slot) => slot._id !== id));
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  const handleEditSlot = (slotId: string) => {
    const slotToEdit = availability.find(slot => slot._id === slotId);

    if (slotToEdit) {
      setDay(slotToEdit.day);
      setTimeSlots(slotToEdit.timeSlots);
      setEditingSlotId(slotId); // Set editing slot ID
    }
  };

  const handleUpdateSlot = async () => {
    if (!editingSlotId || !day || timeSlots.some(slot => !slot.start || !slot.end)) {
      alert("Please fill in all fields");
      return;
    }

    const updatedSlot = {
      id: editingSlotId, 
      day,
      timeSlots,
    };

    try {
      const response = await fetch(`/api/dashboard/available`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSlot),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update slot');
      }

      const result = await response.json();
      setAvailability(availability.map(slot =>
        slot._id === editingSlotId ? result : slot
      ));
      setDay("");
      setTimeSlots([{ start: "", end: "" }]);
      setEditingSlotId(null);
    } catch (error: any) {
      console.log('Error updating slot:', error.message);
    }
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "00:00", end: "00:00" }]);
  };

  const handleTimeSlotChange = (index: number, field: 'start' | 'end', value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setTimeSlots(updatedSlots);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900">Manage Availability</h1>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add/Edit Slot</h2>
        <div className="mb-6">
          <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
          <input
            type="text"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {timeSlots.map((slot, index) => (
          <div key={index} className="mb-6 flex space-x-4 items-center">
            <div className="flex-1">
              <label htmlFor={`startTime-${index}`} className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                id={`startTime-${index}`}
                value={slot.start}
                onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`endTime-${index}`} className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                id={`endTime-${index}`}
                value={slot.end}
                onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={() => {
                const newTimeSlots = timeSlots.filter((_, i) => i !== index);
                setTimeSlots(newTimeSlots);
              }}
              className="text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        ))}

        <button onClick={handleAddTimeSlot} className="btn btn-primary mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mr-3 transition duration-300">
          Add Another Time Slot
        </button>
        {editingSlotId ? (
          <button onClick={handleUpdateSlot} className="btn btn-primary bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 mr-3 transition duration-300">
            Update Slot
          </button>
        ) : (
          <button onClick={handleAddSlot} className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mr-3 transition duration-300">
            Add Slot
          </button>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Current Availability</h2>
        <ul className="divide-y gap-5 divide-gray-200">
          {availability.map((slot) => (
            <li
              key={slot._id}
              className="flex justify-between items-center py-4 transition-transform transform hover:bg-dark-800 duration-300"
            >
              <div>
                <strong className="text-lg text-gray-900">{slot.day}</strong>:{" "}
                {slot.timeSlots.map((timeSlot, index) => (
                  <span key={index} className="text-gray-600 text-sm">
                    {" "}{timeSlot.start} - {timeSlot.end}
                  </span>
                ))}
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditSlot(slot._id)}
                  className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSlot(slot._id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailabilityPage;
