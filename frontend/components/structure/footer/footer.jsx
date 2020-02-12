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
        <span key={site}> | <a target='_blank' href={sites[site]}>{site}</a></span>
      )
    })

    return (
      <footer className="footer">
        <section>
          &copy; 2020 Shersheial Borisute {links}
          <br /><br />
          Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </section>
      </footer>
    )
  }
}

export default Footer;