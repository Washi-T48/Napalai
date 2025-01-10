import React, { useRef } from "react";

function VideoPlayer(){
    return (
        <video className="h-full w-full rounded-md drop-shadow-2xl object-cover" controls>
        <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
        />
        Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
