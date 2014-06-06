var expect   = require("expect.js"),
    confrodo = require('../');

describe("Test nested merging", function () {
    
  it('Should merge in an cascading way', function() {
    var item1 = {
      name: 'Frodo',
      details: {
        likes: ['shire', 'fireworks'],
        contactInfo: {
          with: "Sam",
          address: 'Middle Earth'
        }
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

    var mergeResult = confrodo(item1, item2);

    expect(mergeResult.name).to.equal('Frodo');
    expect(mergeResult.details.likes).to.have.length(1);
    expect(mergeResult.details.likes[0]).to.equal('going home');
    expect(mergeResult.details.contactInfo.with).to.equal('Gandalf');
    expect(mergeResult.details.contactInfo.address).to.equal('Middle Earth');

  });
  
});