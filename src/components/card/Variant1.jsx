import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CardVariant1 = ({ images, title, description, price, tags }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoLoopRunning, setIsAutoLoopRunning] = useState(true);

  const imageIndex = page % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!isAutoLoopRunning) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [page, isAutoLoopRunning]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 200000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <div className="relative w-[350px] h-[550px] rounded-[60px] shadow-2xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => setIsAutoLoopRunning(false)}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
            setIsAutoLoopRunning(true);
          }}
          className="absolute h-full w-full object-cover z-0"
        />
      </AnimatePresence>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(25px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 15%, black 300px)',
          maskImage: 'linear-gradient(to bottom, transparent 15%, black 400px)',
        }}
      />
      <div className="absolute bottom-0 w-full p-6 text-white flex flex-col gap-4 z-20">
        <div>
          <div className="flex justify-center gap-2 mb-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setPage([i, i > imageIndex ? 1 : -1]);
                  setIsAutoLoopRunning(false);
                  setTimeout(() => setIsAutoLoopRunning(true), 5000);
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  i === imageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <div className="flex mb-2 items-start justify-between">
            <h1 className="text-xl font-medium">{title}</h1>
            <span className="bg-black/50 px-4 py-1.5 rounded-full text-sm font-semibold">${price}</span>
          </div>
          <p className="text-[12px] mb-4 text-white/60">
            {description}
          </p>
          <div className="flex gap-3 mb-4 text-xs font-medium">
            {tags.map((tag, index) => (
              <span key={index} className="bg-white/20 px-4 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full -mb-2 bg-white/90 text-gray-900 font-medium py-3 rounded-full mt-2"
          >
            Reserve
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CardVariant1;
