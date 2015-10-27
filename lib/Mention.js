'use strict';

var React = require('react');
var emptyFunction = require('fbjs/lib/emptyFunction');
var utils = require('./utils');

module.exports = React.createClass({

  displayName: 'Mention',

  propTypes: {
    /**
     * Called when a new mention is added in the input
     *
     * Example:
     *
     * ```js
     * function(id, display) {
     *   console.log("user " + display + " was mentioned!");
     * }
     * ```
     */
    onAdd: React.PropTypes.func,

    renderSuggestion: React.PropTypes.func

  },

  getDefaultProps: function getDefaultProps() {
    return {
      trigger: "@",
      onAdd: emptyFunction,
      onRemove: emptyFunction,
      renderSuggestion: null,
      isLoading: false
    };
  },

  render: function render() {
    return React.createElement(
      'strong',
      null,
      this.props.display
    );
  }

});