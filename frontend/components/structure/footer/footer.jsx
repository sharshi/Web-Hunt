import React from "react";
class Footer extends React.Component {
  render() {
    
    const sites = {
      github: 'https://github.com/sharshi',
      linkedin: 'https://www.linkedin.com/in/sharshi/',
      portfolio: 'http://www.sharshi.com/'
    };

    const links = Object.keys(sites).map(site => {
      return (
        <span key={site}><a target='_blank' href={sites[site]}>{site}</a></span>
      )
    })

    return (
      <footer className="footer">
        <section>
          <p>&copy; 2021 Shersheial Borisute</p> 
          <ul>
            {links}
          </ul>
        </section>
        <br/><br/>
      </footer>
    )
  }
}

export default Footer;
