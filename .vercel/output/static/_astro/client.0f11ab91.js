import{_ as ce}from"./preload-helper.cf010ec4.js";var O,h,Y,ae,P,G,Z,$,T={},ee=[],fe=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,B=Array.isArray;function x(e,t){for(var _ in t)e[_]=t[_];return e}function te(e){var t=e.parentNode;t&&t.removeChild(e)}function N(e,t,_){var r,l,o,s={};for(o in t)o=="key"?r=t[o]:o=="ref"?l=t[o]:s[o]=t[o];if(arguments.length>2&&(s.children=arguments.length>3?O.call(arguments,2):_),typeof e=="function"&&e.defaultProps!=null)for(o in e.defaultProps)s[o]===void 0&&(s[o]=e.defaultProps[o]);return U(e,s,r,l,null)}function U(e,t,_,r,l){var o={type:e,props:t,key:_,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:l??++Y};return l==null&&h.vnode!=null&&h.vnode(o),o}function W(e){return e.children}function H(e,t){this.props=e,this.context=t}function L(e,t){if(t==null)return e.__?L(e.__,e.__.__k.indexOf(e)+1):null;for(var _;t<e.__k.length;t++)if((_=e.__k[t])!=null&&_.__e!=null)return _.__e;return typeof e.type=="function"?L(e):null}function _e(e){var t,_;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((_=e.__k[t])!=null&&_.__e!=null){e.__e=e.__c.base=_.__e;break}return _e(e)}}function q(e){(!e.__d&&(e.__d=!0)&&P.push(e)&&!I.__r++||G!==h.debounceRendering)&&((G=h.debounceRendering)||Z)(I)}function I(){var e,t,_,r,l,o,s,u,c;for(P.sort($);e=P.shift();)e.__d&&(t=P.length,r=void 0,l=void 0,o=void 0,u=(s=(_=e).__v).__e,(c=_.__P)&&(r=[],l=[],(o=x({},s)).__v=s.__v+1,V(c,s,o,_.__n,c.ownerSVGElement!==void 0,s.__h!=null?[u]:null,r,u??L(s),s.__h,l),le(r,s,l),s.__e!=u&&_e(s)),P.length>t&&P.sort($));I.__r=0}function ne(e,t,_,r,l,o,s,u,c,m,p){var n,y,a,i,f,C,d,v,S,b=0,g=r&&r.__k||ee,D=g.length,w=D,E=t.length;for(_.__k=[],n=0;n<E;n++)(i=_.__k[n]=(i=t[n])==null||typeof i=="boolean"||typeof i=="function"?null:typeof i=="string"||typeof i=="number"||typeof i=="bigint"?U(null,i,null,null,i):B(i)?U(W,{children:i},null,null,null):i.__b>0?U(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)!=null?(i.__=_,i.__b=_.__b+1,(v=ue(i,g,d=n+b,w))===-1?a=T:(a=g[v]||T,g[v]=void 0,w--),V(e,i,a,l,o,s,u,c,m,p),f=i.__e,(y=i.ref)&&a.ref!=y&&(a.ref&&z(a.ref,null,i),p.push(y,i.__c||f,i)),f!=null&&(C==null&&(C=f),(S=a===T||a.__v===null)?v==-1&&b--:v!==d&&(v===d+1?b++:v>d?w>E-d?b+=v-d:b--:b=v<d&&v==d-1?v-d:0),d=n+b,typeof i.type!="function"||v===d&&a.__k!==i.__k?typeof i.type=="function"||v===d&&!S?i.__d!==void 0?(c=i.__d,i.__d=void 0):c=f.nextSibling:c=re(e,f,c):c=oe(i,c,e),typeof _.type=="function"&&(_.__d=c))):(a=g[n])&&a.key==null&&a.__e&&(a.__e==c&&(c=L(a)),F(a,a,!1),g[n]=null);for(_.__e=C,n=D;n--;)g[n]!=null&&(typeof _.type=="function"&&g[n].__e!=null&&g[n].__e==_.__d&&(_.__d=g[n].__e.nextSibling),F(g[n],g[n]))}function oe(e,t,_){for(var r,l=e.__k,o=0;l&&o<l.length;o++)(r=l[o])&&(r.__=e,t=typeof r.type=="function"?oe(r,t,_):re(_,r.__e,t));return t}function re(e,t,_){return _==null||_.parentNode!==e?e.insertBefore(t,null):t==_&&t.parentNode!=null||e.insertBefore(t,_),t.nextSibling}function ue(e,t,_,r){var l=e.key,o=e.type,s=_-1,u=_+1,c=t[_];if(c===null||c&&l==c.key&&o===c.type)return _;if(r>(c!=null?1:0))for(;s>=0||u<t.length;){if(s>=0){if((c=t[s])&&l==c.key&&o===c.type)return s;s--}if(u<t.length){if((c=t[u])&&l==c.key&&o===c.type)return u;u++}}return-1}function pe(e,t,_,r,l){var o;for(o in _)o==="children"||o==="key"||o in t||A(e,o,null,_[o],r);for(o in t)l&&typeof t[o]!="function"||o==="children"||o==="key"||o==="value"||o==="checked"||_[o]===t[o]||A(e,o,t[o],_[o],r)}function J(e,t,_){t[0]==="-"?e.setProperty(t,_??""):e[t]=_==null?"":typeof _!="number"||fe.test(t)?_:_+"px"}function A(e,t,_,r,l){var o;e:if(t==="style")if(typeof _=="string")e.style.cssText=_;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)_&&t in _||J(e.style,t,"");if(_)for(t in _)r&&_[t]===r[t]||J(e.style,t,_[t])}else if(t[0]==="o"&&t[1]==="n")o=t!==(t=t.replace(/(PointerCapture)$|Capture$/,"$1")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=_,_?r||e.addEventListener(t,o?Q:K,o):e.removeEventListener(t,o?Q:K,o);else if(t!=="dangerouslySetInnerHTML"){if(l)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!=="width"&&t!=="height"&&t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t!=="rowSpan"&&t!=="colSpan"&&t in e)try{e[t]=_??"";break e}catch{}typeof _=="function"||(_==null||_===!1&&t[4]!=="-"?e.removeAttribute(t):e.setAttribute(t,_))}}function K(e){return this.l[e.type+!1](h.event?h.event(e):e)}function Q(e){return this.l[e.type+!0](h.event?h.event(e):e)}function V(e,t,_,r,l,o,s,u,c,m){var p,n,y,a,i,f,C,d,v,S,b,g,D,w,E,k=t.type;if(t.constructor!==void 0)return null;_.__h!=null&&(c=_.__h,u=t.__e=_.__e,t.__h=null,o=[u]),(p=h.__b)&&p(t);e:if(typeof k=="function")try{if(d=t.props,v=(p=k.contextType)&&r[p.__c],S=p?v?v.props.value:p.__:r,_.__c?C=(n=t.__c=_.__c).__=n.__E:("prototype"in k&&k.prototype.render?t.__c=n=new k(d,S):(t.__c=n=new H(d,S),n.constructor=k,n.render=he),v&&v.sub(n),n.props=d,n.state||(n.state={}),n.context=S,n.__n=r,y=n.__d=!0,n.__h=[],n._sb=[]),n.__s==null&&(n.__s=n.state),k.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=x({},n.__s)),x(n.__s,k.getDerivedStateFromProps(d,n.__s))),a=n.props,i=n.state,n.__v=t,y)k.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(k.getDerivedStateFromProps==null&&d!==a&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(d,S),!n.__e&&(n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(d,n.__s,S)===!1||t.__v===_.__v)){for(t.__v!==_.__v&&(n.props=d,n.state=n.__s,n.__d=!1),t.__e=_.__e,t.__k=_.__k,t.__k.forEach(function(M){M&&(M.__=t)}),b=0;b<n._sb.length;b++)n.__h.push(n._sb[b]);n._sb=[],n.__h.length&&s.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(d,n.__s,S),n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(a,i,f)})}if(n.context=S,n.props=d,n.__P=e,n.__e=!1,g=h.__r,D=0,"prototype"in k&&k.prototype.render){for(n.state=n.__s,n.__d=!1,g&&g(t),p=n.render(n.props,n.state,n.context),w=0;w<n._sb.length;w++)n.__h.push(n._sb[w]);n._sb=[]}else do n.__d=!1,g&&g(t),p=n.render(n.props,n.state,n.context),n.state=n.__s;while(n.__d&&++D<25);n.state=n.__s,n.getChildContext!=null&&(r=x(x({},r),n.getChildContext())),y||n.getSnapshotBeforeUpdate==null||(f=n.getSnapshotBeforeUpdate(a,i)),ne(e,B(E=p!=null&&p.type===W&&p.key==null?p.props.children:p)?E:[E],t,_,r,l,o,s,u,c,m),n.base=t.__e,t.__h=null,n.__h.length&&s.push(n),C&&(n.__E=n.__=null)}catch(M){t.__v=null,(c||o!=null)&&(t.__e=u,t.__h=!!c,o[o.indexOf(u)]=null),h.__e(M,t,_)}else o==null&&t.__v===_.__v?(t.__k=_.__k,t.__e=_.__e):t.__e=de(_.__e,t,_,r,l,o,s,c,m);(p=h.diffed)&&p(t)}function le(e,t,_){for(var r=0;r<_.length;r++)z(_[r],_[++r],_[++r]);h.__c&&h.__c(t,e),e.some(function(l){try{e=l.__h,l.__h=[],e.some(function(o){o.call(l)})}catch(o){h.__e(o,l.__v)}})}function de(e,t,_,r,l,o,s,u,c){var m,p,n,y=_.props,a=t.props,i=t.type,f=0;if(i==="svg"&&(l=!0),o!=null){for(;f<o.length;f++)if((m=o[f])&&"setAttribute"in m==!!i&&(i?m.localName===i:m.nodeType===3)){e=m,o[f]=null;break}}if(e==null){if(i===null)return document.createTextNode(a);e=l?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i,a.is&&a),o=null,u=!1}if(i===null)y===a||u&&e.data===a||(e.data=a);else{if(o=o&&O.call(e.childNodes),p=(y=_.props||T).dangerouslySetInnerHTML,n=a.dangerouslySetInnerHTML,!u){if(o!=null)for(y={},f=0;f<e.attributes.length;f++)y[e.attributes[f].name]=e.attributes[f].value;(n||p)&&(n&&(p&&n.__html==p.__html||n.__html===e.innerHTML)||(e.innerHTML=n&&n.__html||""))}if(pe(e,a,y,l,u),n)t.__k=[];else if(ne(e,B(f=t.props.children)?f:[f],t,_,r,l&&i!=="foreignObject",o,s,o?o[0]:_.__k&&L(_,0),u,c),o!=null)for(f=o.length;f--;)o[f]!=null&&te(o[f]);u||("value"in a&&(f=a.value)!==void 0&&(f!==e.value||i==="progress"&&!f||i==="option"&&f!==y.value)&&A(e,"value",f,y.value,!1),"checked"in a&&(f=a.checked)!==void 0&&f!==e.checked&&A(e,"checked",f,y.checked,!1))}return e}function z(e,t,_){try{typeof e=="function"?e(t):e.current=t}catch(r){h.__e(r,_)}}function F(e,t,_){var r,l;if(h.unmount&&h.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||z(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){h.__e(o,t)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(l=0;l<r.length;l++)r[l]&&F(r[l],t,_||typeof e.type!="function");_||e.__e==null||te(e.__e),e.__=e.__e=e.__d=void 0}function he(e,t,_){return this.constructor(e,_)}function j(e,t,_){var r,l,o,s;h.__&&h.__(e,t),l=(r=typeof _=="function")?null:_&&_.__k||t.__k,o=[],s=[],V(t,e=(!r&&_||t).__k=N(W,null,[e]),l||T,T,t.ownerSVGElement!==void 0,!r&&_?[_]:l?null:t.firstChild?O.call(t.childNodes):null,o,!r&&_?_:l?l.__e:t.firstChild,r,s),le(o,e,s)}function ie(e,t){j(e,t,ie)}O=ee.slice,h={__e:function(e,t,_,r){for(var l,o,s;t=t.__;)if((l=t.__c)&&!l.__)try{if((o=l.constructor)&&o.getDerivedStateFromError!=null&&(l.setState(o.getDerivedStateFromError(e)),s=l.__d),l.componentDidCatch!=null&&(l.componentDidCatch(e,r||{}),s=l.__d),s)return l.__E=l}catch(u){e=u}throw e}},Y=0,ae=function(e){return e!=null&&e.constructor===void 0},H.prototype.setState=function(e,t){var _;_=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=x({},this.state),typeof e=="function"&&(e=e(x({},_),this.props)),e&&x(_,e),e!=null&&this.__v&&(t&&this._sb.push(t),q(this))},H.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),q(this))},H.prototype.render=W,P=[],Z=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,$=function(e,t){return e.__v.__b-t.__v.__b},I.__r=0;const se=({value:e,name:t,hydrate:_=!0})=>e?N(_?"astro-slot":"astro-static-slot",{name:t,dangerouslySetInnerHTML:{__html:e}}):null;se.shouldComponentUpdate=()=>!1;var X=se;const R=new Map;var ye=e=>async(t,_,{default:r,...l},{client:o})=>{if(!e.hasAttribute("ssr"))return;for(const[c,m]of Object.entries(l))_[c]=N(X,{value:m,name:c});if(e.dataset.preactSignals){const{signal:c}=await ce(()=>import("./signals.module.07aa21be.js"),["_astro/signals.module.07aa21be.js","_astro/preload-helper.cf010ec4.js"]);let m=JSON.parse(e.dataset.preactSignals);for(const[p,n]of Object.entries(m)){if(!R.has(n)){const y=c(_[p]);R.set(n,y)}_[p]=R.get(n)}}(o!=="only"?ie:j)(N(t,_,r!=null?N(X,{value:r}):r),e),e.addEventListener("astro:unmount",()=>j(null,e),{once:!0})};export{H as b,ye as c,h as l,ae as t};