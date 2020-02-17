import React from 'react';

class GalleryDisplay extends React.Component {
  render() {
    const images = (this.props.screenshots && this.props.screenshots.length > 0) ? this.props.screenshots.map(url => {
      return (
        <img key={url} className='filmstrip' src={url} alt=""/>
      )
    }) : (
      null
    );

    const mainDisplay = (this.props.screenshots && this.props.screenshots.length > 0) ? (
      <span className='main-image'>
        <img className='carousel-main' src={this.props.screenshots[0]} alt="" />
      </span>
    ) : (this.props.youtube) ?(
        <span className='main-image'>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.props.youtube}?controls=0`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </span>
      ) : (
        <span className='main-image'>
         no images
        </span>
      );


   


    return ( 
      <section className="show-gallery">
        {mainDisplay}
        {images}
      </section>
    )
  }
}

export default GalleryDisplay;