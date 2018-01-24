import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  onSubmit(e) {
    const url = this.state.url;
    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState(() => ({ error: err.reason }))
      }
    });
    
  }

  onChange(e) {
    e.persist();
    this.setState(() => ({
      url: e.target.value.trim()
    }))
  }

  handleModalClose() {
    this.setState({isOpen: false, url: '', error: ''})
  }

  render() {
    return (
      <div>
        <button className='button' onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel={'Add Link'}
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
          >
          <h1>Add link</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
            <input type='text' 
              ref='url' 
              placeholder='URL' 
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className='button'>Add link</button>
            <button type='button' className='button button--secondary' onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}