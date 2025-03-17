import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface MyCalendarProps {
  onDateSelect: (startDate: string, endDate: string) => void;
  handleClearFilters: () => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect, handleClearFilters }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);

  const handleChange = (newValue: Date | [Date | null, Date | null] | null) => {
    if (!newValue) return;
  
    if (Array.isArray(newValue)) {
      setDateRange([newValue[0] ?? null, newValue[1] ?? null]); 
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
          className="p-2"
          onChange={handleChange}
          value={dateRange}
          selectRange={true}
          locale="en-US"
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "narrow" })
          }
          // showNeighboringMonth={false}
        />
      </div>
      <div className="flex flex-col items-center p-2  bg-white">
        <div className="flex justify-end  w-full gap-2 ">
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-customฺButton text-white rounded-full hover:bg-customฺButtomHover"
          >
            Apply
          </button>
          <button onClick={handleClearFilters} className="px-6 py-2 text-white rounded-full bg-customฺButton ">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;