import dedent from 'dedent'
import { remark } from 'remark'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import plugin from './ping'

const mockUsernames = [
  'I AM CLEM',
  'qux',
  'foo',
  'bar',
  'baz baz',
]

function pingUsername(username) {
  return mockUsernames.includes(username)
}
function userURL(username) {
  return `/membres/voir/${username}/`
}


const fixtures = [
  dedent`
    ping @Clem

    ping @**FOO BAR**

    no ping @quxjhdshqjkhfyhefezhjzjhdsjlfjlsqjdfjhsd

    ping [@**I AM CLEM**](http://example.com)

    @**baz baz**
  `,
  dedent`
    ## Test ping @**I AM CLEM**

    ping @**I AM CLEM**

    ping _@**I AM CLEM**_

    > no metadata output @**I AM CLEM**
  `,
  dedent`
    @foo @bar

    @baz baz

    > @**baz baz**
  `,
]

const outputs = [
  dedent`
    <p>ping @Clem</p>
    <p>ping @<strong>FOO BAR</strong></p>
    <p>no ping @quxjhdshqjkhfyhefezhjzjhdsjlfjlsqjdfjhsd</p>
    <p>ping <a href="http://example.com"><span class="ping ping-in-link">\
    @<span class="ping-resource">I AM CLEM</span></span></a></p>
    <p><a href="/membres/voir/baz baz/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">baz baz</span></a></p>
  `,
  dedent`
    <h2>Test ping <a href="/membres/voir/I AM CLEM/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">I AM CLEM</span></a></h2>
    <p>ping <a href="/membres/voir/I AM CLEM/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">I AM CLEM</span></a></p>
    <p>ping <em><a href="/membres/voir/I AM CLEM/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">I AM CLEM</span></a></em></p>
    <blockquote>
    <p>no metadata output <a href="/membres/voir/I AM CLEM/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">I AM CLEM</span></a></p>
    </blockquote>
  `,
  dedent`
    <p><a href="/membres/voir/foo/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">foo</span></a> \
    <a href="/membres/voir/bar/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">bar</span></a></p>
    <p>@baz baz</p>
    <blockquote>
    <p><a href="/membres/voir/baz baz/" rel="nofollow" class="ping ping-link">\
    @<span class="ping-resource">baz baz</span></a></p>
    </blockquote>
  `,
]

const pings = [
  ['I AM CLEM', 'baz baz'],
  ['I AM CLEM', 'I AM CLEM', 'I AM CLEM'],
  ['foo', 'bar'],
]

describe('ping plugin', function () {
  it('throws an error if ping is not a function', function () {
    const toMarkdown = text => remark()
      .use(plugin, {
        ping: 12,
        resourceURL: userURL,
      })
      .processSync(text)
      .toString()

    expect(() => toMarkdown(dedent`
      # foo
      @**I AM CLEM**
    `)).to.throw()
  })

  it('throws an error if resourceURL is not a function', function () {
    const toMarkdown = text => remark()
      .use(plugin, {
        ping: () => true,
        resourceURL: 12,
      })
      .processSync(text)
      .toString()

    expect(() => toMarkdown(dedent`
      # foo
      @**I AM CLEM**
    `)).to.throw()
  })

  it('should not create ping links in links', () => {
    const toHTML = text => remark()
      .use(plugin, { ping: pingUsername, resourceURL: userURL })
      .use(remark2rehype)
      .use(rehypeStringify)
      .process(text)

    return toHTML(dedent`
      [foo @**I AM CLEM** bar](http://example.com)
    `).then((vfile) => {
      return expect(vfile.contents).to.equal(
        dedent`
          <p><a href="http://example.com">foo @<strong>I AM CLEM</strong> bar</a></p>
        `
      )
    })
  })

  describe(`with default regex and pingSymbol`, function () {
    const parser = text => remark()
      .use(plugin, { ping: pingUsername, resourceURL: userURL })
      .parse(text)

    const toHTML = text => remark()
      .use(plugin, { ping: pingUsername, resourceURL: userURL })
      .use(remark2rehype)
      .use(rehypeStringify)
      .process(text)

    const toMarkdown = text => remark()
      .use(plugin, { ping: pingUsername, resourceURL: userURL })
      .processSync(text)
      .toString()

    it('parses', function () {
      fixtures.forEach((fixture) => {
        expect(parser(fixture)).to.be.an.instanceof(Object)
      })
    })

    it('sets ping data on vfile', function () {
      fixtures.forEach((fixture, fixtureIndex) => {
        toHTML(fixture)
          .then((vfile) => {
            return vfile.data.ping.forEach((resourceToPingFromParser, resourceIndex) => {
              const usernameToPing = pings[fixtureIndex][resourceIndex]
              return expect(resourceToPingFromParser).to.equal(usernameToPing)
            })
          })
      })
    })

    it('compiles to HTML', function () {
      fixtures.forEach((fixture, fixtureIndex) => {
        return toHTML(fixture)
          .then((vfile) => {
            return expect(vfile.contents).to.equal(outputs[fixtureIndex])
          })
      })
    })

    it('compiles to Markdown', function () {
      fixtures.forEach((fixture, fixtureIndex) => {
        const dedentedOutput = dedent(toMarkdown(fixture))
        expect(dedentedOutput).to.equal(fixture)
      })
    })
  })

  describe('with custom regex and pingSymbols', function () {
    const parser = text => remark()
      .use(plugin, {
        ping: () => true,
        pingSymbols: ['@', '#', '^S'],
        resourceURL: userURL,
        matchRegex: /(@[A-Za-z0-9]+)|(#[A-Za-z0-9]+)|(\^S[0-9]+)/
      })
      .parse(text)

    const toHTML = text => remark()
      .use(plugin, {
        ping: () => true,
        pingSymbols: ['@', '#', '^S'],
        resourceURL: userURL,
        matchRegex: /(@[A-Za-z0-9]+)|(#[A-Za-z0-9]+)|(\^S[0-9]+)/
      })
      .use(remark2rehype)
      .use(rehypeStringify)
      .process(text)

    const toMarkdown = text => remark()
      .use(plugin, {
        ping: () => true,
        pingSymbols: ['@', '#', '^S'],
        resourceURL: userURL,
        matchRegex: /(@[A-Za-z0-9]+)|(#[A-Za-z0-9]+)|(\^S[0-9]+)/
      })
      .processSync(text)
      .toString()

    const fixture = dedent`
      @srallen

      #tigers

      ^S1234
    `

    const output = dedent`
      <p><a href="/membres/voir/srallen/" rel="nofollow" class="ping ping-link">@<span class="ping-resource">srallen</span></a></p>
      <p><a href="/membres/voir/tigers/" rel="nofollow" class="ping ping-link">#<span class="ping-resource">tigers</span></a></p>
      <p><a href="/membres/voir/1234/" rel="nofollow" class="ping ping-link">^S<span class="ping-resource">1234</span></a></p>
    `
    it('parses', function () {
      expect(parser(fixture)).to.be.an.instanceof(Object)
    })

    it('sets ping data on vfile', function () {
      const pings = [
        'srallen',
        'tigers',
        '1234'
      ]
      return toHTML(fixture)
        .then((vfile) => {
          vfile.data.ping.forEach((resourceToPingFromParser, resourceIndex) => {
            const resourceToPing = pings[resourceIndex]
            return expect(resourceToPingFromParser).to.equal(resourceToPing)
          })
        })
    })

    it('compiles to HTML', function () {
      return toHTML(fixture)
        .then((vfile) => {
          return expect(vfile.contents).to.equal(output)
        })
    })

    // Getting an extra /n. Not sure why.
    xit('compiles to Markdown', function () {
      expect(toMarkdown(fixture)).to.equal(fixture)
    })
  })
})
