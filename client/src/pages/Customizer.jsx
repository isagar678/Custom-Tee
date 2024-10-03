import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { Download, AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

import domtoimage from 'dom-to-image';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { useGLTF } from '@react-three/drei';
import { saveAs } from 'file-saver';

const Customizer = () => {
  const snap = useSnapshot(state);
  const { nodes, scene } = useGLTF('/shirt_baked.glb'); // Replace with your model path

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [triggerDownload, setTriggerDownload] = useState(false);  // New state

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const handleDownload = () => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      domtoimage.toPng(canvas).then((dataUrl) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'tshirt.png';
        a.click();
      });
    }
  };

  const handleDownload3DModel = async () => {
    if (!nodes.T_Shirt_male || !scene) {
      console.error('Mesh or scene not found.');
      return;
    }

    const mesh = nodes.T_Shirt_male; // Get the mesh node
    scene.add(mesh);

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (result) => {
        const json = JSON.stringify(result, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, 'shirt.gltf');
      },
      { binary: false } // Options
    );
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />;
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />;
      case "download":
        
        return <Download two={handleDownload} three={handleDownload3DModel} />  
       
      default:
        return null;
    }
  };

  useEffect(() => {
    if (triggerDownload) {
      handleDownload();  // Trigger download only once
      setTriggerDownload(false);  // Reset the trigger
    }
  }, [triggerDownload]);

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
        setGeneratingImg(true);

        // Send prompt to your Django backend
        const response = await fetch('https://custom-tee-89jd.vercel.app/api/generate-image/', {
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
        console.log("Response from server:", data);  // Debugging log

        if (data.image) {  // Check for 'image'
            // Apply the decal with the generated image in base64 format
            handleDecals(type, `data:image/png;base64,${data.image}`); // Include prefix
        } else {
            alert("Failed to generate image.");
        }
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        alert("Error: " + error);
    } finally {
        setGeneratingImg(false);
        setActiveEditorTab("");
    }
};



  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

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
    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName]
    }));
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      });
  };

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
                      activeEditorTab === tab.name ? setActiveEditorTab("") : setActiveEditorTab(tab.name)
                    }
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
  );
};

export default Customizer;
