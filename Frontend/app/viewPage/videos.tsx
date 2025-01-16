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
import CardLiveCamera from "../component/cardLiveCamera"; 

interface videoProp {
  typeLayout: string;
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

  const [displayImages, setDisplayImages] = useState<StaticImageData[]>([]);

  useEffect(() => {
    let imagesToDisplay: StaticImageData[] = [];
    if (typeLayout === "nineLayout") {
      imagesToDisplay = allImages.slice(0, 9);
    } else if (typeLayout === "sixLayout") {
      imagesToDisplay = allImages.slice(0, 6);
    } else if (typeLayout === "fourLayout") {
      imagesToDisplay = allImages.slice(0, 4);
    }

    setDisplayImages(imagesToDisplay); 
  }, [typeLayout]);

  return (
    <>
      {typeLayout === "nineLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {displayImages.map((src, index) => (
            <CardLiveCamera
              key={index}
              src={src}
              camName={`Cam${index + 1}`}
            />
          ))}
        </div>
      )}

      {typeLayout === "sixLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          <div className="relative w-full h-full col-span-2 row-span-2">
            <CardLiveCamera src={displayImages[0]} camName="Cam1" />
          </div>

          {displayImages.slice(1, 6).map((src, index) => (
            <CardLiveCamera
              key={index + 1}
              src={src}
              camName={`Cam${index + 2}`}
            />
          ))}
        </div>
      )}

      {typeLayout === "fourLayout" && (
        <div className="w-full h-full grid grid-cols-2 grid-rows-2">
          {displayImages.slice(0, 4).map((src, index) => (
            <CardLiveCamera key={index} src={src} camName={`Cam${index + 1}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default Videos;
