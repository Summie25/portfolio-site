document.addEventListener('DOMContentLoaded', function () {
  // DOM要素を取得
  const button = document.getElementById('js-button-drawer');
  const drawer = document.getElementById('js-drawer');
  const body = document.body;

  // ボタンがクリックされたときのイベントリスナーを設定
  button.addEventListener('click', function () {
    // クラスのトグル
    this.classList.toggle('is-checked');
    body.classList.toggle('is-fixed');

    // ドロワーの表示・非表示を切り替える
    // slideToggleの簡易的な代替実装
    if (drawer.style.display === 'none') {
      drawer.style.display = 'block';
    } else {
      drawer.style.display = 'none';
    }
  });
});
// document.addEventListener('DOMContentLoaded', function () {
//   // DOM要素を取得
//   const button = document.getElementById('js-button-drawer');
//   const drawer = document.getElementById('js-drawer');
//   const body = document.body;

//   // ボタンがクリックされた時の処理
//   button.addEventListener('click', function () {
//     // ボタン、ドロワー、bodyにそれぞれクラスをトグルする
//     button.classList.toggle('is-checked');
//     drawer.classList.toggle('is-checked'); // ← 修正点
//     body.classList.toggle('is-fixed');
//   });
// });

// FVのアニメーション
let TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute('data-rotate');
    let period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  let css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
  document.body.appendChild(css);
};
