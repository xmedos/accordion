
describe('Accordion', function() {
  let Accordion;

  beforeEach(function() {
    Accordion = require('../components/accordion/Accordion');
  });

  describe('#toggleSection()', function() {
    it('should toggle section', function() {
      let accordion = new Accordion();
      accordion.toggleSection();
    });
  });

  describe('#loadContent()', function() {
    it('should load content', function() {
      let accordion = new Accordion();
      accordion.loadContent();
    });
  });
});
