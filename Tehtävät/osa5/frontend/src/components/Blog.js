import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 2,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 2
    }

    return (
      <div style={blogStyle}>
        <ol>
          <div style={hideWhenVisible} onClick={this.toggleVisibility} className="hidden">
            {this.props.blog.title} {this.props.blog.author}
          </div>
          <div style={showWhenVisible} className="visible">
            <div onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</div>
            <div>
              <p>{this.props.blog.url}</p>
              <p>{this.props.blog.likes} likes <button onClick={this.props.handleUpdate}>Like</button></p>
              <p>added by {this.props.blog.user.name}</p>
            </div>
          </div>
        </ol>
      </div>
    )
  }
}

export default Blog