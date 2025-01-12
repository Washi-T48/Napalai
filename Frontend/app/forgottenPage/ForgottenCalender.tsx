import React, { useState } from "react";

const ForgottenCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper function to get the current month and year in 'MMM YYYY' format
  const getMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Helper function to get the number of days in a given month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get the starting day of the week of the month
  const getStartDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const renderDays = () => {
    const startDay = getStartDay(currentDate);
    const totalDays = getDaysInMonth(currentDate);

    // Create an array of days for the calendar
    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty spots for the start of the month
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-start p-3 px-6 bg-CustomDeepTeal rounded-t-lg">
        <h2 className="text-xl font-semibold  text-white">
          {getMonthYear(currentDate)}
        </h2>
        <div className="px-2">
          <button
            onClick={prevMonth}
            className="text-xl font-semibold text-white px-1"
          >
            &lt;
          </button>

          <button
            onClick={nextMonth}
            className="text-xl font-semibold text-white  px-1"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="bg-CustomDeepTeal border">
        <div className="grid grid-cols-7 text-center p-2 text-sm ">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-white ">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full mx-auto rounded-sm  bg-customDarkSlateBlue border border-gray-600">
        <div className="grid grid-cols-7 h-full w-full">
          {renderDays().map((day, index) => (
            <div
              key={index}
              className={`h-auto p-2 flex flex-col items-start justify-start cursor-pointer border ${
                day ? "hover:bg-blue-200" : ""
              } ${!day ? "text-transparent" : "text-white"}`}
            >
              {/* แสดงวันที่ */}
              {day || ""}

              <div className="flex justify-center items-center w-full h-full mb-4">
                <div className="flex justify-center items-center flex-col p-2 w-full">
                  {/* <div>1</div>
            <div>ITEM</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgottenCalendar;
