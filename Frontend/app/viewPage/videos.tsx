import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Imges1 from "../../public/imges/imges1.jpg";
import Imges2 from "../../public/imges/imges2.jpeg";
import Imges3 from "../../public/imges/imges3.jpg";
import Imges4 from "../../public/imges/imges4.png";
import Imges5 from "../../public/imges/imges5.jpg";
import Imges6 from "../../public/imges/imges6.jpg";
import Imges7 from "../../public/imges/imges7.png";
import Imges8 from "../../public/imges/imges8.jpg";
import Imges9 from "../../public/imges/imges9.jpg";

interface videoProp {
    typeLayout: String;
}

const Videos: React.FC<videoProp> = ({ typeLayout }) => {
    const allImages: StaticImageData[] = [
    Imges1,
    Imges2,
    Imges3,
    Imges4,
    Imges5,
    Imges6,
    Imges7,
    Imges8,
    Imges9,
    ];

  // กำหนดประเภทให้กับ state displayImages เป็น StaticImageData[]
    const [displayImages, setDisplayImages] = useState<StaticImageData[]>([]);

  // useEffect เพื่ออัปเดต displayImages ตาม typeLayout
    useEffect(() => {
    let imagesToDisplay: StaticImageData[] = []; // กำหนดประเภทเป็น StaticImageData[]

    if (typeLayout === "nineLayout") {
      imagesToDisplay = allImages.slice(0, 9); // ใช้ 9 รูปแรก
    } else if (typeLayout === "fiveLayout") {
      imagesToDisplay = allImages.slice(0, 6); // ใช้ 5 รูปแรก
    } else if (typeLayout === "fourLayout") {
      imagesToDisplay = allImages.slice(0, 4); // ใช้ 4 รูปแรก
    }

    setDisplayImages(imagesToDisplay); // อัปเดต state
  }, [typeLayout]); // จะเรียกใช้งานเมื่อ typeLayout เปลี่ยนแปลง

    return (
    <>
        {typeLayout === "nineLayout" && (
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
            {displayImages.map((src, index) => (
                <div key={index} className="w-full h-full">
                <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                />
                </div>
            ))}
            </div>
        )}

        {typeLayout === "fiveLayout" && (
            <div className="w-full h-full grid grid-cols-3 grid-rows-3 ">
            <div className="w-full h-full col-span-2 row-span-2">
                <Image
                src={displayImages[0]}
                alt={`Image 1`}
                className="w-full h-full object-cover"
                />
            </div>

            {displayImages.slice(1, 9).map((src, index) => (
                <div key={index} className="w-full h-full col-span-1 row-span-1">
                <Image
                    src={src}
                    alt={`Image ${index + 2}`}
                    className="w-full h-full object-cover"
                />
                </div>
            ))}
            </div>
        )}

        {typeLayout === "fourLayout" && (
            <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            {displayImages.slice(0, 4).map((src, index) => (
            <div key={index} className="w-full h-full">
                <Image
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                />
            </div>
            ))}
        </div>
        )}
        </>
    );
};

export default Videos;
