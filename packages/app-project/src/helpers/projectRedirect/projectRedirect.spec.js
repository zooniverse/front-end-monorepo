import projectRedirect from './'

describe('Helpers > projectRedirect', function () {
  const PROJECT = {
    redirect: 'http://sunspotter.org/#/',
    slug: 'zooniverse/sunspotter'
  }
  const params = { panoptesEnv: 'production' }

  describe('without a project redirect', function () {
    it('should return null', function () {
      const result = projectRedirect({ params, project: { slug: 'test-owner/test-project' } })
      expect(result).to.equal(null)
    })
  })

  describe('to the external site', function () {
    it('should redirect to project.redirect', function () {
      const result = projectRedirect({ params, project: PROJECT })
      expect(result).to.deep.equal({
        redirect: {
          destination: 'http://sunspotter.org/#/',
          permanent: false
        }
      })
    })
  })

  describe('to the project home page', function () {
    it('should redirect to the project slug', function () {
      const result = projectRedirect({ params, project: PROJECT, toHomePage: true })
      expect(result.redirect.destination).to.equal('/zooniverse/sunspotter')
    })

    it('should keep a non-default locale', function () {
      const result = projectRedirect({
        defaultLocale: 'en',
        locale: 'fr',
        params,
        project: PROJECT,
        toHomePage: true
      })
      expect(result.redirect.destination).to.equal('/fr/zooniverse/sunspotter')
    })

    it('should keep a non-default Panoptes environment', function () {
      const result = projectRedirect({
        params: { panoptesEnv: 'staging' },
        project: PROJECT,
        toHomePage: true
      })
      expect(result.redirect.destination).to.equal('/zooniverse/sunspotter?env=staging')
    })
  })
})
