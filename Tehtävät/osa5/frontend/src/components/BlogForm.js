import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({handleSubmit, handleChange, title, author, url}) => {
  return (
  <div>
    <h2>Add a new blog</h2>
    <form onSubmit={handleSubmit}>
      <div>
        Title:
      <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange} />
      </div>
      <div>
        Author:
      <input
          type="text"
          name="author"
          value={author}
          onChange={handleChange} />
      </div>
      <div>
        URL:
      <input
          type="text"
          name="url"
          value={url}
          onChange={handleChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm