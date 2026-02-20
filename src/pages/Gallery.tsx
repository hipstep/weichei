import PhotoCarousel from "../components/PhotoCarousel"

export default function Gallery() {
    return (
        <div className="flex flex-col bg-[url('/assets/galleryBackground.png')] bg-cover bg-no-repeat w-full min-h-screen">
            <div className="bg-pink-500 w-full h-1/3">karuzela</div>
            <PhotoCarousel photoPaths={["hej", "hej"]} />
            <h1></h1>
            <p></p>
        </div>
    )
}
