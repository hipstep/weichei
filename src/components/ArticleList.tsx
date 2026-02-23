import { useNavigate } from "react-router-dom";
import data from "../data/articles";
import { useEffect } from "react";

type ArticleListProps = {
    x: number,
    y: number,
    isOpen: boolean,
    onClose: () => void
}

export default function ArticleList({x, y, isOpen, onClose} : ArticleListProps){
    if(!isOpen) return null;
    const navigate = useNavigate();

    const articles = data.articles;

    useEffect(() =>{
        const container = document.querySelector<HTMLDivElement>(".articleList");
        for(let i = 0; i < articles.length; i++)
        {
            const element = document.createElement("div");
    
            element.onclick = () => clickHandler(i);
            element.innerText = articles[i].title

            element.classList.add("articleListTitle");

            container?.appendChild(element);
        }
    }, [articles])

    const clickHandler = (id: number) => {
        navigate(`/gallery/${id}`);
        window.location.reload();
    }

    return(
        <>
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div
                className="absolute z-50 text-[#9f0712] border-[#9f0712] border-3 max-h-60 bg-white flex flex-col articleList overflow-y-scroll rounded-2xl articleListContainer"
                style={{
                    left: x,
                    top: y,
                }}
            >  

            </div>
        </>
    )
}