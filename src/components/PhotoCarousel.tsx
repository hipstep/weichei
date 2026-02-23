import { useEffect, useState, forwardRef } from "react";
import data from "../data/articles";

type PhotoCarouselProps = {
    id: number;
}

const PhotoCarousel = forwardRef<HTMLDivElement, PhotoCarouselProps>(({id}, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const rotateDelay = 3000;

    const currentArticle = data.articles[id];
    const images = currentArticle.images_names;

    // reset carousel when article changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [id]);

    // initialize carousel on page open
    useEffect(() => {
        let imagesContainer = document.querySelector<HTMLElement>(".carouselContainer");
        
        // clear previous images
        if (imagesContainer) {
            imagesContainer.innerHTML = "";
        }
        
        images.forEach((image) => {
            const imageElement = document.createElement("div");
            imageElement.classList.add("carouselImage");
            imageElement.style.backgroundImage = `url('/weichei/assets/article_images/${image}')`;
            imageElement.style.backgroundSize = "cover";
            imageElement.style.backgroundPosition = "center";
            imageElement.style.minWidth = "33.3vw";
            imageElement.style.height = "80vh";

            imagesContainer?.appendChild(imageElement);
        });
    }, [images]);

    // rotate images every x seconds
    useEffect(() => {
        let currentImages = document.querySelectorAll<HTMLElement>(".carouselImage");

        currentImages.forEach((image) => {
            // smooth animation to move div to left for 1/3vw
            image.style.transition = "transform 1s ease-in-out";
            image.style.transform = `translateX(-${(currentIndex % images.length) * 33.3}vw)`;
        });
    }, [currentIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 2));
        }, rotateDelay);

        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <div ref={ref} className="flex flex-row overflow-hidden w-full h-[80vh] relative carouselContainer">
           
        </div>
        
    );
});

export default PhotoCarousel;