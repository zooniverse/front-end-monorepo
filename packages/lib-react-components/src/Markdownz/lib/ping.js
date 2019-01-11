// This is basically a fork of https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-ping
// The changes made here make the plugin more flexible for supporting hashtags or other custom mentions
// remark-ping only supports at-mentions of users

import visit from 'unist-util-visit'

const helpMsg = `remark-ping: expected configuration to be passed: {
  ping: (resourceToPing, pingSymbol) => bool,\n  resourceURL: (resourceToPing, pingSymbol) => string\n}`

export default function plugin({
  ping,
  pingSymbols = ['@'],
  resourceURL,
  matchRegex = /@(?:\*\*([^*]+)\*\*|(\w+))/,
}) {
  if (typeof ping !== 'function' || typeof resourceURL !== 'function') {
    throw new Error(helpMsg)
  }

  function inlineTokenizer(eat, value, silent) {
    const match = matchRegex.exec(value)
    if (!match || match.index > 0) return
    const total = match[0]
    const symbol = pingSymbols.find((element) => total.indexOf(element) === 0)
    const resource = match.find((matchItem) => matchItem && !matchItem.includes(symbol)) || total.split(symbol)[1]

    if (ping(resource, symbol) === true) {
      const url = resourceURL(resource, symbol)

      return eat(total)({
        type: 'ping',
        resource: resource,
        symbol: symbol,
        url: url,
        data: {
          hName: 'a',
          hProperties: {
            href: url,
            rel: 'nofollow',
            class: 'ping ping-link',
          },
        },
        children: [{
          type: 'text',
          value: symbol,
        }, {
          type: 'emphasis',
          data: {
            hName: 'span',
            hProperties: {
              class: 'ping-resource',
            },
          },
          children: [{
            type: 'text',
            value: resource,
          }],
        }],
      })
    } else {
      return eat(symbol)({
        type: 'text',
        value: symbol,
      })
    }
  }

  function locator(value, fromIndex) {
    const keep = matchRegex.exec(value, fromIndex)
    if (keep) {
      const symbol = pingSymbols.find((element) => keep[0].indexOf(element) === 0)

      return value.indexOf(symbol, keep.index)
    }
    return -1
  }

  inlineTokenizer.locator = locator

  const Parser = this.Parser

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.ping = inlineTokenizer
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'ping')

  const Compiler = this.Compiler

  // Stringify
  if (Compiler) {
    const visitors = Compiler.prototype.visitors
    visitors.ping = (node) => {
      if (!node.resource.includes(' ')) {
        return `${node.symbol}${node.resource}`
      }
      return `${node.symbol}**${node.resource}**`
    }
  }

  return (tree, file) => {
    // mark pings in blockquotes, later on we'll need that info to avoid pinging from quotes
    visit(tree, 'blockquote', markInBlockquotes)
    // remove ping links from pings already in links
    visit(tree, 'link', (node) => {
      visit(node, 'ping', (ping, index) => {
        ping.data.hName = 'span'
        ping.data.hProperties = { class: 'ping ping-in-link' }
      })
    })
    visit(tree, 'ping', (node) => {
      if (!node.__inBlockquote) {
        if (!file.data[node.type]) {
          file.data[node.type] = []
        }
        // collect resources to ping, they will be made available on the vfile
        // for some backend to act on
        file.data[node.type].push(node.resource)
      }
    })
  }
}

function markInBlockquotes(node) {
  mark(node)

  if (node.children) {
    node.children.map((n, i) => markInBlockquotes(n))
  }
}

function mark(node) {
  if (node.type === 'ping') node.__inBlockquote = true
}