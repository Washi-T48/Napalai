import React, { useRef } from "react";

function VideoPlayer(){
    return (
        <video className="h-full min-w-96 w-full rounded-md drop-shadow-2xl object-cover" controls autoPlay muted loop>
        <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
        />
        Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
