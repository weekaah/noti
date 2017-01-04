document.getElementById('show-default').onclick = function () {
  noti({
    content: 'This is a default notification box. It should say whatever.',
    position : 'top-left'
  });
};
document.getElementById('show-success').onclick = function () {
  noti({
    content: 'This is a success notification box. It should say something awesome.',
    position : 'top-left',
    type: 'success'
  });
};
document.getElementById('show-warning').onclick = function () {
  noti({
    content: 'This is a warning notification box. It should say something important.',
    position : 'top-left',
    type: 'warning'
  });
};
document.getElementById('show-error').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'top-left',
    type: 'error'
  });
};


document.getElementById('show-tl').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'top-left'
  });
};
document.getElementById('show-tc').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'top-center'
  });
};
document.getElementById('show-tr').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'top-right'
  });
};
document.getElementById('show-bl').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'bottom-left'
  });
};
document.getElementById('show-bc').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'bottom-center'
  });
};;
document.getElementById('show-br').onclick = function () {
  noti({
    content: 'This is a error notification box. It should say something scary.',
    position : 'bottom-right'
  });
};


// Theme switching
// ------------------------------------
(function () {

  var switchTheme = document.getElementById('switch-theme');
  switchTheme.onclick = function () {

    var theme = this.querySelectorAll('span')[0];

    theme.innerHTML = (theme.innerHTML === 'dark') ? 'light' : 'dark';

    toggleClass(
      document.body,
      'dark',
      'light'
    );

    toggleImgSrc(
      document.getElementsByClassName('logo')[0],
      'img/notilogolight.svg',
      'img/notilogodark.svg'
    );

    changeStlySheets();
  };


  function toggleClass (element, oldClass, newClass) {

    if (element.classList[0] === oldClass) {
      element.className = element.className.replace(oldClass, newClass);
    } else {
      element.className = element.className.replace(newClass, oldClass);
    }

  }

  function toggleImgSrc (element, oldSrc, newSrc) {
    var source = element.getAttribute('src');

    if (source === oldSrc) {
      element.setAttribute('src', newSrc);
    } else {
      element.setAttribute('src', oldSrc);
    }
  }

  function changeStlySheets () {

    var el = document.querySelectorAll('link')[4];

    if (el.getAttribute('href') === 'noti/noti-light.min.css') {
      el.setAttribute('href', 'noti/noti-dark.min.css');
    } else {
      el.setAttribute('href', 'noti/noti-light.min.css');
    }

  };

})();
