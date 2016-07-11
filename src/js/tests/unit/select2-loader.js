$(function () {
  'use strict';

  var validateBaseArgs = function (value) {
    if (Object.prototype.toString.call(value.escapeMarkup) == '[object Function]'
      && Object.prototype.toString.call(value.formatResult) == '[object Function]'
      && Object.prototype.toString.call(value.formatSelection) == '[object Function]'
    ) {
      return true;
    }

    return false;
  };

  QUnit.module('select2-loader', {
    setup: function () {
      jQuery.fn.select2 = function () {};
    },

    teardown: function () {
      delete jQuery.fn.select2;
    },
  });

  // Only Data API tests are needed as the rest of the functionality is provided by the select2
  // component itself

  // Data-api tests
  // ======================
  QUnit.test(
    'should call the select2() method on the on page load with json attribute and image',
    function () {
      var $select = $(
        '<select data-onload-select2=\'{"option": "optionValue"}\'>' +
        '<option data-select2-image="/image.jpg">opt 1</option>' +
        '</select>'
      );

      $('#qunit-fixture').append($select);
      sinon.spy(jQuery.fn, 'select2');
      $(window).trigger('load');

      QUnit.ok(jQuery.fn.select2.calledOnce, 'Should init the select2 component');
      QUnit.ok(jQuery.fn.select2 .calledWithMatch(function (value) {
        return value.option === 'optionValue' && validateBaseArgs(value)
      }));
    }
  );

  QUnit.test(
    'should call the select2 method on on page load with no attributes',
    function () {
      var $select = $('<select data-onload-select2>Some text</select>');

      $('#qunit-fixture').append($select);
      sinon.spy(jQuery.fn, 'select2');
      $(window).trigger('load');

      QUnit.ok(jQuery.fn.select2.calledOnce, 'Should init the select2 component');
      QUnit.ok(jQuery.fn.select2 .calledWithMatch(function (value) {
        return validateBaseArgs(value);
      }));
    }
  );
});
