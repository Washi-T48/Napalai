import React, { useState } from 'react';
import Link from 'next/link';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    parseISO,
    addMonths,
    getDate,
    isToday
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
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                        className="text-white font-bold px-4 py-2 rounded-full transform transition-transform duration-300 hover:scale-105"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => setCurrentMonth(new Date())}
                        className="text-white bg-primary-light font-bold px-4 py-2 rounded-full transform transition-transform duration-300 hover:scale-105"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="text-white font-bold px-4 py-2 rounded-full transform transition-transform duration-300 hover:scale-105"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = 'EEE';
        const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="p-2 text-xs font-bold text-center text-white bg-customDarkSlateBlue border" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const displayDate = format(day, 'd');
                
                const itemsForDay = forgottenResponse.filter(item =>
                    format(new Date(item.created), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );
                
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isDayFromCurrentMonth = getDate(day) <= getDate(monthEnd) && getDate(day) >= 1;
                const todayClass = isToday(day) ? 'text-primary font-bold' : '';
                const totalItemCount = itemsForDay.reduce((total, forgottenResponse) => total + (forgottenResponse.itemCount || 1), 0);

                days.push(
                    <Link href={`/forgottenLog/${formattedDate}`} key={day.toISOString()}>
                        <div
                            className={`p-2 h-32 text-white border bg-customDarkSlateBlue 
                                ${!isCurrentMonth ? 'text-gray-400 bg-customSlateBlue' : ''} 
                                ${itemsForDay.length > 0 ? 'bg-red-500' : ''} 
                                ${todayClass}`}
                                
                        >
                            <div className="text-start">{isCurrentMonth && isDayFromCurrentMonth ? displayDate : ''}</div>
                            <div className="overflow-y-auto h-20 mt-2 flex justify-center">
                                {isCurrentMonth && isDayFromCurrentMonth && (
                                    <div>
                                        {itemsForDay.length > 0 && (
                                            <div className="flex justify-center items-center text-xs mt-3 bg-assign p-1 rounded line-clamp-2 text-primary">
                                                <div className='flex justify-center flex-col'>
                                                    <div className='flex justify-center'>
                                                        ITEM
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        {`${totalItemCount} `} 
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
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
    