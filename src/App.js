import './App.css';
import React,{Component} from 'react';
import Navigation from './Components/Navigation';
import Logo from  './Components/Logo';
import ImageLinkForm from './Components/imageLinkForm/ImageLinkForm';
import Rank from './Components/Rank';
//import Tilty from 'react-tilty';
import Particles from 'react-tsparticles'
import FaceRecognition from './Components/fRec/FaceRecognition'
import Clarifai from 'clarifai'
import SignIn from './Components/SignIn';

const app = new Clarifai.App({
 apiKey: '26c374060442478e841a18c0302f035a'
}); 

class App extends Component {
    constructor(){
      super()
      this.state={
        input:'',
        imageUrl:'',
        box:{},
        route: 'signIn'
      }
    }
  
    calculateFaceLocation = (data) =>{
      const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
      const image= document.getElementById('inputImage')
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height-(clarifaiFace.bottom_row * height)
      }
    }
    
    displayFaceBox= box =>{
      console.log(box);
      this.setState({box: box})
    }

    onInputChange=(event)=>{
      this.setState({input: event.target.value})
    }

    onRouteChange = (ruta) => this.setState({route:ruta})

    onSubmit = () =>{
      console.log('click')
      this.setState({imageUrl: this.state.input})
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
      this.state.input
      )
      .then((response) => {
      this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
      console.log(err);
      })
    }

  render(){
    return (
        <div className="App">
          <Particles />;
          {this.state.route ==='signIn' ?<SignIn onRouteChange={this.onRouteChange}/>
          :<div>
          <Navigation onRouteChange={this.onRouteChange} />
          <Logo/>
          <Rank/>   
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} slika={this.state.imageUrl}/>
          </div>
          }

        </div>
      );
    }
  }
export default App;
