// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-collection@v0.1.0-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.1.0-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@v0.1.1-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-keys@v0.1.0-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-normal-quantile@v0.1.1-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-chisquare-cdf@v0.1.0-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-group@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-ranks@v0.1.0-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-abs@v0.1.1-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-pow@v0.1.0-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-index-of@v0.1.0-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.1.1-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@v0.1.1-esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-array@v0.1.1-esm/index.mjs";import{isPrimitive as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@v0.1.1-esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@v0.1.1-esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.1.1-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.1.0-esm/index.mjs";import{isPrimitive as u}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@v0.1.1-esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@v0.1.0-esm/index.mjs";function w(s,t){return s-t}function x(s){var t,e,i,r=s.length;if(!r)return null;for(e=[],i=0;i<r;i++)e.push(s[i]);return e.sort(w),t=p(r/2),r%2?e[t]:(e[t-1]+e[t])/2}function y(s,e){return t(e)?v(e,"alpha")&&(s.alpha=e.alpha,!j(s.alpha)||c(s.alpha))?new TypeError(m("1H38P,GU","alpha",s.alpha)):v(e,"groups")&&(s.groups=e.groups,!f(s.groups))?new TypeError(m("1H38Z,GX","groups",s.groups)):null:new TypeError(m("1H32V,FD",e))}function E(s){var e,i,r;if(i=4,e=!0,arguments.length>0){if(!t(s))throw new TypeError(m("1H33L,Gc",s));if(v(s,"digits")){if(!g(s.digits))throw new TypeError(m("1H33P,Fv","digits",s.digits));i=s.digits}if(v(s,"decision")){if(!u(s.decision))throw new TypeError(m("1H32o,GE","decision",s.decision));e=s.decision}}return r="",r+=this.method,r+="\n\n",r+="Null hypothesis: The variances in all groups are the same.",r+="\n\n",r+="    pValue: "+b(this.pValue,-i)+"\n",r+="    statistic: "+b(this.statistic,-i)+"\n",r+="    df: "+b(this.df,-i),r+="\n\n",e&&(r+="Test Decision: ",this.rejected?r+="Reject null in favor of alternative at "+100*this.alpha+"% significance level":r+="Fail to reject null in favor of alternative at "+100*this.alpha+"% significance level",r+="\n"),r}function H(s,t){var e,i=new Array(t);for(e=0;e<t;e++)i[e]=s;return i}function T(){var p,f,j,c,v,g,u,b,w,T,G,V,F,A,P,k,q,D,R,X,Y,Z,K,L,N,U;if(T=[],V={},t(arguments[(j=arguments.length)-1])&&(f=arguments[j-1],j-=1,q=y(V,f)))throw q;if(V.groups){if(v=V.groups,u=o(arguments[0],v),(j=(c=i(u)).length)<2)throw new Error(m("1H38W,GY","groups",c));for(N=0;N<j;N++)T.push(u[c[N]])}else for(v=[],N=0;N<j;N++)T.push(arguments[N]),v=v.concat(H(N,arguments[N].length));if((b=void 0===V.alpha?.05:V.alpha)<0||b>1)throw new RangeError(m("1H38V,Gb","alpha",b));for(L=[],N=0;N<j;N++){if(!s(T[N]))throw new TypeError(m("1H38X,GZ",T[N]));if(0===T[N].length)throw new Error(m("1H38Y,Ga",T[N]));for(D=x(T[N]),U=0;U<T[N].length;U++)T[N][U]-=D;L=L.concat(T[N])}for(K=L.length,P=new Array(K),N=0;N<K;N++)P[N]=l(L[N]);for(g=d(P),Z=new Array(K),G=0,Y=0,A=H(0,j),N=0;N<K;N++)Z[N]=r((1+g[N]/(K+1))/2,0,1),A[c?h(c,v[N]):v[N]]+=Z[N],G+=(w=Z[N]-G)/(N+1),Y+=w*(Z[N]-G);for(p=Y/(K-1),k=0,N=0;N<j;N++)k+=a(A[N],2)/T[N].length;return k=(k-K*a(G,2))/p,F=1-n(k,X=j-1),e(R={},"rejected",F<=b),e(R,"alpha",b),e(R,"pValue",F),e(R,"statistic",k),e(R,"df",X),e(R,"method","Fligner-Killeen test of homogeneity of variances"),e(R,"print",E),R}export{T as default};
//# sourceMappingURL=index.mjs.map
