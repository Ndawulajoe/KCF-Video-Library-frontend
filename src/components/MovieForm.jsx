import React, { useState } from 'react';

const MovieForm = ({ onSubmit, initialData }) => {

  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = 'https://ndawulajoe-kcf-video-library-backend.onrender.com/movies';
      const headers = {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      };

      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const data = await response.json();

   
        // onSubmit(data);
      alert('Movie submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description || ''}
        onChange={handleChange}
        required
      />

      <label>Director:</label>
      <input
        type="text"
        name="director"
        value={formData.director || ''}
        onChange={handleChange}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price || ''}
        onChange={handleChange}
        min={0}
        required
      />

      <label>Rating:</label>
      <input
        type="number"
        name="rating"
        value={formData.rating || ''}
        onChange={handleChange}
        min={0}
        max={5}
        required
      />

      <label>Genre:</label>
      <input
        type="text"
        name="genre"
        value={formData.genre || ''}
        onChange={handleChange}
        required
      />

      <label>Cover Image URL:</label>
      <input
        type="text"
        name="cover_image"
        value={formData.cover_image || ''}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;
