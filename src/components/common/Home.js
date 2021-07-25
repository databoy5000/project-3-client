import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  React.useEffect( () => {
    console.log(
      '%c  -- GA Project: WoCRO --','font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)', '\n',
      'Hi there, thanks for checking out this project.', '\n',
      'I\'m currently looking for employement opportunities.', '\n',
      'Feel free to get in touch if you\'d like to have a chat!', '\n',
      '{', '\n',
      '  name: \'Anthony Graham\',', '\n',
      '  peopleCallMe: \'🐜\',', '\n',
      '  title', ': \'Junior Software Engineer\',', '\n',
      '  github: \'https://github.com/databoy5000\',', '\n',
      '  linkedin: \'https://www.linkedin.com/in/anthonygdev/\',', '\n',
      '  projectReadMe: \'https://github.com/databoy5000/project-3-client/blob/development/README.md\',', '\n',
      '}'
    )
  },[])

  return (
    < section className="hero is-large">
      <div className="hero-head">
      </div>
      <div className="hero-body home-background">
      </div>

      <div className="hero-foot">
        
        <nav className="tabs is-boxed is-fullwidth">

          <div className="container">
            
            <ul>
              <li className="is-active has-text-info">
                <Link to="/register" >Register</Link>
              </li>

              <li>
                <Link to="/about" >About</Link>
              </li>
            </ul>

          </div>
          
        </nav>

      </div>
    </section >


  )
}


export default Home