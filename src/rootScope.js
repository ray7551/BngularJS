/*jslint node: true */
"use strict";

var Scope = function() {
  this.$$watchers = this.$parent = null;
  this.$root = this;
};

Scope.prototype = {
  constructor: Scope,
  $new: function(isolate) {
    var child,
        Child = function() {};

    if(isolate) {
      child = new Scope();
      child.$root = this.$root;
    } else {
      Child.prototype = this;
      child = new Child();
    }
    child.$parent = this;
    return child;
  },

  $watch: function(watchExp, listener) {
    var scope = this,
        watcher = {
          watchExp: watchExp,
          listener: listener,
          last: null
        };

    if(!scope.$$watchers) {
      scope.$$watchers = [];
    }
    scope.$$watchers.unshift(watcher);
  },

  //$watchCollection
  $digest: function() {
    var scope = this;
    scope.$$watchers.forEach(function(watcher){
      var newVal = scope[watcher.watchExp];
      if(watcher.last !== newVal) {
        watcher.listener(newVal, watcher.last);
        watcher.last = newVal;
      }
    });
  }

  //$apply
  //$on
  //$emit
  //$boardcast

};

var $rootScope = new Scope();

module.exports = $rootScope;