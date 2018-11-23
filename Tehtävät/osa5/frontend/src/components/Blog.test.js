import React from 'react'
import Blog from './Blog'
import { shallow } from 'enzyme'

describe('<Blog />', () => {

  it('only after clicking name the details are displayed', () => {
    const blog = {
      title: "Blogi",
      author: "Jaakko",
      likes: 5,
      url: "google.com",
      user: "5beede91699467fecac6bdcb"
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog blog={blog} handleUpdate={mockHandler} />)
    
    const hiddenDiv = blogComponent.find('.hidden')
    expect(hiddenDiv.text()).toContain(blog.title && blog.author)
    
    hiddenDiv.simulate('click')  
  
    const visibleDiv = blogComponent.find('.visible')
    expect(visibleDiv.text()).toContain(blog.likes, blog.url, blog.user)
    
  })

})