import React from 'react';

class GalleryDisplay extends React.Component {

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  render() {
    const images = (this.props.screenshots && this.props.screenshots.length > 0) ? this.props.screenshots.map(url => {
      return (
        <img key={url} className='filmstrip' src={url} alt=""/>
      )
    }) : (
      null
    );

    const mainDisplay = (this.props.screenshots && this.props.screenshots.length > 0) ?  (this.getId(this.props.youtube)) ?(
        <span className='main-image'>
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${this.getId(this.props.youtube)}?controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </span>
    ) : (
        <span className='main-image'>
          <img className='carousel-main' src={this.props.screenshots[0]} alt="" />
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