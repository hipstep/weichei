import {useEffect} from "react";

let photos : string[][] = [];
const imageWidth = 300;
const imageHeight = 100;

interface PhotoCarouselProps {
  photoPaths: string[];
}

export default function PhotoCarousel(props : PhotoCarouselProps){
    for(let i = 0; i< props.photoPaths.length; i++)
    {
        const tempRight = `${i*305}`;
        const temp = `<img src='${props.photoPaths[i]} style='width: ${imageWidth}px; height: ${imageHeight}px; right:${tempRight}'> className='absolute'`;
        photos.push([temp, tempRight]);
    }

    useEffect(() => {
    const interval = setInterval(() => {
        if(parseInt(photos[0][1]) > -300)
        {
            // photos.forEach(e => {
                
            // });
        }
    }, 10);

    return () => clearInterval(interval);
  }, []);

    return(
        <>
        <div className="flex flex-row-reverse relative">

        </div>
        </>
    )
}