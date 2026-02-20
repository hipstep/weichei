import './../index.css'
import { motion } from 'motion/react'

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen bg-yellow-100/50">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="w-1/2 h-128 relative"
            >
                <motion.div 
                    animate={{
                        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
                        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
                        rotate: [0, -1, 1, 0, 1, -1, 0, -1, 1, 0, -1]
                    }}
                    transition={{ duration: 0.5, ease: 'linear', repeat: Infinity }}
                    className="absolute bg-[url('src/assets/HomeBoomBackground.png')] bg-cover bg-center w-full h-full"
                ></motion.div>
                <div className="scale-90 absolute bg-[url('src/assets/HomeBoomForeground.png')] z-10 bg-cover bg-center w-full h-full"></div>
            </motion.div>
        </div>
    )
}