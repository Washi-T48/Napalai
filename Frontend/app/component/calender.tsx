import React, { useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const prevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(year, currentDate.getMonth() + 1, 0);

  const daysInMonth = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(year, currentDate.getMonth(), i));
  }

  const firstDayIndex = firstDayOfMonth.getDay();
  const daysBefore = Array(firstDayIndex).fill(null);

  const fullMonthDays = [...daysBefore, ...daysInMonth];

  return (
    <div className="flex items-center justify-center  ">
      <div className="max-w-full sm:max-w-lg w-full shadow-lg">
        <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
          <div className="px-4 flex items-center justify-between">
            <span className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
              {`${monthName} ${year}`}
            </span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                onClick={prevMonth}
                className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                onClick={nextMonth}
                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(day => (
                    <th
                      key={day}
                      className="text-center p-2 text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-gray-100"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 7 }).map((_, colIndex) => {
                      const dayIndex = rowIndex * 7 + colIndex;
                      const date = fullMonthDays[dayIndex];

                      return (
                        <td key={colIndex} className="">
                          <div className="px-2 py-2 w-8 h-8 cursor-pointer flex justify-center">
                            {date ? (
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                {date.getDate()}
                              </p>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button className="flex justify-center items-center p-2 w-24 bg-customฺButton text-white hover:bg-customฺButtomHover rounded-full">
              appply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
