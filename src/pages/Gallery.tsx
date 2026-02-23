import PhotoCarousel from "../components/PhotoCarousel"
import TextArea from "../components/TextArea"
import ArticleList from "../components/ArticleList"
import {useState, useRef, useEffect} from "react";
import data from "../data/articles";
import { ArrowLeft, ArrowRight, Repeat, House, Menu } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom'

export default function Gallery() {
    const pickedArticleId = useParams();
    const [articleIndex, setArticleIndex] = useState(Number(pickedArticleId.articleId));
    const [isAutoscroll, setIsAutoscroll] = useState(true);
    const [pendingArticleIndex, setPendingArticleIndex] = useState<number | null>(null);
    const [posArticleList, setPosArticleList] = useState({ x: 0, y: 0 });
    const [openArticleList, setOpenArticleList] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLDivElement>(null);
    let navigate = useNavigate();

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

    // article list click hanlder
    const handleClickArticleList = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(e.currentTarget.parentElement){
            setPosArticleList({ x: e.clientX, y: e.pageY });
            setOpenArticleList(true);
        }
    };


    return (
        <div className="flex flex-col bg-linear-to-t from-yellow-100 to-transparent w-full min-h-screen relative lg:overflow-y-hidden overflow-x-hidden">
            <div className="absolute top-[80vh] left-0 z-10">
                <button onClick={() => navigate("/")} title="Wróć do menu"><span className="button_top"><House  className="w-4 h-4" /></span></button>
                <button onClick={handleClickArticleList} title="Lista artykułów"><span className="button_top"><Menu  className="w-4 h-4" /></span> </button>
            </div>

            <div className="absolute top-[80vh] right-0 z-10">
                <button onClick={() => setPendingArticleIndex((articleIndex - 1 + data.articles.length) % data.articles.length)}title="Poprzedni artykuł"><span className="button_top"><ArrowLeft className="w-4 h-4" /></span></button>

                <button onClick={() => setIsAutoscroll((prev) => !prev)}><span className="button_top autoscrollButton" title="Auto-scroll"><Repeat className="w-4 h-4" /></span></button>

                <button onClick={() => setPendingArticleIndex((articleIndex + 1) % data.articles.length)} title="Następny artykuł"><span className="button_top" ><ArrowRight className="w-4 h-4" /></span></button>
            </div>
            
            <div className="flex flex-col bg-[url('/assets/galleryBackground.png')] bg-contain bg-no-repeat w-full min-h-screen">
                <PhotoCarousel id={articleIndex} ref={carouselRef} />
                <TextArea id={articleIndex} ref={textAreaRef} />
            </div>
            <div className="bg-[url('/assets/stickers/light.png')] absolute left-2 rotate-12 top-[79vh] -translate-y-1/1 size-20 lg:size-40 bg-contain bg-no-repeat z-0"></div>
            <div className="bg-[url('/assets/stickers/important.png')] absolute right-1 top-[79vh] -rotate-12 -translate-y-1/1 lg:h-35 h-20 lg:w-17 w-8 bg-contain bg-no-repeat z-0"></div>
            <div className="bg-[url('/assets/stickers/megaphone.png')] absolute left-2/5 bottom-0 size-40 lg:size-55 bg-contain bg-no-repeat z-0"></div>

            <ArticleList x={posArticleList.x} y={posArticleList.y} isOpen={openArticleList} onClose={() => setOpenArticleList(false)}/>
        </div>
    )
}
