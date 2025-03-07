import React, { useState } from 'react';

function ChangeUserBox() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleUsernameChange = async () => {
        try {
            const res = await fetch('https://cloud.phraya.net:443/auth/changeUsername', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('Username changed successfully!');
            } else {
                setMessage(data.error || 'Failed to change username');
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div className="z-10">
            <div className="flex justify-center flex-col items-center border border-customฺBorder p-12 rounded-2xl  m-auto">
                <div className="text-white p-2">
                    <h1 className="text-lg font-medium">Change Username</h1>
                    <div className="space-y-1 pt-3">
                        <label htmlFor="username" className="text-xs">New Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                        />
                    </div>
                    <div className='flex justify-end gap-2 pt-6'>
                        <button
                            onClick={handleUsernameChange}
                            disabled={!username}
                            className="h-8 p-1 px-4 rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                        >
                            Save
                        </button>
                    </div>
                    {message && <p className="text-xs text-white mt-2">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default ChangeUserBox;
