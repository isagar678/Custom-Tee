import { proxy } from "valtio";
const state=proxy({
    intro:true,
    color:'#97b973',
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal:'./reactjs.png',
    fullDecal:'./reactjs.png'
});
export default state;
