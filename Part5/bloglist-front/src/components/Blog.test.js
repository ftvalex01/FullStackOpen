import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'




describe('Test Blog', () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    const user = {
      name :'Test user',
      username:'TestUsername'
    }

    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'Blog Url',
      likes: 10,
      user:{
        username:'TestUsername'
      }
    }
    component = render(<Blog blog={blog} user={user} updateBlog={mockHandlerUpdate} deleteBlog={mockHandlerDelete}/>)
  })



  test('render component', () => {
    expect(component).toBeDefined()
  })
  test('a blog renders the blog`s title and author', () => {
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')

    expect(title).toHaveTextContent('Blog title')
    expect(author).toHaveTextContent('Blog author')

    const details = component.container.querySelector('.blog-details')
    expect(details).toBe(null)
  })
  test('when show button is clicked must show details',() => {
    let button = component.getByText('view')
    fireEvent.click(button)

    button = component.getByText('hide')
    expect(button).toBeDefined()

    const details = component.container.querySelector('.blog-details')

    expect(details).toBeDefined()
  })
  test('calls the update handler twice when button likes is clicked',() => {
    let viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    let likeButton = component.getByText('Add')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})

