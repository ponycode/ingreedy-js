'use strict';

var ingreedyMatchers = {
  toBeParsedAs: function(util, customEqualityTesters) {
    return {
      compare: function(inputString, expected) {
        var parserResult;
        var specResult = {};

        try {
          parserResult = Ingreedy.parse(inputString);
        } catch(err) {
          specResult.pass = false;
        }

        if(specResult.pass !== false) {
          specResult.pass = util.equals(parserResult, expected);
        }

        if(specResult.pass) {
          specResult.message = 'Ingreedy successfully parsed "' + inputString + '"';
        } else {
          specResult.message = 'Ingreedy parsed \n' + JSON.stringify(parserResult) + '\ninstead of \n' + JSON.stringify(expected);
        }

        return specResult;
      }
    }
  }
};

describe("Ingreedy", function() {
  var parser = Ingreedy;

  beforeEach(function() {
    jasmine.addMatchers(ingreedyMatchers);
  });

  describe('simple ingredient additions', function() {
    it('parses the correct values', function() {
      expect('1 lb potatoes').toBeParsedAs({
        amount: 1,
        unit: 'lb',
        ingredient: 'potatoes'
      });
    });
  });

  describe('ingredient additions with a container', function() {
    it('parses the correct values', function() {
      expect('2 28 oz can tomatoes').toBeParsedAs({
        amount: 2,
        ingredient: 'can tomatoes',
        container: {
          amount: 28,
          unit: 'oz'
        }
      });
    });
  });

  describe('ingredient additions with am extra detail (comma)', function() {
    it('parses the correct values', function() {
      expect('1 cup butter, softened').toBeParsedAs({
        amount: 1,
        ingredient: 'butter, softened',
        unit: 'cup'
      });
    });
  });

  describe('ingredient additions with multiple words', function() {
    it('parses the correct values', function() {
      expect('3/4 cup packed brown sugar').toBeParsedAs({
        amount: 0.75,
        ingredient: 'packed brown sugar',
        unit: 'cup'
      });
    });
  });

  describe('ingredient additions with container details in parenthesis', function() {
    it('parses the correct values', function() {
      expect('1 (3.5 ounce) package instant vanilla pudding mix').toBeParsedAs({
        amount: 1,
        ingredient: 'package instant vanilla pudding mix',
        container: {
          amount: 3.5,
          unit: 'ounce'
        }
      });
    });
  });

  describe('ingredient additions with container details in brackets', function() {
    it('parses the correct values', function() {
      expect('1 [3.5 ounce] package instant vanilla pudding mix').toBeParsedAs({
        amount: 1,
        ingredient: 'package instant vanilla pudding mix',
        container: {
          amount: 3.5,
          unit: 'ounce'
        }
      });
    });
  });
  
  describe('ingredient additions with container details in curly brackets', function() {
    it('parses the correct values', function() {
      expect('1 { 3.5 ounce } package instant vanilla pudding mix').toBeParsedAs({
        amount: 1,
        ingredient: 'package instant vanilla pudding mix',
        container: {
          amount: 3.5,
          unit: 'ounce'
        }
      });
    });
  });

  describe('ingredient additions with hyphens', function() {
    it('parses the correct values', function() {
      expect('2 1/4 cups all-purpose flour').toBeParsedAs({
        amount: 2.25,
        ingredient: 'all-purpose flour',
        unit: 'cups'
      });
    });
  });

});
