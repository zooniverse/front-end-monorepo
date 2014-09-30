# @cjsx React.DOM

React = require 'react'

Main = React.createClass
  render: ->
    <h1>Zooniverse React Components!</h1>

React.renderComponent Main(null), document.getElementById('app')
