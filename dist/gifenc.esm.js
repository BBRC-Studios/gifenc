var tt={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function R(t=256){let n=0,s=new Uint8Array(t);return{get buffer(){return s.buffer},reset(){n=0},bytesView(){return s.subarray(0,n)},bytes(){return s.slice(0,n)},writeByte(o){e(n+1),s[n]=o,n++},writeBytes(o,r=0,i=o.length){e(n+i);for(let f=0;f<i;f++)s[n++]=o[f+r]},writeBytesView(o,r=0,i=o.byteLength){e(n+i),s.set(o.subarray(r,r+i),n),n+=i}};function e(o){var r=s.length;if(r>=o)return;var i=1024*1024;o=Math.max(o,r*(r<i?2:1.125)>>>0),r!=0&&(o=Math.max(o,256));let f=s;s=new Uint8Array(o),n>0&&s.set(f.subarray(0,n),0)}}var H=12,nt=5003,ht=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function wt(t,n,s,e,o=R(512),r=new Uint8Array(256),i=new Int32Array(nt),f=new Int32Array(nt)){let g=i.length,u=Math.max(2,e);r.fill(0),f.fill(0),i.fill(-1);let l=0,c=0,b=u+1,A=b,h=!1,y=A,w=(1<<y)-1,x=1<<b-1,m=x+1,B=x+2,p=0,C=s[0],I=0;for(let d=g;d<65536;d*=2)++I;I=8-I,o.writeByte(u),v(x);let _=s.length;for(let d=1;d<_;d++){t:{let U=s[d],z=(U<<H)+C,M=U<<I^C;if(i[M]===z){C=f[M];break t}let D=M===0?1:g-M;for(;i[M]>=0;)if(M-=D,M<0&&(M+=g),i[M]===z){C=f[M];break t}v(C),C=U,B<1<<H?(f[M]=B++,i[M]=z):(i.fill(-1),B=x+2,h=!0,v(x))}}return v(C),v(m),o.writeByte(0),o.bytesView();function v(d){for(l&=ht[c],c>0?l|=d<<c:l=d,c+=y;c>=8;)r[p++]=l&255,p>=254&&(o.writeByte(p),o.writeBytesView(r,0,p),p=0),l>>=8,c-=8;if((B>w||h)&&(h?(y=A,w=(1<<y)-1,h=!1):(++y,w=y===H?1<<y:(1<<y)-1)),d==m){for(;c>0;)r[p++]=l&255,p>=254&&(o.writeByte(p),o.writeBytesView(r,0,p),p=0),l>>=8,c-=8;p>0&&(o.writeByte(p),o.writeBytesView(r,0,p),p=0)}}}var et=wt;function V(t,n,s){return t<<8&63488|n<<2&992|s>>3}function L(t,n,s,e){return t>>4|n&240|(s&240)<<4|(e&240)<<8}function Y(t,n,s){return t>>4<<8|n&240|s>>4}function O(t,n,s){return t<n?n:t>s?s:t}function j(t){return t*t}function rt(t,n,s){var e=0,o=1e100;let r=t[n],i=r.cnt,f=r.ac,g=r.rc,u=r.gc,l=r.bc;for(var c=r.fw;c!=0;c=t[c].fw){let A=t[c],h=A.cnt,y=i*h/(i+h);if(!(y>=o)){var b=0;s&&(b+=y*j(A.ac-f),b>=o)||(b+=y*j(A.rc-g),!(b>=o)&&(b+=y*j(A.gc-u),!(b>=o)&&(b+=y*j(A.bc-l),!(b>=o)&&(o=b,e=c))))}}r.err=o,r.nn=e}function N(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function yt(t,n){let s=n==="rgb444"?4096:65536,e=new Array(s),o=t.length;if(n==="rgba4444")for(let r=0;r<o;++r){let i=t[r],f=i>>24&255,g=i>>16&255,u=i>>8&255,l=i&255,c=L(l,u,g,f),b=c in e?e[c]:e[c]=N();b.rc+=l,b.gc+=u,b.bc+=g,b.ac+=f,b.cnt++}else if(n==="rgb444")for(let r=0;r<o;++r){let i=t[r],f=i>>16&255,g=i>>8&255,u=i&255,l=Y(u,g,f),c=l in e?e[l]:e[l]=N();c.rc+=u,c.gc+=g,c.bc+=f,c.cnt++}else for(let r=0;r<o;++r){let i=t[r],f=i>>16&255,g=i>>8&255,u=i&255,l=V(u,g,f),c=l in e?e[l]:e[l]=N();c.rc+=u,c.gc+=g,c.bc+=f,c.cnt++}return e}function K(t,n,s={}){let{format:e="rgb565",clearAlpha:o=!0,clearAlphaColor:r=0,clearAlphaThreshold:i=0,oneBitAlpha:f=!1}=s;if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let g=new Uint32Array(t.buffer),u=s.useSqrt!==!1,l=e==="rgba4444",c=yt(g,e),b=c.length,A=b-1,h=new Uint32Array(b+1);for(var y=0,x=0;x<b;++x){let k=c[x];if(k!=null){var w=1/k.cnt;l&&(k.ac*=w),k.rc*=w,k.gc*=w,k.bc*=w,c[y++]=k}}j(n)/y<.022&&(u=!1);for(var x=0;x<y-1;++x)c[x].fw=x+1,c[x+1].bk=x,u&&(c[x].cnt=Math.sqrt(c[x].cnt));u&&(c[x].cnt=Math.sqrt(c[x].cnt));var m,B,p;for(x=0;x<y;++x){rt(c,x,!1);var C=c[x].err;for(B=++h[0];B>1&&(p=B>>1,!(c[m=h[p]].err<=C));B=p)h[B]=m;h[B]=x}var I=y-n;for(x=0;x<I;){for(var _;;){var v=h[1];if(_=c[v],_.tm>=_.mtm&&c[_.nn].mtm<=_.tm)break;_.mtm==A?v=h[1]=h[h[0]--]:(rt(c,v,!1),_.tm=x);var C=c[v].err;for(B=1;(p=B+B)<=h[0]&&(p<h[0]&&c[h[p]].err>c[h[p+1]].err&&p++,!(C<=c[m=h[p]].err));B=p)h[B]=m;h[B]=v}var d=c[_.nn],U=_.cnt,z=d.cnt,w=1/(U+z);l&&(_.ac=w*(U*_.ac+z*d.ac)),_.rc=w*(U*_.rc+z*d.rc),_.gc=w*(U*_.gc+z*d.gc),_.bc=w*(U*_.bc+z*d.bc),_.cnt+=d.cnt,_.mtm=++x,c[d.bk].fw=d.fw,c[d.fw].bk=d.bk,d.mtm=A}let M=[];var D=0;for(x=0;;++D){let G=O(Math.round(c[x].rc),0,255),k=O(Math.round(c[x].gc),0,255),F=O(Math.round(c[x].bc),0,255),T=255;if(l){if(T=O(Math.round(c[x].ac),0,255),f){let dt=typeof f=="number"?f:127;T=T<=dt?0:255}o&&T<=i&&(G=k=F=r,T=0)}let $=l?[G,k,F,T]:[G,k,F];if(_t(M,$)||M.push($),(x=c[x].fw)==0)break}return M}function _t(t,n){for(let s=0;s<t.length;s++){let e=t[s],o=e[0]===n[0]&&e[1]===n[1]&&e[2]===n[2],r=e.length>=4&&n.length>=4?e[3]===n[3]:!0;if(o&&r)return!0}return!1}function ot(t,n,s){return t<<8&63488|n<<2&992|s>>3}function it(t,n,s,e){return t>>4|n&240|(s&240)<<4|(e&240)<<8}function ft(t,n,s){return t>>4<<8|n&240|s>>4}function ct(t,n,s,e,o){let r=0,i=1e100;for(let f=0;f<o.length;f++){let g=o[f],u=g[3],l=q(u-e);if(l>i)continue;let c=g[0];if(l+=q(c-t),l>i)continue;let b=g[1];if(l+=q(b-n),l>i)continue;let A=g[2];l+=q(A-s),!(l>i)&&(i=l,r=f)}return r}function st(t,n,s,e){let o=0,r=1e100;for(let i=0;i<e.length;i++){let f=e[i],g=f[0],u=q(g-t);if(u>r)continue;let l=f[1];if(u+=q(l-n),u>r)continue;let c=f[2];u+=q(c-s),!(u>r)&&(r=u,o=i)}return o}function q(t){return t*t}function W(t,n,s,e,o,r){let i=new Uint8ClampedArray(t),f=new Uint32Array(i.buffer),g=f.length,u=new Uint8Array(g),l=o==="rgb444"?4096:65536,c=new Array(l),b=[0,0,0],A=o==="rgb444"?ft:ot;r=r||[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]];let h=e.map(w=>{let x=w[0],m=w[1],B=w[2];return(w.length===4?w[3]:255)<<24|B<<16|m<<8|x}),y=o==="rgba4444";for(let w=0;w<g;w++){let x=Math.floor(w%n),m=Math.floor(w/n),B=f[w],p,C,I,_;if(y){a=B>>24&255,_=B>>16&255,I=B>>8&255,C=B&255;let d=it(C,I,_,a);p=d in c?c[d]:c[d]=ct(C,I,_,a,e)}else{_=B>>16&255,I=B>>8&255,C=B&255;let d=A(C,I,_);p=d in c?c[d]:c[d]=st(C,I,_,e)}u[w]=p;let v=e[p];b[0]=C-v[0],b[1]=I-v[1],b[2]=_-v[2],f[w]=h[p];for(let d=0;d<r.length;d++){let U=r[d],z=U[1]+x,M=U[2]+m;if(z>=0&&z<n&&M>=0&&M<s){let D=(z+M*n)*4,G=U[0];for(let k=0;k<3;k++){let F=k+D;i[F]=i[F]+b[k]*G}}}}return u}function P(t,n){var s=0,e;for(e=0;e<t.length;e++){let o=t[e]-n[e];s+=o*o}return s}function Q(t,n){return n>1?Math.round(t/n)*n:t}function lt(t,{roundRGB:n=5,roundAlpha:s=10,oneBitAlpha:e=null}={}){let o=new Uint32Array(t.buffer);for(let r=0;r<o.length;r++){let i=o[r],f=i>>24&255,g=i>>16&255,u=i>>8&255,l=i&255;if(f=Q(f,s),e){let c=typeof e=="number"?e:127;f=f<=c?0:255}l=Q(l,n),u=Q(u,n),g=Q(g,n),o[r]=f<<24|g<<16|u<<8|l<<0}}function at(t,n,s="rgb565"){if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(n.length>256)throw new Error("applyPalette() only works with 256 colors or less");let e=new Uint32Array(t.buffer),o=e.length,r=s==="rgb444"?4096:65536,i=new Uint8Array(o),f=new Array(r),g=s==="rgba4444";if(s==="rgba4444")for(let u=0;u<o;u++){let l=e[u],c=l>>24&255,b=l>>16&255,A=l>>8&255,h=l&255,y=L(h,A,b,c),w=y in f?f[y]:f[y]=Bt(h,A,b,c,n);i[u]=w}else{let u=s==="rgb444"?Y:V;for(let l=0;l<o;l++){let c=e[l],b=c>>16&255,A=c>>8&255,h=c&255,y=u(h,A,b),w=y in f?f[y]:f[y]=At(h,A,b,n);i[l]=w}}return i}function Bt(t,n,s,e,o){let r=0,i=1e100;for(let f=0;f<o.length;f++){let g=o[f],u=g[3],l=E(u-e);if(l>i)continue;let c=g[0];if(l+=E(c-t),l>i)continue;let b=g[1];if(l+=E(b-n),l>i)continue;let A=g[2];l+=E(A-s),!(l>i)&&(i=l,r=f)}return r}function At(t,n,s,e){let o=0,r=1e100;for(let i=0;i<e.length;i++){let f=e[i],g=f[0],u=E(g-t);if(u>r)continue;let l=f[1];if(u+=E(l-n),u>r)continue;let c=f[2];u+=E(c-s),!(u>r)&&(r=u,o=i)}return o}function ut(t,n,s=5){if(!t.length||!n.length)return;let e=t.map(i=>i.slice(0,3)),o=s*s,r=t[0].length;for(let i=0;i<n.length;i++){let f=n[i];f.length<r?f=[f[0],f[1],f[2],255]:f.length>r?f=f.slice(0,3):f=f.slice();let g=Z(e,f.slice(0,3),P),u=g[0],l=g[1];l>0&&l<=o&&(t[u]=f)}}function E(t){return t*t}function X(t,n,s=P){let e=Infinity,o=-1;for(let r=0;r<t.length;r++){let i=t[r],f=s(n,i);f<e&&(e=f,o=r)}return o}function Z(t,n,s=P){let e=Infinity,o=-1;for(let r=0;r<t.length;r++){let i=t[r],f=s(n,i);f<e&&(e=f,o=r)}return[o,e]}function xt(t,n,s=P){return t[X(t,n,s)]}function pt(t={}){let{initialCapacity:n=4096,auto:s=!0}=t,e=R(n),o=5003,r=new Uint8Array(256),i=new Int32Array(o),f=new Int32Array(o),g=!1;return{reset(){e.reset(),g=!1},finish(){e.writeByte(tt.trailer)},bytes(){return e.bytes()},bytesView(){return e.bytesView()},get buffer(){return e.buffer},get stream(){return e},writeHeader:u,writeFrame(l,c,b,A={}){let{transparent:h=!1,transparentIndex:y=0,delay:w=0,palette:x=null,repeat:m=0,colorDepth:B=8,dispose:p=-1}=A,C=!1;if(s?g||(C=!0,u(),g=!0):C=Boolean(A.first),c=Math.max(0,Math.floor(c)),b=Math.max(0,Math.floor(b)),C){if(!x)throw new Error("First frame must include a { palette } option");Mt(e,c,b,x,B),gt(e,x),m>=0&&It(e,m)}let I=Math.round(w/10);Ct(e,p,I,h,y);let _=Boolean(x)&&!C;kt(e,c,b,_?x:null),_&&gt(e,x),vt(e,l,c,b,B,r,i,f)}};function u(){bt(e,"GIF89a")}}function Ct(t,n,s,e,o){t.writeByte(33),t.writeByte(249),t.writeByte(4),o<0&&(o=0,e=!1);var r,i;e?(r=1,i=2):(r=0,i=0),n>=0&&(i=n&7),i<<=2;let f=0;t.writeByte(0|i|f|r),S(t,s),t.writeByte(o||0),t.writeByte(0)}function Mt(t,n,s,e,o=8){let r=1,i=0,f=J(e.length)-1,g=r<<7|o-1<<4|i<<3|f,u=0,l=0;S(t,n),S(t,s),t.writeBytes([g,u,l])}function It(t,n){t.writeByte(33),t.writeByte(255),t.writeByte(11),bt(t,"NETSCAPE2.0"),t.writeByte(3),t.writeByte(1),S(t,n),t.writeByte(0)}function gt(t,n){let s=1<<J(n.length);for(let e=0;e<s;e++){let o=[0,0,0];e<n.length&&(o=n[e]),t.writeByte(o[0]),t.writeByte(o[1]),t.writeByte(o[2])}}function kt(t,n,s,e){if(t.writeByte(44),S(t,0),S(t,0),S(t,n),S(t,s),e){let o=0,r=0,i=J(e.length)-1;t.writeByte(128|o|r|0|i)}else t.writeByte(0)}function vt(t,n,s,e,o=8,r,i,f){et(s,e,n,o,t,r,i,f)}function S(t,n){t.writeByte(n&255),t.writeByte(n>>8&255)}function bt(t,n){for(var s=0;s<n.length;s++)t.writeByte(n.charCodeAt(s))}function J(t){return Math.max(Math.ceil(Math.log2(t)),1)}var mt=pt;export{pt as GIFEncoder,at as applyPalette,mt as default,W as dither,xt as nearestColor,X as nearestColorIndex,Z as nearestColorIndexWithDistance,lt as prequantize,K as quantize,ut as snapColorsToPalette};
//# sourceMappingURL=gifenc.esm.js.map
