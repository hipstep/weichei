import PhotoCarousel from "../components/PhotoCarousel"
import TextArea from "../components/TextArea"
import {useState} from "react";

export default function Gallery() {
    const [articleIndex, setArticleIndex] = useState(2);
    return (
        <div className="flex flex-col bg-linear-to-t from-yellow-100 to-transparent w-full min-h-screen overflow-hidden relative">
            <div className="flex flex-col bg-[url('/assets/galleryBackground.png')] bg-cover bg-no-repeat w-full min-h-screen">
                {/* <PhotoCarousel id={articleIndex} /> */}
                <TextArea id={articleIndex} />
            </div>
            <div className="bg-[url('/assets/stickers/light.png')] absolute left-0 top-1/3 size-90 bg-contain bg-no-repeat z-0"></div>
            <div className="bg-[url('/assets/stickers/megaphone.png')] absolute left-2/5 translate-y-2/7 bottom-0 size-100 bg-contain bg-no-repeat z-0"></div>
        </div>
    )
}
