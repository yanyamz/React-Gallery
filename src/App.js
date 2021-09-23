import { useState } from 'react'
import './app.scss'
import Gallery from './Components/GalleryImage/gallery'
import Options from './Components/GalleryOptions/options'

const App = () => {
	const [images, setImages] = useState([])

	return (
		<div className="container">
			<h1 className="title">Placeholder Image Generator</h1>
			<Options setImages={setImages} />
			<Gallery images={images} />
		</div>
	)
}

export default App
