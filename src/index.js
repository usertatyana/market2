import './index.html';
import './card.html';
import './cart.html';
import './index.scss';


import Swiper, {Thumbs, Scrollbar} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {startPagination} from "./modules/pagination";
import {getGoods} from "./modules/goodsService";
import {renderGoods} from "./modules/renderGoods";

try {
  const paginationWrapper = document.querySelector('.pagination');
  const goodsList = document.querySelector('.goods__list')

  const pageURL = new URL(location);
  const page = +pageURL.searchParams.get('page') || 1;

  goodsList.innerHTML = `
 <div class="goods__preload">
<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M184.667 6.6665V57.5236M311.81 57.5236L273.667 95.6665M57.5241 57.5236L95.667 95.6665M184.667 362.667V311.809M311.81 311.809L273.667 273.667M57.5241 311.809L95.667 273.667M6.66699 184.667H57.5241M311.81 184.667H362.667" stroke="#FFC700" stroke-width="12.1905" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
  `;
  getGoods({page}).then(({goods, pages, page}) => {
    renderGoods(goodsList, goods);
    startPagination(paginationWrapper, pages, page);
  })


} catch (e) {
  console.warn(e);
  console.warn('Это не главная страница');
}

const thumbSwiper = new Swiper('.card__slider-thumb', {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar]
});

new Swiper('.card__image', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: 'card__thumb-btn_active',
  },
  modules: [Thumbs]
});

new Swiper('.recommended__carousel', {
  spaceBetween: 30,
  slidesPerView: 4,
});
