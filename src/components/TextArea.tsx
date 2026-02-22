import { forwardRef } from "react";
import data from "../data/articles";

type TextAreaProps = {
    id: number;
}


const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(({id}, ref) => {
    const currentArticle = data.articles[id];
    const title = currentArticle.title;
    const text = currentArticle.text;
    return( // !!! responsive?
        <div ref={ref} className="w-full h-1/2 2xl:h-1/3 absolute bottom-0 px-10 z-10">
            <div className="max-w-3/4 w-fit articleTitle justify-center items-center text-4xl 2xl:text-5xl mb-5 text-[#9f0712] relative">
                {title}
            </div>
            <hr className="text-[#9f0712]/50"/>
            <p className="mt-5 text-xl  text-justify font-verdana">
                {text}
            </p>
        </div>
    )
});

export default TextArea;