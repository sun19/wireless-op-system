
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    };
  if (!doc.addEventListener) return;
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

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// (function (doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//       var clientWidth = docEl.clientWidth;
//       if(!clientWidth) return;
//       docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
//     };
//   if(!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
//   const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
//   const persist = persistStore(store, null);
//   return { ...store, persist };
// };

// export const dva = {
//   config: {
//     onError(err: ErrorEvent) {
//       err.preventDefault();
//     },
//     extraEnhancers: [persistEnhancer()],
//     onReducer: reducer => persistReducer(persistConfig, reducer),
//   },
// };
