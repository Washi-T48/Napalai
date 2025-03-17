import React, { useState } from 'react';
import Link from 'next/link';
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek
} from 'date-fns';

interface ForgottenItem {
    id: number;
    description: string;
    created: string;
    item_type: string;
    itemCount: number;
}

interface CalendarProps {
    forgottenResponse: ForgottenItem[];
}

const ForgottenCalendar: React.FC<CalendarProps> = ({ forgottenResponse = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';

        return (
            <div className="flex justify-between items-center p-2 rounded-t-md text-white bg-customSlateBlue">
                <div className="text-2xl font-bold">{format(currentMonth, dateFormat)}</div>
                <div className='flex'>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="text-white px-4 py-2 rounded-full transform transition-transform hover:scale-105">
                        &lt;
                    </button>
                    <button onClick={() => setCurrentMonth(new Date())} className="text-white bg-primary-light px-4 py-2 rounded-full transform transition-transform hover:scale-105">
                        Today
                    </button>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-white px-4 py-2 rounded-full transform transition-transform hover:scale-105">
                        &gt;
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7">
                {days.map((day, index) => (
                    <div key={index} className="p-2 text-xs font-bold text-center text-white bg-customDarkSlateBlue border">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        let day = startDate;
        const rows = [];
        let days = [];

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const displayDate = format(day, 'd');

                const itemsForDay = forgottenResponse.filter(item =>
                    format(new Date(item.created), 'yyyy-MM-dd') === formattedDate
                );

                const totalItemCount = itemsForDay.reduce((total, item) => total + (item.itemCount || 1), 0);

                const isCurrentMonth = isSameMonth(day, monthStart);
                const todayClass = isToday(day) ? 'text-primary font-bold' : '';

                days.push(
                    <Link href={`/forgottenLog/${formattedDate}`} key={day.toISOString()}>
                        <div
                            className={`relative p-2 h-32 text-white border 
                                ${isCurrentMonth ? (itemsForDay.length > 0 ? 'bg-red-500' : 'bg-customDarkSlateBlue') : 'bg-gray-700'}
                                ${todayClass}`}
                        >
                            <div className="absolute top-2 left-2">{displayDate}</div>
                            {isCurrentMonth && itemsForDay.length > 0 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-xs bg-assign p-1 rounded text-primary text-center">
                                        <div>ITEM</div>
                                        <div>{totalItemCount}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                );

                day = addDays(day, 1);
            }

            rows.push(
                <div className="grid grid-cols-7 text-salate-600" key={day.toISOString()}>
                    {days}
                </div>
            );

            days = [];
        }

        return <div>{rows}</div>;
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default ForgottenCalendar;
