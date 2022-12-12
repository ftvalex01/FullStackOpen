describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testUser',
      password: 'password',
      name: 'Test User',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('log in')
  })

  describe('Login', () => {
    it('succeeds with correct credentials',function(){
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('Test User is logged in')
    })
    it('error with wrong credentials',function(){
      cy.get('#username').type('testUser')
      cy.get('#password').type('passwordWrong')
      cy.get('#login-btn').click()

      cy.get('.error')
      cy.should('contain','Wrong name or password')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testUser',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Testing Title')
      cy.get('#author').type('Testing Author')
      cy.get('#url').type('http://example.com')
      cy.get('#likes').type(2)
      cy.get('#create').click()

      cy.contains('Testing Title')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        const body = {
          title: 'Testing Title',
          author: 'Testing Author',
          url: 'http://example.com',
          likes: 2,
        }
        cy.createBlog(body)
      })

      it('user like a blog', function () {
        cy.contains('view').click()
        cy.get('.like').click()
      })

      it('user who created the blog can delete it', function () {
        cy.contains('view').click()
        cy.get('.remove').click()
        cy.on('windows:confirm', () => true)
      })

      describe('add a few more blogs', function () {
        beforeEach(function () {
          const blog1 = {
            title: 'Testing Title1',
            author: 'Testing Author1',
            url: 'http://example.com',
            likes: 2,
          }
          const blog2 = {
            title: 'Testing Title2',
            author: 'Testing Author2',
            url: 'http://example.com',
            likes: 1,
          }
          const blog3 = {
            title: 'Testing Title3',
            author: 'Testing Author3',
            url: 'http://example.com',
            likes: 5,
          }
          cy.createBlog(blog1)
          cy.createBlog(blog2)
          cy.createBlog(blog3)
        })

        it('and the first blog has maximum likes', function () {
          cy.contains('view').click()
          cy.get('.like').parent().as('likeblock')
          cy.get('@likeblock').contains(5)
        })
      })
    })
  })
})