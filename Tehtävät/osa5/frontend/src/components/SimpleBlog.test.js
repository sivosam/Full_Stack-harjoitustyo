import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  it('renders title and author', () => {
    const blog = {
      title: "Blogi",
      author: "Jaakko",
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.titleAuthor')

    expect(contentDiv.text()).toContain(blog.title && blog.author)
  })
  it('renders likes', () => {
    const blog = {
      title: "Blogi",
      author: "Jaakko",
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.likes')

    expect(contentDiv.text()).toContain(blog.likes)
  })
  it('clicking button twice calls handler twice', () => {
    const blog = {
      title: "Blogi",
      author: "Jaakko",
      likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})