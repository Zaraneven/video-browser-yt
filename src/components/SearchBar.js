import React, { useState } from 'react'

const SearchBar = ({ onTermSubmit }) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = event => {
        event.preventDefault();
        onTermSubmit(term);
    }

    return (
        <div className='search'>
        <div className='ui segment search-bar' onSubmit={onFormSubmit}>
          <form className='ui form'>
              <div className='field'>
                  <label>Video Search</label>
                  <input 
                    type='text'
                    value={term}
                    onChange={event => setTerm(event.target.value)} />
              </div>
          </form>
        </div>
        </div>
    )
}

export default SearchBar;
