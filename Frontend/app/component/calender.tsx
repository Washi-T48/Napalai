import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface MyCalendarProps {
  onDateSelect: (startDate: string, endDate: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);

  const handleChange = (newValue: Date | [Date, Date] | null) => {
    if (!newValue) return; 
    
    if (Array.isArray(newValue)) {
      setDateRange([newValue[0], newValue[1]]);
    } else {
      setDateRange([newValue, newValue]);
    }
  };
  

  const handleApply = () => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].toISOString().split("T")[0];
      const endDate = dateRange[1].toISOString().split("T")[0];
      setSelectedRange([startDate, endDate]);
      onDateSelect(startDate, endDate);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Calendar
          className="p-4"
          onChange={handleChange}
          value={dateRange}
          selectRange={true}
          locale="en-US"
        />
      </div>
      <div className="flex flex-col items-center p-2 border-x bg-white border-gray-400">
        <div className="text-xxs mb-2">
          {dateRange[0] && dateRange[1] ? (
            <>📅 {dateRange[0].toDateString()} - {dateRange[1].toDateString()}</>
          ) : (
            <>เลือกช่วงวันที่</>
          )}
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply
        </button>
        {selectedRange && (
          <div className="mt-2 text-sm text-gray-700">
            🔍 Showing data from {selectedRange[0]} to {selectedRange[1]}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;