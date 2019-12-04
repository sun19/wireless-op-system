(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if(!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    };
  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};
