import { useState, useEffect } from 'react'
import './options.scss'
const Options = ({ setImages }) => {
	const baseUrl = 'https://picsum.photos'

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [grayscale, setGrayscale] = useState(false)
	const [blur, setBlur] = useState(false)

	useEffect(() => {
		const pushToImages = async () => {
			let newImage = await fetchImage({ width, height, grayscale, blur })
			setImages((oldImages) => [...oldImages, newImage])
		}

		setImages([])
		for (let i = 0; i < 10; i++) {
			pushToImages(width, height, grayscale, blur)
		}
	}, [width, height, grayscale, blur, setImages])

	const fetchImage = async ({
		width = null,
		height = null,
		grayscale = false,
		blur = false,
	}) => {
		const imageWidth = !!width ? '/' + width : ''
		const imageHeight = !!height ? '/' + height : ''
		const imageGrayscale = grayscale ? '?grayscale' : ''
		const imageBlur = !!blur ? '?blur=1' : ''

		const searchQuery = `
    ${baseUrl}${imageWidth || '/0'}${imageHeight}${imageGrayscale}${imageBlur}
    `
		const res = await fetch(searchQuery)
		const [, id] = res.url.match(/id\/(\d+)\//)

		const res2 = await fetch(`${baseUrl}/id/${id}/info`)
		const data = await res2.json()

		let displayImage = res.url
		if (width === null && height === null) displayImage = res.download_image

		return { ...data, displayImage }
	}

	return (
		<div className="options">
			<h3>Image Options</h3>
			<div className="option__control">
				<label htmlFor="width">Width: </label>
				<input
					name="width"
					type="number"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
				/>
			</div>

			<div className="option__control">
				<label htmlFor="height">Height: </label>
				<input
					name="height"
					type="number"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
				/>
			</div>

			<div className="option__control">
				<label htmlFor="grayscale">Grayscale</label>
				<input
					type="checkbox"
					name="grayscale"
					value={grayscale}
					onChange={(e) => setGrayscale(!grayscale)}
				/>
			</div>

			<div className="option__control">
				<label htmlFor="blur">Blur</label>
				<input
					type="checkbox"
					name="blur"
					value={blur}
					onChange={(e) => setBlur(!blur)}
				/>
			</div>
		</div>
	)
}

export default Options
