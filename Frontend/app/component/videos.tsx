import React from 'react'
import Image from 'next/image'
import Tmges1 from "../../public/imges/imges1.jpg";
import Tmges2 from "../../public/imges/imges2.jpeg";
import Tmges3 from "../../public/imges/imges3.jpg";
import Tmges4 from "../../public/imges/imges4.png";
import Tmges5 from "../../public/imges/imges5.jpg";
import Tmges6 from "../../public/imges/imges6.jpg";
import Tmges7 from "../../public/imges/imges7.png";
import Tmges8 from "../../public/imges/imges8.jpg";
import Tmges9 from "../../public/imges/imges9.jpg";



function Videos() {
    const imges = [
        Tmges1,
        Tmges2,
        Tmges3,
        Tmges4,
        Tmges5,
        Tmges6,
        Tmges7,
        Tmges8,
        Tmges9,
    ];
    return (
        <div className="w-full h-24 grid grid-cols-3 ">
            {imges.map((src, index) => (
                <div key={index} className="w-full h-[293.5] ">
                    <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    )
}

export default Videos