import './gallery.scss'

const Gallery = ({ images }) => {
	return (
		<div className="gallery">
			{images.map((image) => {
				return (
					<div className="gallery__img-wrapper">
						<img
							className="gallery__img"
							src={image.displayImage}
							key={image.id}
							alt="thumbnail"
						/>
					</div>
				)
			})}
		</div>
	)
}

export default Gallery
