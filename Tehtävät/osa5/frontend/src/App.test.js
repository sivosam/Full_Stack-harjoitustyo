import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'


describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders no blogs when in login screen', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toBe(0)
  })
})