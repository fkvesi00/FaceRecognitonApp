import React from "react";
import './faceRec.css'
const FaceRecognition = ({slika,box}) =>{
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img id='inputImage' alt='slika' src={slika} width='500px' height='auto'></img>
                <div className="bounding-box" style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>            
            </div>
        </div>
    )
}

export default FaceRecognition;