(function() {
  'use strict';
  
  var Notifier = function(options) {
    this.defaults = {
      type: 'default',
      content: 'You haven\'t defined \t the content',
      position: 'top-right',
      autoOpen: true,
      autoOpenDelay: 10,
      autoClose: false,
      autoCloseDelay: 1500
    };

    if (options && typeof options === 'object') {
      this.options = extendDefaults(this.defaults, options);
    }

    if (this.options.autoOpen) {
      setTimeout(function() {
        this.open();
      }.bind(this), this.options.autoOpenDelay);
    }

    if (this.options.autoClose) {
      this.autoClose = setTimeout(function() {
        this.close();
      }.bind(this), this.options.autoCloseDelay);
    }
  }; 

  Notifier.prototype.open = function() {
    var self = this;

    if (!checkForFont()) addCustomFont();

    buildNoti.call(this);

    initialiteEvents.call(this);

    addClass(this.notiItem, ' open');

    if (this.notiContainer.children.length === 2) {
      addRemoveAllBtn.call(this);

      addClass(this.clearBtn, ' open');

      this.clearBtn.onclick = function() {
        clearTimeout(self.autoClose);
        
        removeAll(this);
      };
    }
  };

  Notifier.prototype.close = function() {
    this.notiItem.className = this.notiItem.className.replace(' open', '');

    addEventPrefix(this.notiItem, 'animationend', function() {
      this.notiItem.parentNode.removeChild(this.notiItem);

      if (this.notiContainer.children.length < 2) {
        this.notiContainer.parentNode.removeChild(this.notiContainer);
      }
    }.bind(this));
  };

  function buildNoti() {    
    var frag;

    if (checkForContainer.call(this)) {
      this.notiContainer = document.getElementsByClassName('noti' + '--' + this.options.position)[0];
    } else {
      frag = document.createDocumentFragment();
      this.notiContainer = document.createElement('div');
      this.notiContainer.className = 'noti';
      addClass(this.notiContainer, this.notiContainer.className + '--' + this.options.position);
      frag.appendChild(this.notiContainer);
    }

    this.notiItem = document.createElement('div');
    this.notiItem.className = 'noti-item';
    addClass(this.notiItem, this.notiItem.className + '--' + this.options.type);
    this.notiContainer.insertBefore(this.notiItem, this.notiContainer.firstChild);

    this.notiObject = document.createElement('div');
    this.notiObject.className = 'noti__object';
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

    if (!checkForContainer.call(this)) {
      document.body.appendChild(frag);
    }
  }

  function addRemoveAllBtn() {
    var frag = document.createDocumentFragment();

    this.clearBtn = document.createElement('div');
    this.clearBtn.className = 'noti__clear';

    frag.appendChild(this.clearBtn);

    this.notiContainer.appendChild(frag);
  }

  function removeAll(clearAllBtn) {
    var cnt = clearAllBtn.parentNode;

    cnt.firstChild.className = cnt.firstChild.className.replace(' open', '');

    addEventPrefix(cnt.firstChild, 'animationend', function() {
      cnt.removeChild(cnt.firstChild);
      
      if (cnt.children.length > 0) {
        removeAll(clearAllBtn);
      } else {
        cnt.parentNode.removeChild(cnt);
      }
    });
  }

  function checkForContainer() {    
    return document.getElementsByClassName('noti' + '--' + this.options.position).length > 0;
  }

  function checkForFont() {
    var el = document.getElementsByTagName('link'),
        check = /^https:\/\/fonts.googleapis.com\/css\?family=Roboto/;

    for (var i = 0; i < el.length; i++) {
      if (check.test(el[i].getAttribute('href')))
        return true;
    }
  }

  function addCustomFont() {
    var linkTag = document.createElement('link');

    linkTag.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto:100,300,500');
    linkTag.setAttribute('rel', 'stylesheet');
    document.head.appendChild(linkTag);
  }

  function addEventPrefix(element, type, callback) {
    var pfx = ["webkit", "moz", "MS", "o", ""];

    for (var i = 0; i < pfx.length; i++) {
      if (!pfx[i]) {
        type = type.toLowerCase();
      }
      element.addEventListener(pfx[i]+type, callback, false);
    }
  }

  function addClass(element, cssClass) {
    element.className += ' ' + cssClass;
  }

  function extendDefaults(defaults, options) {
    var property;

    for (property in options) {
      if (options.hasOwnProperty(property)) {
        defaults[property] = options[property];
      }
    }

    return defaults;
  }

  function initialiteEvents() {
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }

  window.noti = function(options) {
    return new Notifier(options);
  };
})();
