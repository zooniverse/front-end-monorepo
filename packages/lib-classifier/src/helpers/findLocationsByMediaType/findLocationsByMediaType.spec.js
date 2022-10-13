import findLocationsByMediaType from './findLocationsByMediaType'
import { SubjectFactory } from '@test/factories'
import sinon from 'sinon'
import find from 'lodash/find'

describe('Helper > findLocationsByMediaType', function () {
  const subject = SubjectFactory.build({
    locations: [
      { 'image/png': 'https://www.example.com/image.png' },
      { 'image/gif': 'https://www.example.com/image.gif' },
      { 'image/jpeg': 'https://www.example.com/image.jpg' },
      { 'image/jpeg': 'https://www.example.com/image.jpeg' },
      { 'text/plain': 'https://www.example.com/text.txt' },
      { 'application/json': 'https://www.example.com/data.json' },
      { 'audio/mp3': 'https://www.example.com/sound.mp3' },
      { 'audio/m4a': 'https://www.example.com/sound.m4a' },
      { 'audio/mpeg': 'https://www.example.com/sound.mp3' },
      { 'video/mpeg': 'https://www.example.com/video.mpeg' },
      { 'video/mp4': 'https://www.example.com/video.mp4' },
      { 'video/x-m4v': 'https://www.example.com/video.m4v' }
    ]
  })

  it('should be a function', function () {
    expect(findLocationsByMediaType).to.be.a('function')
  })

  it('should default to return an empty array if no locations are found', function () {
    expect(findLocationsByMediaType([], 'images')).to.be.empty()
  })

  describe('when given a media type parameter', function () {
    it('should return valid locations for image media type', function () {
      const locations = findLocationsByMediaType(subject.locations, 'image')
      expect(locations).to.deep.equal([
        { 'image/png': 'https://www.example.com/image.png' },
        { 'image/gif': 'https://www.example.com/image.gif' },
        { 'image/jpeg': 'https://www.example.com/image.jpg' },
        { 'image/jpeg': 'https://www.example.com/image.jpeg' }
      ])
    })

    it('should return valid locations for audio media type', function () {
      const locations = findLocationsByMediaType(subject.locations, 'audio')
      expect(locations).to.deep.equal([
        { 'audio/mp3': 'https://www.example.com/sound.mp3' },
        { 'audio/m4a': 'https://www.example.com/sound.m4a' },
        { 'audio/mpeg': 'https://www.example.com/sound.mp3' }
      ])
    })

    it('should return valid locations for video media type', function () {
      const locations = findLocationsByMediaType(subject.locations, 'video')
      expect(locations).to.deep.equal([
        { 'video/mpeg': 'https://www.example.com/video.mpeg' },
        { 'video/mp4': 'https://www.example.com/video.mp4' },
        { 'video/x-m4v': 'https://www.example.com/video.m4v' }
      ])
    })

    it('should return valid locations for application media type', function () {
      const locations = findLocationsByMediaType(subject.locations, 'application')
      expect(locations).to.deep.equal([
        { 'application/json': 'https://www.example.com/data.json' }
      ])
    })

    it('should return valid locations for text media type', function () {
      const locations = findLocationsByMediaType(subject.locations, 'text')
      expect(locations).to.deep.equal([
        { 'text/plain': 'https://www.example.com/text.txt' }
      ])
    })
  })

  describe('when no locations are defined', function () {
    let consoleErrorSpy
    before(function () {
      consoleErrorSpy = sinon.spy(console, 'error')
    })

    after(function () {
      consoleErrorSpy.restore()
    })

    it('should log an error message', function () {
      try {
        findLocationsByMediaType(undefined, 'images')
      } catch (error) {
        expect(consoleErrorSpy).to.have.been.calledWith('Cannot find subject locations by media type. No subject locations.')
      }
    })

    it('should return an empty array', function () {
      let locations
      try {
        locations = findLocationsByMediaType(undefined, 'images')
      } catch (error) {
        expect(locations).to.have.lengthOf(0)
      }
    })
  })

  describe('when no media type is defined', function () {
    let consoleErrorSpy
    before(function () {
      consoleErrorSpy = sinon.spy(console, 'error')
    })

    after(function () {
      consoleErrorSpy.restore()
    })

    it('should log an error message', function () {
      try {
        findLocationsByMediaType(subject.locations)
      } catch (error) {
        expect(consoleErrorSpy).to.have.been.calledWith('Cannot find subject locations by media type. No media type defined.')
      }
    })

    it('should return an empty array', function () {
      let locations
      try {
        locations = findLocationsByMediaType(subject.locations)
      } catch (error) {
        expect(locations).to.have.lengthOf(0)
      }
    })
  })
})