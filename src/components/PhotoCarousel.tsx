import { useEffect, useState } from "react";
import data from "../data/articles";

type PhotoCarouselProps = {
    id: number;
}

export default function PhotoCarousel({id}: PhotoCarouselProps){
    const [currentIndex, setCurrentIndex] = useState(0);
    const rotateDelay = 3000;

    const currentArticle = data.articles[id];
    const images = currentArticle.images_names;
    let imagesContainer = document.querySelector<HTMLElement>(".carouselContainer");

    images.forEach((image, index) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("carouselImage");
        //imageElement.style.backgroundImage = `url('/assets/article_images/${image}')`;
        imageElement.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 50%, 50%)";
        imageElement.style.backgroundSize = "cover";
        imageElement.style.backgroundPosition = "center";
        imageElement.style.width = "33.3vw";
        imageElement.style.height = "40vh";

        imagesContainer?.appendChild(imageElement);
    });


    // rotate images every x seconds
    useEffect(() => {
        let currentImages = document.querySelectorAll<HTMLElement>(".carouselImage");
        

        //currentImages.forEach((image) => {
            // smooth animation to move div to left for 1/3vw
        //    image.style.transition = "transform 1s ease-in-out";
        //    image.style.transform = `translateX(-${currentIndex * 33.3}vw)`;
        //});

        // delete first div and add it to the end of the list
        //if(currentIndex > 0 && imagesContainer){
        //    imagesContainer.innerHTML = currentImages[1].outerHTML + currentImages[2].outerHTML + currentImages[3].outerHTML + ;
        //}
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1));
        }, rotateDelay);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex flex-row w-full h-[40vh] relative carouselContainer">
            {/*<div className="bg-red-500 w-1/3 h-full carouselImage"></div>
            <div className="bg-orange-500 w-1/3 h-full carouselImage"></div>
            <div className="bg-blue-500 w-1/3 h-full carouselImage"></div>
            <div className="bg-pink-900 w-[33.3vw] h-[40vh] absolute -right-[33.3vw] carouselImage"></div>*/}
        </div>
        
    );
}