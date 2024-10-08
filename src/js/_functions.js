// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
// import { mobileCheck } from "./functions/mobile-check";

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

const popupLinks = document.querySelectorAll(".recall-btn");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock__padding");

let unlock = true;

const timeout = 200;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("data-popupId");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close__popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {

    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector("body").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = "0px";
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      let node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();


// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);
const swiperHero = new Swiper('.hero_swiper', {
  spaceBetween: 20,
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-next-btn",
    prevEl: ".hero-prev-btn",
  },
});

const swiperPopularProduct = new Swiper('.popular-product__swiper', {
  slidesPerView: 1.15,
  spaceBetween: 30,
  navigation: {
    nextEl: ".popular-product__swiper-btn-next",
    prevEl: ".popular-product__swiper-btn-prev",
  },
  on: {
    init: function() {
      adjustSlideHeight();
    },
    resize: function() {
      adjustSlideHeight();
    }
  },
  breakpoints:{
    979:{
      slidesPerView: 4,
    },
    769:{
      slidesPerView: 3.5,
    },
    481:{
      slidesPerView: 2.15,
    }
  }
});

function adjustSlideHeight() {
  const swiper = document.querySelector('.popular-product__swiper')
  const slides = swiper.querySelectorAll('.swiper-slide');
  const wrapperHeight = swiper.querySelector('.swiper-wrapper').clientHeight;

  slides.forEach((slide) => {
    slide.style.height = `${wrapperHeight}px`;
  });
}


import { disableScroll } from './functions/disable-scroll';
import { enableScroll } from './functions/enable-scroll';
import _vars from './_vars';

const burger = document?.querySelector('[data-burger]');
const menu = document?.querySelector('[data-menu]');
const overlay = document?.querySelector('[data-menu-overlay]');

burger?.addEventListener('click', (e) => {
  burger?.classList.toggle('burger--active');
  menu?.classList.toggle('menu--active');

  if (menu?.classList.contains('menu--active')) {
    disableScroll();
  } else {
    enableScroll();
  }
});

overlay?.addEventListener('click', () => {
  burger.classList.remove('burger--active');
  menu.classList.remove('menu--active');
  enableScroll();
});


const catalogLink = document.querySelector('.drop-down');
const catalogMenu = document.querySelector('.catalog-menu');

catalogLink.addEventListener('click', (e) => {
  if (e.target.closest('.close-catalog-menu')) {
    catalogMenu.classList.remove('catalog-menu__active');

  } else {
    catalogMenu.classList.add('catalog-menu__active');
  }
});




// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// import { validateForms } from './functions/validate-forms';
// const rules1 = [...];

// const afterForm = () => {
//   console.log('Произошла отправка, тут можно писать любые действия');
// };

// validateForms('.form-1', rules1, afterForm);
