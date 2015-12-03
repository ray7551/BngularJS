//'use strict';
define(['rootScope'], function($rootScope) {

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
      expect(child.$$watchers).toEqual([]);
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
    it('should watch and fire on simple property change', function() {
      var spy = jasmine.createSpy();
      $rootScope.$watch('name', spy);
      $rootScope.$digest();

      spy.calls.reset();

      expect(spy).not.toHaveBeenCalled();
      $rootScope.$digest();
      expect(spy).not.toHaveBeenCalled();
      $rootScope.name = 'misko';
      $rootScope.$digest();
      expect(spy).toHaveBeenCalledWith('misko', undefined, $rootScope);
    });

    it('should watch and fire on expression change', function() {
      var spy = jasmine.createSpy();
      $rootScope.$watch('name.first', spy);
      $rootScope.$digest();
      spy.calls.reset();

      $rootScope.name = {};
      expect(spy).not.toHaveBeenCalled();
      $rootScope.$digest();
      expect(spy).not.toHaveBeenCalled();
      $rootScope.name.first = 'misko';
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });

    it('should watch and fire on function return change', function() {
      var spy = jasmine.createSpy();
      var name;
      $rootScope.$watch(function() {
        return name;
      }, spy);
      $rootScope.$digest();

      spy.calls.reset();

      expect(spy).not.toHaveBeenCalled();
      $rootScope.$digest();
      expect(spy).not.toHaveBeenCalled();
      name = 'misko';
      $rootScope.$digest();
      expect(spy).toHaveBeenCalledWith('misko', undefined, $rootScope);
    });

    it('should watch and fire on function return change', function() {
      var name,
          count = 0;
      $rootScope.$watch(function() {
        return name;
      }, function(newVal, oldVal) {
        count++;
      });
      $rootScope.$digest();

      expect(count).toEqual(1);
      $rootScope.$digest();
      expect(count).toEqual(1);
      name = 'misko';
      $rootScope.$digest();
      expect(count).toEqual(2);
    });
  });

  describe('$apply', function() {
    it('should apply expression', function() {
      $rootScope.$apply(function() {
        $rootScope.a = 1;
      });
      expect($rootScope.a).toEqual(1);
    });
  });
});

});