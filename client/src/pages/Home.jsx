import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useState,useEffect } from 'react';
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    // Set a timer for 2 seconds (2000 milliseconds)
    const timer = setTimeout(() => {
      setShowComponent(true);  // Show the component after 2 seconds
    }, 3500);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  return (
    
    <AnimatePresence> 
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
            <h6 className="head-text text-sm">
  LIVE <br className="xl:block hidden" />IT UP
</h6>

            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
              Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
              </p>
              {showComponent ? (
        <CustomButton 
        type="filled"
        title="Customize It"
        handleClick={() => state.intro = false}
        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
      /> // Render the button after 2 seconds
      ) : (
        <p></p>  // Optional: Show a loading message until the button appears
      )}
              {/* <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              /> */}
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home