import React, { Component } from 'react'
import t from 't-component'
import FormAsync from 'lib/frontend/site/form-async'

export default class GetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      errors: null,
      email: '',
      success: false
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.onFail = this.onFail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.setState({ success: false })
  }

  onSubmit (data) {
    this.setState({ loading: true })
  }

  onSuccess (res) {
    this.setState({
      loading: false,
      success: true,
      errors: null
    })
  }

  onFail (err) {
    this.setState({ loading: false, errors: err })
  }

  render () {
    return (
      <div className='center-container'>
        <div id='forgot-form'>
          <div className='title-page'>
            <div className='circle'>
              <i className='icon-envelope' />
            </div>
            <h1>Pedí tu contraseña</h1>
          </div>
          <p className={!this.state.success ? 'explanation-message' : 'hide'}>
            Te enviaremos un correo electrónico con un enlace para configurar tu contraseña.
          </p>
          <p className={this.state.success ? 'success-message' : 'hide'}>
            Enviamos un mensaje a tu correo electrónico con instrucciones para crear una nueva contraseña.
          </p>
          <FormAsync
            action='/api/forgot'
            hidden={this.state.success}
            onSuccess={this.onSuccess.bind(this)}
            onFail={this.onFail.bind(this)}
            onSubmit={this.onSubmit.bind(this)}>
            <ul
              className={this.state.errors ? 'form-errors' : 'hide'}>
              {
                this.state.errors && this.state.errors
                  .map((error, key) => (<li key={key}>{error}</li>))
              }
            </ul>
            <div className='form-group'>
              <label htmlFor='forgot-email'>{t('signup.email')}</label>
              <input
                type='email'
                className='form-control'
                name='email'
                maxLength='200'
                tabIndex={1}
                placeholder={t('forgot.mail.example')}
                required />
            </div>
            <div className='form-group'>
              <button
                className={!this.state.loading ? 'btn btn-primary btn-block' : 'hide'}
                type='submit'
                tabIndex={3}>
                {t('forgot.reset')}
              </button>
              <button
                className={this.state.loading ? 'loader-btn btn btn-block btn-default' : 'hide'}>
                <div className='loader' />
                {t('forgot.reset')}
              </button>
            </div>
          </FormAsync>
        </div>
      </div>
    )
  }
}
