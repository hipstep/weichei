import PhotoCarousel from "../components/PhotoCarousel"
import TextArea from "../components/TextArea"
import {useState, useRef, useEffect} from "react";
import data from "../data/articles";
import { ArrowLeft, ArrowRight, Repeat } from "lucide-react";

export default function Gallery() {
    const [articleIndex, setArticleIndex] = useState(0);
    const [isAutoscroll, setIsAutoscroll] = useState(true);
    const [pendingArticleIndex, setPendingArticleIndex] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLDivElement>(null);

    // handle autoscroll toggle
    useEffect(() => {
        if(isAutoscroll) {
            intervalRef.current = setInterval(() => {
                setPendingArticleIndex((articleIndex + 1) % data.articles.length);
            }, 24000);
        } else {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAutoscroll, articleIndex]);

    // change color of autoscrollButton
    useEffect(() => {
        const autoscrollButton = document.querySelector<HTMLElement>(".autoscrollButton");
        if(autoscrollButton) {
            autoscrollButton.style.color = isAutoscroll ? "green" : "red";
        }
    }, [isAutoscroll]);

    // exit animation when article change is pending
    useEffect(() => {
        if(pendingArticleIndex === null) return;

        if(carouselRef.current && textAreaRef.current) {
            carouselRef.current.style.transition = "transform 0.5s ease-in-out";
            textAreaRef.current.style.transition = "opacity 0.5s ease-in-out";
            carouselRef.current.style.transform = "translateY(-100vh)";
            textAreaRef.current.style.opacity = "0";

            const timer = setTimeout(() => {
                setArticleIndex(pendingArticleIndex);
                setPendingArticleIndex(null);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [pendingArticleIndex]);

    // entry animation when new article is displayed
    useEffect(() => {
        if(pendingArticleIndex !== null) return;

        if(carouselRef.current && textAreaRef.current) {
            carouselRef.current.style.transition = "none";
            textAreaRef.current.style.transition = "none";
            carouselRef.current.style.transform = "translateY(-100vh)";
            textAreaRef.current.style.opacity = "0";

            const timer = setTimeout(() => {
                if(carouselRef.current && textAreaRef.current) {
                    carouselRef.current.style.transition = "transform 1s ease-in-out";
                    textAreaRef.current.style.transition = "opacity 1s ease-in-out";
                    carouselRef.current.style.transform = "translateY(0)";
                    textAreaRef.current.style.opacity = "1";
                }
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [articleIndex, pendingArticleIndex]);

    return (
        <div className="flex flex-col bg-linear-to-t from-yellow-100 to-transparent w-full min-h-screen relative overflow-y-hidden">
            <div className="absolute top-2/5 left-1/2 md:right-0 md:left-auto transform -translate-x-1/2 md:-translate-x-0">
                <button onClick={() => setPendingArticleIndex((articleIndex - 1 + data.articles.length) % data.articles.length)}><span className="button_top"><ArrowLeft className="w-4 h-4" /></span></button>
                <button onClick={() => setIsAutoscroll((prev) => !prev)}><span className="button_top autoscrollButton"><Repeat className="w-4 h-4" /></span></button>
                <button onClick={() => setPendingArticleIndex((articleIndex + 1) % data.articles.length)}><span className="button_top"><ArrowRight className="w-4 h-4" /></span></button>
            </div>
            
            <div className="flex flex-col bg-[url('/assets/galleryBackground.png')] bg-cover bg-no-repeat w-full min-h-screen">
                <PhotoCarousel id={articleIndex} ref={carouselRef} />
                <TextArea id={articleIndex} ref={textAreaRef} />
            </div>
            <div className="bg-[url('/assets/stickers/light.png')] absolute left-0 top-1/3 size-90 bg-contain bg-no-repeat z-0"></div>
            <div className="bg-[url('/assets/stickers/megaphone.png')] absolute left-2/5 translate-y-2/7 bottom-0 size-100 bg-contain bg-no-repeat z-0"></div>
        </div>
    )
}
