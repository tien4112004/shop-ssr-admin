var i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ie(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function fe(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function o(){if(this instanceof o){var n=[null];n.push.apply(n,arguments);var f=Function.bind.apply(t,n);return new f}return t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(o){var n=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,n.get?n:{enumerable:!0,get:function(){return e[o]}})}),r}function p(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var g=p,j=typeof i=="object"&&i&&i.Object===Object&&i,m=j,O=m,v=typeof self=="object"&&self&&self.Object===Object&&self,T=O||v||Function("return this")(),S=T,_=/\s/;function $(e){for(var t=e.length;t--&&_.test(e.charAt(t)););return t}var h=$,w=h,P=/^\s+/;function I(e){return e&&e.slice(0,w(e)+1).replace(P,"")}var G=I,N=S,E=N.Symbol,u=E,s=u,y=Object.prototype,x=y.hasOwnProperty,A=y.toString,a=s?s.toStringTag:void 0;function B(e){var t=x.call(e,a),r=e[a];try{e[a]=void 0;var o=!0}catch{}var n=A.call(e);return o&&(t?e[a]=r:delete e[a]),n}var F=B,L=Object.prototype,M=L.toString;function R(e){return M.call(e)}var k=R,c=u,D=F,C=k,H="[object Null]",U="[object Undefined]",b=c?c.toStringTag:void 0;function W(e){return e==null?e===void 0?U:H:b&&b in Object(e)?D(e):C(e)}var q=W;function z(e){return e!=null&&typeof e=="object"}var J=z,K=q,Q=J,V="[object Symbol]";function X(e){return typeof e=="symbol"||Q(e)&&K(e)==V}var Y=X,Z=G,l=g,ee=Y,d=0/0,te=/^[-+]0x[0-9a-f]+$/i,re=/^0b[01]+$/i,ne=/^0o[0-7]+$/i,oe=parseInt;function ae(e){if(typeof e=="number")return e;if(ee(e))return d;if(l(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=l(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Z(e);var r=re.test(e);return r||ne.test(e)?oe(e.slice(2),r?2:8):te.test(e)?d:+e}var se=ae;export{S as _,fe as a,q as b,i as c,J as d,m as e,Y as f,ie as g,u as h,g as i,h as j,se as t};
