var e=require("react"),t=e.createContext(void 0),r=e.createContext(void 0);exports.Provider=function(n){var u=n.store,o=e.useState(u.getState()),c=o[0],i=o[1];return e.useEffect(function(){return u.subscribe(function(e){c!==e&&i(e)})},[u]),e.createElement(r.Provider,{value:u.dispatch},e.createElement(t.Provider,{value:c},n.children))},exports.useSelect=function(){return e.useContext(t)},exports.useDispatch=function(){return e.useContext(r)};
//# sourceMappingURL=index.js.map