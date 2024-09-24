
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import {  reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import domtoimage from 'dom-to-image';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { useGLTF } from '@react-three/drei';
import { saveAs } from 'file-saver';
import * as THREE from 'three';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })


  const handleDownload = () => {
    const canvas = document.getElementById('canvas');
    domtoimage.toPng(canvas).then((dataUrl) => {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'tshirt.png';
      a.click();
    });
  };


  const handleDownload3DModel = () => {
    const { nodes, materials, error } = useGLTF('/shirt_baked.glb'); // Load your model
    
    if (error) {
      console.error('Error loading 3D model:', error);
      return;
    }
  
    const mesh = nodes.T_Shirt_male; // Get the mesh node
    const scene = new THREE.Scene();
    scene.add(mesh);
  
    const exporter = new GLTFExporter(); // Instantiate GLTFExporter with `new`
    exporter.parse(
      scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        saveAs(blob, 'shirt.gltf');
      },
      (error) => {
        console.error('Error exporting the model:', error);
      }
    );
  };

  
  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");
  
    try {
      setGeneratingImg(true);
  
      // Send prompt to your Django backend
      const response = await fetch('http://localhost:8000/api/generate-image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt, // Pass the user prompt
        }),
      });
  
      // Handle the response from your backend
      const data = await response.json();
  
      if (data.photo) {  // Expecting 'photo' as the key
        // Apply the decal with the generated image in base64 format
        handleDecals(type, `${data.photo}`);
      } else {
        alert("Failed to generate image.");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                    activeEditorTab==tab.name? setActiveEditorTab("none"):setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <CustomButton 
            
              type="filled"
              title="Download 3D"
              handleClick={handleDownload3DModel}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm mx-4 "
            />

            <CustomButton 
            
            type="filled"
            title="Download 2D"
            handleClick={handleDownload}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-4 "
          />



            



          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer