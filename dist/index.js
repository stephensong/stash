"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var isPromise_1=isPromise;function isPromise(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}function createAction(e,t){return t.type=e,t}function createThunk(e,t){var r=createAction(e,t);return r.thunk=!0,r}function createStore(e){var t=[];return{dispatch:function r(n,o){if("function"!=typeof n)throw new Error("Expected action to be a function");if("string"!=typeof n.type)throw new Error("Expected action.type to be a string");if(n.thunk)n(e,o,r);else{var i=n(e,o);isPromise_1(i)||(e=i)}for(var c=t,u=0;u<c.length;u++)(0,c[u])(e,n)},subscribe:function(e){if("function"!=typeof e)throw new Error("A subscriber must be a function");return t.push(e),function(){var r=t.indexOf(e);r>=0&&t.splice(r,1)}},getState:function(){return e}}}exports.createAction=createAction,exports.createStore=createStore,exports.createThunk=createThunk;