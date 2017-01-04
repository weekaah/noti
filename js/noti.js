(function() {

  'use strict';

  var Notifier = function () {

    var self = this;

    this.closeBtn;
    this.clearBtn;
    this.notiContainer;
    this.notiItem;
    this.notiBody;
    this.notiObject;
    this.notiIcon;
    this.autoClose;

    this.defaults = {
      type: 'default',
      content: '',
      position: 'top-right',
      autoOpen: true,
      autoOpenDelay: 10,
      autoClose: false,
      autoCloseDelay: 1500
    }

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = extendDefaults(this.defaults, arguments[0]);
    } else {
      this.options = this.defaults
    }

    if (this.options.autoOpen) {
      setTimeout(function () {
        self.open();
      }, this.options.autoOpenDelay);
    }

    if (this.options.autoClose) {
      this.autoClose = setTimeout(function () {
        self.close();
      }, self.options.autoCloseDelay);
    }
  }




  Notifier.prototype.open = function () {

    var self = this;

    if (!checkForFont()) {
      addCustomFont();
    }

    buildNoti.call(this);

    initialiteEvents.call(this);

    addClass(self.notiItem, ' open');

    if (self.notiContainer.children.length === 2) {

      addRemoveAllBtn.call(self);

      addClass(self.clearBtn, ' open');

      this.clearBtn.onclick = function () {
        clearTimeout(self.autoClose);
        removeAll(this, self);
      };

    }

  }

  Notifier.prototype.close = function () {

    var self = this;

    this.notiItem.className = this.notiItem.className.replace(' open', '');

    addEventPrefix(this.notiItem, 'animationend', function () {

      self.notiItem.parentNode.removeChild(self.notiItem);

      if ( self.notiContainer.children.length < 2) {
        self.notiContainer.parentNode.removeChild(self.notiContainer);
      }

    });

  }




  function buildNoti () {

    var frag;

    if ( checkForContainer(this) ) {

      this.notiContainer = document.getElementsByClassName('noti' + '--' + this.options.position)[0];

    } else {

      frag = document.createDocumentFragment();
      this.notiContainer = document.createElement('div');
      this.notiContainer.className = 'noti';
      addClass(this.notiContainer, this.notiContainer.className + '--' + this.options.position);
      frag.appendChild(this.notiContainer);

    }

    this.notiItem = document.createElement('div');
    this.notiItem.className = 'noti-item'
    addClass(this.notiItem, this.notiItem.className + '--' + this.options.type)
    this.notiContainer.insertBefore(this.notiItem, this.notiContainer.firstChild);

    this.notiObject = document.createElement('div');
    this.notiObject.className = 'noti__object'
    this.notiItem.appendChild(this.notiObject);

    this.notiIcon = document.createElement('div');
    this.notiIcon.className = 'noti__icon';
    this.notiObject.appendChild(this.notiIcon);

    this.notiBody = document.createElement('div');
    this.notiBody.innerHTML = this.options.content;
    this.notiBody.className = 'noti__body';
    this.notiItem.appendChild(this.notiBody);

    this.closeBtn = document.createElement('div');
    this.closeBtn.className = "noti__close";
    this.notiItem.appendChild(this.closeBtn);

    if ( !checkForContainer(this) ) {
      document.body.appendChild(frag);
    }

  }


  function addRemoveAllBtn () {

    var frag;

    frag = document.createDocumentFragment();

    this.clearBtn = document.createElement('div');
    this.clearBtn.className = 'noti__clear';

    frag.appendChild(this.clearBtn);

    this.notiContainer.appendChild(frag);

  }


  function removeAll (x, y) {

    var cnt = x.parentNode;

    cnt.firstChild.className = cnt.firstChild.className.replace(' open', '');

    addEventPrefix(cnt.firstChild, 'animationend', function () {
      cnt.removeChild(cnt.firstChild);
      if ( cnt.children.length > 0 ) {
        removeAll(x, y);
      } else {
        cnt.parentNode.removeChild(cnt);
      }
    });

  }


  function checkForContainer (x) {
    return document.getElementsByClassName('noti' + '--' + x.options.position).length > 0;
  }


  function checkForFont () {

    var el = document.getElementsByTagName('link'),
        check = /^https:\/\/fonts.googleapis.com\/css\?family=Roboto/;

    for ( var i = 0; i < el.length; i++) {
      if (check.test(el[i].getAttribute('href')))
        return true;
    }

  };


  function addEventPrefix (element, type, callback) {
    var pfx = ["webkit", "moz", "MS", "o", ""];

    for (var i = 0; i < pfx.length; i++) {
      if (!pfx[i]) {
        type = type.toLowerCase();
      }
      element.addEventListener(pfx[i]+type, callback, false);
    }
  }


  function addCustomFont () {

    var font = document.createElement('link');

    font.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto:100,300,500');
    font.setAttribute('rel', 'stylesheet');
    document.head.appendChild(font);

  }


  function addClass(x, y) {
    x.className = x.className + ' ' + y;
  }


  function extendDefaults (source, properties) {
    var property;

    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }

    return source;
  }


  function initialiteEvents () {
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }


  window.noti = function (x) {
    return new Notifier(x);
  };

})();
