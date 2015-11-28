//'use strict';
$rootScope = require('../src/rootScope');

var inject = function(fn) {
  var newFn;

  return newFn;
};

describe('Scope', function() {
  describe('$root', function() {
    it('should point to itself', function() {
      expect($rootScope.$root).toEqual($rootScope);
      expect($rootScope.hasOwnProperty('$root')).toBeTruthy();
    });


    it('should expose the constructor', function() {
      // if (msie) return;
      expect($rootScope.__proto__).toBe($rootScope.constructor.prototype);
    });


    it('should not have $root on children, but should inherit', function() {
      var child = $rootScope.$new();
      expect(child.$root).toEqual($rootScope);
      expect(child.hasOwnProperty('$root')).toBeFalsy();
    });

  });

  describe('$new()', function() {
    it('should create a child scope', function() {
      var child = $rootScope.$new();
      $rootScope.a = 123;
      expect(child.a).toEqual(123);
    });

    it('should create a non prototypically inherited child scope', function() {
      var child = $rootScope.$new(true);
      $rootScope.a = 123;
      expect(child.a).toBeUndefined();
      expect(child.$parent).toEqual($rootScope);
      expect(child.$new).toBe($rootScope.$new);
      expect(child.$root).toBe($rootScope);
      expect(child.hasOwnProperty('$$watchers')).toBeTruthy();
      expect(child.$$watchers).toEqual(null);
    });

    // it("should attach the child scope to a specified parent", function() {
    //   var isolated = $rootScope.$new(true);
    //   var trans = $rootScope.$new(false, isolated);
    //   $rootScope.a = 123;
    //   expect(isolated.a).toBeUndefined();
    //   expect(trans.a).toEqual(123);
    //   expect(trans.$parent).toBe(isolated);
    // });
  });

  describe('$watch/$digest', function() {
    it('should trigger listener whenever the watchExpression changes', function() {
      $rootScope.name = 'hi';
      $rootScope.counter = 0;

      $rootScope.$watch('name', function(newVal, oldVal) {
        $rootScope.counter += 1;
      });

      expect($rootScope.counter).toEqual(0);
      $rootScope.$digest();
      // the listener is always called during the first $digest loop after it was registered
      expect($rootScope.counter).toEqual(1);

      $rootScope.$digest();
      // but now it will not be called unless the value changes
      expect($rootScope.counter).toEqual(1);

      $rootScope.name = 'adam';
      $rootScope.$digest();
      expect($rootScope.counter).toEqual(2);

    });
  });
});
