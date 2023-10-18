const CourseService = require('./course.service')
const CourseDao = require('../daos/course.dao.js')
const ServiceError = require('../../utils/services/serviceError')
const TypeOfCourseService = require('./typeOfCourse.service')

jest.mock('../daos/course.dao.js')
jest.mock('./typeOfCourse.service')

describe('Course Service', () => {
  const mock = {
    type: 1,
    year: 2021,
    month: 'diciembre',
    mode: 'remoto en vivo',
    startDate: '01-11-2021',
    endDate: '31-11-2021',
    startHour: '10:00',
    endHour: '13:00',
    weekDays: 'lun, mie y vie',
    availability: true,
    limitToApply: '30-10-2021',
    limitOfStudents: 50,
    priceARS: 17000,
    priceUSD: 100,
    status: 'disponible',
    visibility: false,
    cohortLabel: 'BC2021diciembre-2345',
  }

  const mockWithTypeField = {
    ...mock,
    type: {
      id: 1,
      name: 'Bootcamp',
      tag: 'BC',
    },
  }

  const mockDaoResponseWithType = {
    ...mock,
    typeId: 1,
    name: 'Bootcamp',
    tag: 'BC',
  }

  const cohortLabel = 'BC2021diciembre-2345'

  describe('Create method', () => {
    let mockGetCourseByCohortLabel
    let mockCreateCohortLabel

    beforeAll(() => {
      mockGetCourseByCohortLabel = jest.spyOn(
        CourseService,
        'getCourseByCohortLabel'
      )
      mockCreateCohortLabel = jest.spyOn(CourseService, 'createCohortLabel')
      mockGetCourseByCohortLabel.mockReturnValue(mock)
      mockCreateCohortLabel.mockReturnValue(cohortLabel)
    })

    afterEach(() => {
      CourseDao.create.mockClear()
      mockGetCourseByCohortLabel.mockClear()
      mockCreateCohortLabel.mockClear()
    })

    afterAll(() => {
      mockGetCourseByCohortLabel.mockRestore()
      mockCreateCohortLabel.mockRestore()
    })

    it(`If visibility field wasn't sent, it must give it the value "false" as default`, async () => {
      const course = { ...mock, visibility: undefined }

      await CourseService.addCourse(course)

      const courseCreated = CourseDao.create.mock.calls[0][0]

      expect(courseCreated.visibility).toEqual(false)
    })

    it(`If status field wasn't sent, it must give it the value "disponible" as default`, async () => {
      const course = { ...mock, status: undefined }

      await CourseService.addCourse(course)

      const courseCreated = CourseDao.create.mock.calls[0][0]

      expect(courseCreated.status).toEqual('disponible')
    })

    it(`If availability field wasn't sent, it must give it the value "true" as default`, async () => {
      const course = { ...mock, availability: undefined }

      await CourseService.addCourse(course)

      const courseCreated = CourseDao.create.mock.calls[0][0]

      expect(courseCreated.availability).toEqual(true)
    })

    it('Should add cohortLabel to the course calling the createCohortLabel method', async () => {
      const course = { ...mock, cohortLabel: undefined }

      await CourseService.addCourse(course)

      const courseCreated = CourseDao.create.mock.calls[0][0]

      expect(mockCreateCohortLabel).toHaveBeenCalledTimes(1)
      expect(courseCreated.cohortLabel).toEqual(cohortLabel)
    })

    it('Should call CourseDao.create method with the information received', async () => {
      await CourseService.addCourse(mock)

      expect(CourseDao.create).toHaveBeenCalledWith(mock)
      expect(CourseDao.create).toHaveBeenCalledTimes(1)
    })

    it('Should return the new course calling the getCourseByCohortLabel service', async () => {
      const result = await CourseService.addCourse(mock)
      expect(result).toEqual(mock)
      expect(mockGetCourseByCohortLabel).toHaveBeenCalledTimes(1)
    })
  })

  describe('Update method', () => {
    let getCourse

    const mockWithoutFieldsToCreateCohortLabel = {
      ...mock,
      year: undefined,
      month: undefined,
      type: undefined,
    }

    beforeAll(() => {
      getCourse = jest.spyOn(CourseService, 'getCourse')
      getCourse.mockReturnValue(mock)
    })

    afterEach(() => {
      CourseDao.update.mockClear()
      getCourse.mockClear()
    })

    afterAll(() => {
      getCourse.mockRestore()
    })

    it('Should update cohortLabel if recieve any of the following fields: year, month or type. ', async () => {
      const updateCohortLabel = jest.spyOn(CourseService, 'updateCohortLabel')
      updateCohortLabel.mockReturnValue(cohortLabel)

      await CourseService.updateCourse(1, { year: 2022 })
      await CourseService.updateCourse(1, { month: 'diciembre' })
      await CourseService.updateCourse(1, { type: 1 })
      await CourseService.updateCourse(1, mockWithoutFieldsToCreateCohortLabel)

      expect(updateCohortLabel).toHaveBeenCalled()
      expect(updateCohortLabel.mock.calls.length).toBe(3)
      expect(CourseDao.update).toHaveBeenCalledWith(1, {
        year: 2022,
        cohortLabel,
      })
      expect(CourseDao.update).toHaveBeenCalledWith(1, {
        month: 'diciembre',
        cohortLabel,
      })
      expect(CourseDao.update).toHaveBeenCalledWith(1, {
        type: 1,
        cohortLabel,
      })

      updateCohortLabel.mockRestore()
    })

    it('Should call CourseDao.update method with the information received.', async () => {
      const dataToUpdate = {
        ...mockWithoutFieldsToCreateCohortLabel,
        cohortLabel: '',
      }

      await CourseService.updateCourse(1, mockWithoutFieldsToCreateCohortLabel)

      expect(CourseDao.update).toHaveBeenCalledWith(1, dataToUpdate)
    })

    it('Should return the updated course calling the getCourse method.', async () => {
      const idCourse = 1
      const response = await CourseService.updateCourse(idCourse, {
        mode: 'remoto en vivo',
      })
      expect(response).toEqual(mock)
      expect(getCourse).toHaveBeenCalled()
      expect(getCourse).toHaveBeenCalledTimes(1)
      expect(getCourse).toHaveBeenCalledWith(idCourse)
    })
  })

  describe('Get Course method', () => {
    const courseId = 1

    afterEach(() => {
      CourseDao.get.mockClear()
    })

    it('Should call CourseDao.get with the id received as parameter.', async () => {
      CourseDao.get.mockReturnValue({
        rows: [mockDaoResponseWithType],
      })

      await CourseService.getCourse(courseId)

      expect(CourseDao.get).toHaveBeenCalledWith('id', courseId)
    })

    it("Should throw a service error if there isn't a course with the id received as parameter.", async () => {
      CourseDao.get.mockReturnValue({ rows: [] })

      try {
        await CourseService.getCourse(courseId)
        throw new Error('Forced error')
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError)
        expect(error.message).toBe(`Course with id ${courseId} not found`)
        expect(error.code).toBe(1)
        expect(error.name).toBe('Not Found')
      }
    })

    it('Should return the course with the associated type as a field.', async () => {
      CourseDao.get.mockReturnValue({
        rows: [mockDaoResponseWithType],
      })

      const res = await CourseService.getCourse(courseId)

      expect(res).toEqual(mockWithTypeField)
    })
  })

  describe('Get Course By CohortLabel method', () => {
    afterEach(() => {
      CourseDao.get.mockClear()
    })

    it('Should call CourseDao.get with the cohortLabel received as parameter.', async () => {
      CourseDao.get.mockReturnValue({
        rows: [mockDaoResponseWithType],
      })

      await CourseService.getCourseByCohortLabel(cohortLabel)

      expect(CourseDao.get).toHaveBeenCalledWith(`"cohortLabel"`, cohortLabel)
    })

    it("Should throw a service error if there isn't a course with the cohortLabel received as parameter.", async () => {
      CourseDao.get.mockReturnValue({ rows: [] })

      try {
        await CourseService.getCourseByCohortLabel(cohortLabel)
        throw new Error('Forced error')
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError)
        expect(error.message).toBe(
          `Course with cohortLabel ${cohortLabel} not found`
        )
        expect(error.code).toBe(1)
        expect(error.name).toBe('Not Found')
      }
    })

    it('Should return the course with the associated type as a field.', async () => {
      CourseDao.get.mockReturnValue({
        rows: [mockDaoResponseWithType],
      })

      const res = await CourseService.getCourseByCohortLabel(cohortLabel)

      expect(res).toEqual(mockWithTypeField)
    })
  })

  describe('Create Cohort Label method', () => {
    const idType = 1
    const tagType = 'BC'
    const year = 2021
    const month = 'diciembre'
    const mock = { id: idType, name: 'Bootcamp', tag: tagType }

    beforeAll(() => {
      TypeOfCourseService.getTypeOfCourse.mockImplementation(() => mock)
    })

    afterAll(() => {
      TypeOfCourseService.getTypeOfCourse.mockRestore()
    })

    it('Should call TypesOfCoursesService.getTypeOfCourse with the idType received as parameter.', async () => {
      await CourseService.createCohortLabel(idType, year, month)

      expect(TypeOfCourseService.getTypeOfCourse).toHaveBeenCalledWith(idType)
    })

    it('Should return a cohortLabel that has to be of type string', async () => {
      const res = await CourseService.createCohortLabel(idType, year, month)

      expect(typeof res).toBe('string')
    })

    it('The new cohortLabel hast to contain tagType, year, month and a random number of 4 digits', async () => {
      const res = await CourseService.createCohortLabel(idType, year, month)
      const [name, randomNumber] = res.split('-')

      const secondRes = await CourseService.createCohortLabel(
        idType,
        year,
        month
      )
      const [, secondRandomNumber] = secondRes.split('-')

      expect(name).toBe(`${tagType}${year}${month}`)
      expect(randomNumber.length).toBe(4)
      expect(randomNumber).not.toBe(secondRandomNumber)
    })
  })

  describe('Update Cohort Label  method', () => {
    const idType = 2
    const tagType = 'BCII'
    const mockType = { id: idType, name: 'BootcampII', tag: tagType }

    const idCourse = 1
    const newYear = 2022
    const newMonth = 'noviembre'
    let getCourse

    beforeAll(() => {
      getCourse = jest.spyOn(CourseService, 'getCourse')
      getCourse.mockReturnValue(mockWithTypeField)
      TypeOfCourseService.getTypeOfCourse.mockReturnValue(mockType)
    })

    afterEach(() => {
      getCourse.mockClear()
      TypeOfCourseService.getTypeOfCourse.mockClear()
    })

    afterAll(() => {
      getCourse.mockRestore()
    })

    it('Should call getCourse method with the idCourse received as parameter', async () => {
      await CourseService.updateCohortLabel(idCourse)

      expect(getCourse).toHaveBeenCalled()
      expect(getCourse).toHaveBeenCalledTimes(1)
      expect(getCourse).toHaveBeenCalledWith(idCourse)
    })

    it("If received a new type's id, it has to call the getTypeOfCourse method with the new idType", async () => {
      await CourseService.updateCohortLabel(idCourse, idType)
      await CourseService.updateCohortLabel(idCourse, 'BC')

      const { getTypeOfCourse } = TypeOfCourseService

      expect(getTypeOfCourse).toHaveBeenCalled()
      expect(getTypeOfCourse).toHaveBeenCalledTimes(1)
      expect(getTypeOfCourse).toHaveBeenCalledWith(idType)
    })

    it('Should return a cohortLabel that has to be of type string', async () => {
      const res = await CourseService.updateCohortLabel(idCourse)

      expect(typeof res).toBe('string')
    })

    it("The new cohortLabel hast to contain the new type's tag, the new year, the new month and a random number of 4 digits", async () => {
      const res = await CourseService.updateCohortLabel(
        idCourse,
        idType,
        newYear,
        newMonth
      )
      const [name, randomNumber] = res.split('-')

      const secondRes = await CourseService.updateCohortLabel(
        idCourse,
        idType,
        newYear,
        newMonth
      )
      const [, secondRandomNumber] = secondRes.split('-')

      expect(name).toBe(`${tagType}${newYear}${newMonth}`)
      expect(randomNumber.length).toBe(4)
      expect(randomNumber).not.toBe(secondRandomNumber)
    })

    it("If it doesn't receive a new id type as parameter, it should use the existing type's tag in the finded course", async () => {
      const res = await CourseService.updateCohortLabel(
        idCourse,
        undefined,
        newYear,
        newMonth
      )
      const [name] = res.split('-')
      expect(name).toMatch(`${mockWithTypeField.type.tag}`)
      expect(name).toBe(`${mockWithTypeField.type.tag}${newYear}${newMonth}`)
    })

    it("If it doesn't receive a new year as parameter, it should use the existing year in the finded course", async () => {
      const res = await CourseService.updateCohortLabel(
        idCourse,
        idType,
        undefined,
        newMonth
      )
      const [name] = res.split('-')
      expect(name).toMatch(`${mockWithTypeField.year}`)
      expect(name).toBe(`${tagType}${mockWithTypeField.year}${newMonth}`)
    })

    it("If it doesn't receive a new month as parameter, it should use the existing month in the finded course", async () => {
      const res = await CourseService.updateCohortLabel(
        idCourse,
        idType,
        newYear,
        undefined
      )
      const [name] = res.split('-')
      expect(name).toMatch(`${mockWithTypeField.month}`)
      expect(name).toBe(`${tagType}${newYear}${mockWithTypeField.month}`)
    })
  })
})
