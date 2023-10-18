const UserService = require('./user.service')
const UserDao = require('../daos/user.dao.js')
const ServiceError = require('./utils/serviceError')
const { comparePassword } = require('../utils/bcrypt')

jest.mock('../utils/bcrypt')
jest.mock('../daos/user.dao.js')

describe('User Service', () => {
  const mock = {
    id: 1,
    firstName: 'José',
    lastName: 'Perez',
    email: 'jose.perez@gmail.com',
    password: '$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW',
    secretKey: '2c4d81aab2c04a86ba9f7b199bfac054',
  }

  describe('Create method', () => {
    it('Should create a user', async () => {
      const mock = {
        id: 1,
        firstName: 'José',
        lastName: 'Perez',
        email: 'jose.perez@gmail.com',
      }

      UserDao.get.mockImplementationOnce(() => ({ rows: [mock] }))

      const user = {
        firstName: 'José',
        lastName: 'Perez',
        email: 'jose.perez@gmail.com',
        password: 'contraseña1234',
      }

      const result = await UserService.addUser(user)

      expect(result).toEqual(mock)
    })
  })

  describe('Get method', () => {
    it("Should fail if it can't find a user", async () => {
      UserDao.get.mockImplementationOnce(() => ({ rows: [] }))

      try {
        await UserService.getUser(1)
        throw new Error('Forced Error')
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError)
        expect(error.message).toBe('User not found.')
        expect(error.code).toBe(1)
        expect(error.name).toBe('Not Found')
      }
    })

    it('Should get a user', async () => {
      UserDao.get.mockImplementationOnce(() => ({ rows: [mock] }))

      const result = await UserService.getUser(1)

      expect(result).toEqual(mock)
    })
  })

  describe('Get By Email method', () => {
    it("Should fail if it can't find a user", async () => {
      UserDao.get.mockImplementationOnce(() => ({ rows: [] }))

      try {
        await UserService.getUserByEmail('jose.perez@gmail.com')
        throw new Error('Forced error')
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError)
        expect(error.message).toBe('User not found.')
        expect(error.name).toBe('Not Found')
      }
    })

    it('Should get a user', async () => {
      UserDao.get.mockImplementationOnce(() => ({ rows: [mock] }))

      const result = await UserService.getUserByEmail('jose.perez@gmail.com')

      expect(result).toEqual(mock)
    })
  })

  describe('Login method', () => {
    beforeEach(() => {
      UserDao.get.mockImplementationOnce(() => ({ rows: [mock] }))
    })

    it("Should fail if password doesn't match", async () => {
      comparePassword.mockImplementationOnce(() => false)

      try {
        await UserService.login('constraseña12345', 'jose.perez@gmail.com')
        throw new Error('Forced error')
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError)
        expect(error.message).toBe('Check the password.')
        expect(error.code).toBe(2)
        expect(error.name).toBe('Invalid Password')
      }
    })

    it('Should return a token', async () => {
      comparePassword.mockImplementationOnce(() => true)

      const result = await UserService.login(
        'constraseña1234',
        'jose.perez@gmail.com'
      )

      expect(typeof result).toBe('string')
    })
  })

  describe('Logout method', () => {
    it('It has to generate new SecretKey', async () => {})
  })
})
