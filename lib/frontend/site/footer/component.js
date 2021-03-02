import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import config from 'lib/config'

export default class Footer extends Component {

  render () {
    return (
      <div>   
        <footer className='ext-footer'>
          <div className='footer container'>
            <div className='institutional'>
              <div className='logo gob'>
                <a href='/'>
                  <img src={config.logoFooter} />
                </a>
              </div>
              <p className='text-muted small'>
                Los contenidos de esta página están licenciados bajo <a href='https://www.gnu.org/licenses/gpl-3.0-standalone.html'>GNU General Public License v3.0</a>
              </p>
            </div>
              <nav className='menu'>
                <Link className='text-primary' to='/ayuda/como-funciona'>¿Cómo funciona?</Link>
                <Link className='text-primary' to='/ayuda/acerca'>Acerca de este sitio</Link>
                <Link className='text-primary' to='/ayuda/acerca'>Contacto</Link>
              </nav>
              <nav className='menu'>
                <Link className='text-primary' to='/ayuda/terminos-y-condiciones'>{ t('help.tos.title')}</Link>
                <Link className='text-primary' to='/ayuda/privacidad'>{ t('help.pp.title')}</Link>
                <div>

              <a className='text-primary' style={{display: 'inline', marginRight: '5px'}} href='https://www.facebook.com/Listasparagobernar' target='_blank'>
                <i className='fab fa-facebook fa-lg' style={{lineHeight: 'inherit'}}></i>
              </a>
              <a className='text-primary' style={{display: 'inline', marginRight: '5px'}} href='https://www.instagram.com/estamoslistas' target='_blank'>
                <i className='fab fa-instagram fa-lg' style={{lineHeight: 'inherit'}}></i>
              </a>
              <a className='text-primary' style={{display: 'inline', marginRight: '5px'}} href='https://twitter.com/Estamos_Listas' target='_blank'>
                <i className='fab fa-twitter fa-lg' style={{lineHeight: 'inherit'}}></i> 
              </a>
              <a className='text-primary' style={{display: 'inline', marginRight: '0px'}} href='https://www.youtube.com/channel/UCoIyQqhtC13AV3MlUfFHU_w' target='_blank'>
                <i className='fab fa-youtube fa-lg' style={{lineHeight: 'inherit'}}></i> 
              </a>
                </div>
              </nav>
          </div>
        </footer>
        <div className='coo-coo-container'>
          <img className='coo-coo' src='/lib/frontend/site/home-multiforum/coo-coo-estamos-listas.svg' />
        </div>
      </div>
    )
  }
}
