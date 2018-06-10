const localDoc = (document._currentScript || document.currentScript).ownerDocument;

class Accordion extends HTMLElement{
  constructor(){
    super();
		const accordionTemplate = localDoc.querySelector('#accordion-template');
		ShadyCSS.prepareTemplate(accordionTemplate, 'accordion-element');
    this.shadow = this.attachShadow({mode: 'open'});
    let template = localDoc.querySelector('#accordion-template');
    this.shadow.appendChild(template.content.cloneNode(true));
    Accordion.self = this;
    this.loadContent();
  }

  static set self(value) {
    Accordion.selfVar = value;
  }

  static get self() {
    if(Accordion.selfVar) {
      return Accordion.selfVar;
    }

    return this;
  }

  toggleSection(ev) {
    Accordion.self.shadow.querySelectorAll('dt').forEach(el => {
      if(this !== el){
        el.nextElementSibling.style.maxHeight = null;
        Accordion.self.goDown(el);
      }
    });

    let element = this.nextElementSibling;
    element.style.maxHeight = element.scrollHeight + 'px';
    Accordion.self.goUp(this);
  }

  goDown(el) {
    el.firstChild.classList.remove('up');
    el.firstChild.classList.add('down');
  }

  goUp(el) {
    el.firstChild.classList.remove('down');
    el.firstChild.classList.add('up');
  }

  loadContent() {
    let url = 'https://api.publicapis.org/entries?category=animal';
    fetch(url)
      .then(e => e.json())
      .then(data => this.buildAccordion(data.entries))
      .catch(err => console.log(err));
  }

  buildAccordion(data) {
    document.querySelector('.loading').classList.add('hide');
    data.forEach(e => {
      this.buildHeader(e);
      this.buildContent(e);
    });
    Accordion.self.shadow.querySelectorAll('dt').forEach(e => e.onclick = this.toggleSection);
  }

  buildHeader(e) {
    let icon = document.createElement('I');
    icon.classList.add('arrow');
    icon.classList.add('down');
    Accordion.self.shadow.querySelector('dl').appendChild(icon);

    let dt = document.createElement('DT');
    dt.appendChild(icon);

    let title = document.createTextNode(e.API);
    dt.appendChild(title);

    Accordion.self.shadow.querySelector('dl').appendChild(dt);
  }

  buildContent(e) {
    let dd = document.createElement('DD');
    this.buildParagraph(e, dd);
  }

  buildParagraph(e, dd) {
    let paragraph = document.createElement('P');
    paragraph.innerHTML = e.Description;
    dd.appendChild(paragraph);
    paragraph = document.createElement('P');
    paragraph.innerHTML = e.Link;
    dd.appendChild(paragraph);
    Accordion.self.shadow.querySelector('dl').appendChild(dd);
  }

  _animate(element, close = true) {
    window.setTimeout(function() {
    }, 350);
  }
}

customElements.define('accordion-element', Accordion);
