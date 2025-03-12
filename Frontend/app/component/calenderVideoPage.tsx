import React, { useState } from "react";

function CalendarVideoPage({ highlightDates = [] }: { highlightDates: Date[] }) {
  const [currentDate, setCurrentDate] = useState(
    highlightDates.length > 0 ? new Date(highlightDates[0]) : new Date()
  );

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
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

  const isHighlighted = (date: Date) =>
    highlightDates.some((highlightDate) =>
      date.toDateString() === new Date(highlightDate).toDateString()
    );

  return (
    <div className="flex items-center justify-center bg-customSlateBlue p-2 rounded-md text-white ">
      <div className="p-2 w-full">
        <div className=" pt-2 pb-4 border-b border-gray-400 flex items-center justify-between ">
          <span className="focus:outline-none text-base text-white font-bold dark:text-white ">
            {`${monthName} ${year}`}
          </span>
        </div>
        <div className="flex items-center justify-between overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <th
                    key={day}
                    className="text-center w-8 h-8 p-3 pt-4 text-xs "
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
                        <div className="px-1 py-1 w-8 h-8 cursor-pointer flex justify-center items-center">
                          {date ? (
                            <p
                              className={`text-xs font-medium text-center w-4 h-4 ${
                                isHighlighted(date)
                                  ? "text-red-700 rounded-full font-bold bg-white "
                                  : ""
                              }`}
                            >
                              {date.getDate()}
                            </p>
                          ) : (
                            <div className=""></div>
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
      </div>
    </div>
  );
}

export default CalendarVideoPage;