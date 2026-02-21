import PhotoCarousel from "../components/PhotoCarousel"

export default function Gallery() {
    return (
        <div className="flex flex-col bg-linear-to-t from-red-800/30 to-transparent w-full min-h-screen">
            <div className="flex flex-col bg-[url('/assets/galleryBackground.png')] bg-cover bg-no-repeat w-full min-h-screen">
                <PhotoCarousel id={0} />
                <h1></h1>
                <p></p>
            </div>
        </div>
    )
}
