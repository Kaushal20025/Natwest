/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/(function(){var _=["vs/workbench/contrib/output/common/outputLinkComputer","require","exports","vs/base/common/uri","vs/base/common/extpath","vs/base/common/resources","vs/base/common/strings","vs/editor/common/core/range","vs/base/common/platform","vs/base/common/network","vs/editor/common/services/textModelSync/textModelSync.impl"],M=function(t){for(var e=[],r=0,a=t.length;r<a;r++)e[r]=_[t[r]];return e},S=this&&this.__createBinding||(Object.create?function(t,e,r,a){a===void 0&&(a=r);var l=Object.getOwnPropertyDescriptor(e,r);(!l||("get"in l?!e.__esModule:l.writable||l.configurable))&&(l={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,a,l)}:function(t,e,r,a){a===void 0&&(a=r),t[a]=e[r]}),y=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),$=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&S(e,t,r);return y(e,t),e};define(_[0],M([1,2,3,4,5,6,7,8,9,10]),function(t,e,r,a,l,i,C,R,w,j){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.OutputLinkComputer=void 0,e.create=x,a=$(a),l=$(l),i=$(i);class b{constructor(n){this.a=new j.$H5,this.b=new Map,this.a.bindToServer(n)}$setWorkspaceFolders(n){this.c(n)}c(n){const s=n.sort((o,u)=>u.length-o.length).map(o=>r.URI.parse(o));for(const o of s){const u=b.createPatterns(o);this.b.set(o,u)}}d(n){return this.a.getModel(n)}$computeLinks(n){const s=this.d(n);if(!s)return[];const o=[],u=i.$xf(s.getValue());for(const[f,d]of this.b){const h={toResource:c=>typeof c=="string"?l.$lh(f,c):null};for(let c=0,v=u.length;c<v;c++)o.push(...b.detectLinks(u[c],c+1,d,h))}return o}static createPatterns(n){const s=[],o=n.scheme===w.Schemas.file?n.fsPath:n.path,u=[o];R.$l&&n.scheme===w.Schemas.file&&u.push(a.$Dg(o));for(const f of u){const d=`[^\\s\\(\\):<>'"]`,c=`${`(?:${d}| ${d})`}+\\.${d}+`,v=`${d}+`;s.push(new RegExp(i.$mf(f)+`(${c}) on line ((\\d+)(, column (\\d+))?)`,"gi")),s.push(new RegExp(i.$mf(f)+`(${c}):line ((\\d+)(, column (\\d+))?)`,"gi")),s.push(new RegExp(i.$mf(f)+`(${c})(\\s?\\((\\d+)(,(\\d+))?)\\)`,"gi")),s.push(new RegExp(i.$mf(f)+`(${v})(:(\\d+))?(:(\\d+))?`,"gi"))}return s}static detectLinks(n,s,o,u){const f=[];return o.forEach(d=>{d.lastIndex=0;let h,c=0;for(;(h=d.exec(n))!==null;){const v=i.$sf(h[1],".").replace(/\\/g,"/");let p;try{const m=u.toResource(v);m&&(p=m.toString())}catch{continue}if(h[3]){const m=h[3];if(h[5]){const E=h[5];p=i.$if("{0}#{1},{2}",p,m,E)}else p=i.$if("{0}#{1}",p,m)}const g=i.$sf(h[0],"."),P=n.indexOf(g,c);c=P+g.length;const O={startColumn:P+1,startLineNumber:s,endColumn:P+1+g.length,endLineNumber:s};if(f.some(m=>C.$Wt.areIntersectingOrTouching(m.range,O)))return;f.push({range:O,url:p})}}),f}}e.OutputLinkComputer=b;function x(L){return new b(L)}})}).call(this);

//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/38c31bc77e0dd6ae88a4e9cc93428cc27a56ba40/core/vs/workbench/contrib/output/common/outputLinkComputer.js.map
