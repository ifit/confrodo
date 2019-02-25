var expect   = require("expect.js"),
    _        = require('lodash'),
    confrodo = require('../');

describe("Test nested merging", function () {
  var item1 = {
    name: 'Frodo',
    details: {
      likes: ['shire', 'fireworks'],
      contactInfo: {
        with: "Sam",
        address: 'Middle Earth'
      },
      ringSize: 8
    }
  }

  var item2 = {
    name: 'Frodo',
    details: {
      likes: ['going home'],
      contactInfo: {
        with: "Gandalf"
      }
    }
  }

  it('Should merge by replacing conflicts at the top level (Default behavior)', function() {
    var mergeResult = confrodo(item1, item2);
    expect(mergeResult.name).to.equal('Frodo');
    expect(mergeResult.details.likes).to.have.length(1);
    expect(mergeResult.details.likes[0]).to.equal('going home');
    expect(mergeResult.details.contactInfo.with).to.equal('Gandalf');
    expect(mergeResult.details.contactInfo.address).to.be(undefined);
    expect(mergeResult.details.ringSize).to.be(undefined);
  });

  it('Should merge using a custom merge strategy - replace at the leaves', function() {
    var mergeStrategy = function(configA, configB) {
      return _.mergeWith(configA, configB, function(a, b) {
        return _.isArray(a) ? b : undefined;
      });
    }

    var mergeResult = confrodo(item1, item2, mergeStrategy);

    expect(mergeResult.name).to.equal('Frodo');
    expect(mergeResult.details.likes).to.have.length(1);
    expect(mergeResult.details.likes[0]).to.equal('going home');
    expect(mergeResult.details.contactInfo.with).to.equal('Gandalf');
    expect(mergeResult.details.contactInfo.address).to.equal('Middle Earth');
    expect(mergeResult.details.ringSize).to.equal(8);

  });
});