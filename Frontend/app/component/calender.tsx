import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale";

function MyCalendar() {
  const [value, setValue] = useState<[Date, Date] | Date>(new Date());

  const handleChange = (newValue: Date | [Date, Date]) => {
    setValue(newValue); 
  };

  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <Calendar
          className=" p-4"
          onClickDay={handleChange} 
          value={value} 
          selectRange={true} 
          locale="en-US" 
        />
      </div>
      <div className="flex justify-between items-center p-2 border-x bg-white border-gray-400">
        <div className="text-xxs">
          {Array.isArray(value) ? (
            <>
              {value[0]?.toDateString()} - {value[1]?.toDateString()}
            </>
          ) : (
            <>{value?.toDateString()}</>
          )}
        </div>
        <div className="flex justify-end gap-2 ">
          <button className="p-2 bg-customwhite px-4 rounded-full">Cancel</button>
          <button className="p-2 bg-customฺButton text-white px-4 rounded-full ">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
