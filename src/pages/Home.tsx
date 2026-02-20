import './../index.css'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    let navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-yellow-100">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="w-1/2 h-128 relative">
                <motion.div 
                    animate={{
                        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
                        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
                        rotate: [0, -1, 1, 0, 1, -1, 0, -1, 1, 0, -1]
                    }}
                    transition={{ duration: 0.5, ease: 'linear', repeat: Infinity }}
                    className="absolute bg-[url('/assets/HomeBoomBackground.png')] bg-cover bg-center w-full h-full">
                </motion.div>
                <div className="scale-90 absolute bg-[url('/assets/HomeBoomForeground.png')] z-10 bg-cover bg-center w-full h-full items-center justify-center flex flex-col">
                    <motion.h1 
                        initial={{ color: '#460809' }}
                        animate={{ color: '#9f0712' }}
                        transition={{ duration: 1, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
                        className="text-6xl text-center">
                            Klasa<br></br>Jezykowa
                    </motion.h1>
                    <button onClick={() => navigate("/gallery")} className="bg-red-950 text-white px-6 py-3 rounded-full hover:bg-red-800 transition-colors duration-300">
                        Rozpocznij
                    </button>
                </div>
            </motion.div>
        </div>
    )
}