import React from 'react';
import { useSelector } from 'react-redux';
import './styles/error.css'

const Error = () => {
  const error = useSelector((state) => state.news.error);

    return (
        <div className='error'>
        Error: {error.message}
      </div>
    );
};

export default Error;