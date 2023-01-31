var X=Object.defineProperty;var st=t=>X(t,"__esModule",{value:!0});var lt=(t,e)=>{for(var c in e)X(t,c,{get:e[c],enumerable:!0})};st(exports);lt(exports,{GIFEncoder:()=>ft,applyPalette:()=>rt,default:()=>yt,dither:()=>K,prequantize:()=>nt,quantize:()=>N});var $={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function V(t=256){let e=0,c=new Uint8Array(t);return{get buffer(){return c.buffer},reset(){e=0},bytesView(){return c.subarray(0,e)},bytes(){return c.slice(0,e)},writeByte(o){r(e+1),c[e]=o,e++},writeBytes(o,i=0,f=o.length){r(e+f);for(let l=0;l<f;l++)c[e++]=o[l+i]},writeBytesView(o,i=0,f=o.byteLength){r(e+f),c.set(o.subarray(i,i+f),e),e+=f}};function r(o){var i=c.length;if(i>=o)return;var f=1024*1024;o=Math.max(o,i*(i<f?2:1.125)>>>0),i!=0&&(o=Math.max(o,256));let l=c;c=new Uint8Array(o),e>0&&c.set(l.subarray(0,e),0)}}var Q=12,J=5003,at=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function ut(t,e,c,r,o=V(512),i=new Uint8Array(256),f=new Int32Array(J),l=new Int32Array(J)){let u=f.length,x=Math.max(2,r);i.fill(0),l.fill(0),f.fill(-1);let s=0,n=0,b=x+1,A=b,h=!1,d=A,y=(1<<d)-1,g=1<<b-1,m=g+1,B=g+2,w=0,M=c[0],C=0;for(let p=u;p<65536;p*=2)++C;C=8-C,o.writeByte(x),k(g);let _=c.length;for(let p=1;p<_;p++){t:{let z=c[p],U=(z<<Q)+M,I=z<<C^M;if(f[I]===U){M=l[I];break t}let R=I===0?1:u-I;for(;f[I]>=0;)if(I-=R,I<0&&(I+=u),f[I]===U){M=l[I];break t}k(M),M=z,B<1<<Q?(l[I]=B++,f[I]=U):(f.fill(-1),B=g+2,h=!0,k(g))}}return k(M),k(m),o.writeByte(0),o.bytesView();function k(p){for(s&=at[n],n>0?s|=p<<n:s=p,n+=d;n>=8;)i[w++]=s&255,w>=254&&(o.writeByte(w),o.writeBytesView(i,0,w),w=0),s>>=8,n-=8;if((B>y||h)&&(h?(d=A,y=(1<<d)-1,h=!1):(++d,y=d===Q?1<<d:(1<<d)-1)),p==m){for(;n>0;)i[w++]=s&255,w>=254&&(o.writeByte(w),o.writeBytesView(i,0,w),w=0),s>>=8,n-=8;w>0&&(o.writeByte(w),o.writeBytesView(i,0,w),w=0)}}}var tt=ut;function T(t,e,c){return t<<8&63488|e<<2&992|c>>3}function G(t,e,c,r){return t>>4|e&240|(c&240)<<4|(r&240)<<8}function D(t,e,c){return t>>4<<8|e&240|c>>4}function P(t,e,c,r,o){let i=0,f=1e100;for(let l=0;l<o.length;l++){let u=o[l],x=u[3],s=S(x-r);if(s>f)continue;let n=u[0];if(s+=S(n-t),s>f)continue;let b=u[1];if(s+=S(b-e),s>f)continue;let A=u[2];s+=S(A-c),!(s>f)&&(f=s,i=l)}return i}function L(t,e,c,r){let o=0,i=1e100;for(let f=0;f<r.length;f++){let l=r[f],u=l[0],x=S(u-t);if(x>i)continue;let s=l[1];if(x+=S(s-e),x>i)continue;let n=l[2];x+=S(n-c),!(x>i)&&(i=x,o=f)}return o}function S(t){return t*t}function Y(t,e,c){return t<e?e:t>c?c:t}function et(t,e,c){var r=0,o=1e100;let i=t[e],f=i.cnt,l=i.ac,u=i.rc,x=i.gc,s=i.bc;for(var n=i.fw;n!=0;n=t[n].fw){let A=t[n],h=A.cnt,d=f*h/(f+h);if(!(d>=o)){var b=0;c&&(b+=d*S(A.ac-l),b>=o)||(b+=d*S(A.rc-u),!(b>=o)&&(b+=d*S(A.gc-x),!(b>=o)&&(b+=d*S(A.bc-s),!(b>=o)&&(o=b,r=n))))}}i.err=o,i.nn=r}function H(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function xt(t,e){let c=e==="rgb444"?4096:65536,r=new Array(c),o=t.length;if(e==="rgba4444")for(let i=0;i<o;++i){let f=t[i],l=f>>24&255,u=f>>16&255,x=f>>8&255,s=f&255,n=G(s,x,u,l),b=n in r?r[n]:r[n]=H();b.rc+=s,b.gc+=x,b.bc+=u,b.ac+=l,b.cnt++}else if(e==="rgb444")for(let i=0;i<o;++i){let f=t[i],l=f>>16&255,u=f>>8&255,x=f&255,s=D(x,u,l),n=s in r?r[s]:r[s]=H();n.rc+=x,n.gc+=u,n.bc+=l,n.cnt++}else for(let i=0;i<o;++i){let f=t[i],l=f>>16&255,u=f>>8&255,x=f&255,s=T(x,u,l),n=s in r?r[s]:r[s]=H();n.rc+=x,n.gc+=u,n.bc+=l,n.cnt++}return r}function N(t,e,c={}){let{format:r="rgb565",clearAlpha:o=!0,clearAlphaColor:i=0,clearAlphaThreshold:f=0,oneBitAlpha:l=!1}=c;if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let u=new Uint32Array(t.buffer),x=c.useSqrt!==!1,s=r==="rgba4444",n=xt(u,r),b=n.length,A=b-1,h=new Uint32Array(b+1);for(var d=0,g=0;g<b;++g){let v=n[g];if(v!=null){var y=1/v.cnt;s&&(v.ac*=y),v.rc*=y,v.gc*=y,v.bc*=y,n[d++]=v}}S(e)/d<.022&&(x=!1);for(var g=0;g<d-1;++g)n[g].fw=g+1,n[g+1].bk=g,x&&(n[g].cnt=Math.sqrt(n[g].cnt));x&&(n[g].cnt=Math.sqrt(n[g].cnt));var m,B,w;for(g=0;g<d;++g){et(n,g,!1);var M=n[g].err;for(B=++h[0];B>1&&(w=B>>1,!(n[m=h[w]].err<=M));B=w)h[B]=m;h[B]=g}var C=d-e;for(g=0;g<C;){for(var _;;){var k=h[1];if(_=n[k],_.tm>=_.mtm&&n[_.nn].mtm<=_.tm)break;_.mtm==A?k=h[1]=h[h[0]--]:(et(n,k,!1),_.tm=g);var M=n[k].err;for(B=1;(w=B+B)<=h[0]&&(w<h[0]&&n[h[w]].err>n[h[w+1]].err&&w++,!(M<=n[m=h[w]].err));B=w)h[B]=m;h[B]=k}var p=n[_.nn],z=_.cnt,U=p.cnt,y=1/(z+U);s&&(_.ac=y*(z*_.ac+U*p.ac)),_.rc=y*(z*_.rc+U*p.rc),_.gc=y*(z*_.gc+U*p.gc),_.bc=y*(z*_.bc+U*p.bc),_.cnt+=p.cnt,_.mtm=++g,n[p.bk].fw=p.fw,n[p.fw].bk=p.bk,p.mtm=A}let I=[];var R=0;for(g=0;;++R){let j=Y(Math.round(n[g].rc),0,255),v=Y(Math.round(n[g].gc),0,255),q=Y(Math.round(n[g].bc),0,255),F=255;if(s){if(F=Y(Math.round(n[g].ac),0,255),l){let ct=typeof l=="number"?l:127;F=F<=ct?0:255}o&&F<=f&&(j=v=q=i,F=0)}let W=s?[j,v,q,F]:[j,v,q];if(gt(I,W)||I.push(W),(g=n[g].fw)==0)break}return I}function gt(t,e){for(let c=0;c<t.length;c++){let r=t[c],o=r[0]===e[0]&&r[1]===e[1]&&r[2]===e[2],i=r.length>=4&&e.length>=4?r[3]===e[3]:!0;if(o&&i)return!0}return!1}function K(t,e,c,r,o,i){let f=new Uint8ClampedArray(t),l=new Uint32Array(f.buffer),u=l.length,x=new Uint8Array(u),s=o==="rgb444"?4096:65536,n=new Array(s),b=[0,0,0],A=o==="rgb444"?D:T;i=i||[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]];let h=r.map(y=>{let g=y[0],m=y[1],B=y[2];return(y.length===4?y[3]:255)<<24|B<<16|m<<8|g}),d=o==="rgba4444";for(let y=0;y<u;y++){let g=Math.floor(y%e),m=Math.floor(y/e),B=l[y],w,M,C,_;if(d){a=B>>24&255,_=B>>16&255,C=B>>8&255,M=B&255;let p=G(M,C,_,a);w=p in n?n[p]:n[p]=P(M,C,_,a,r)}else{_=B>>16&255,C=B>>8&255,M=B&255;let p=A(M,C,_);w=p in n?n[p]:n[p]=L(M,C,_,r)}x[y]=w;let k=r[w];b[0]=M-k[0],b[1]=C-k[1],b[2]=_-k[2],l[y]=h[w];for(let p=0;p<i.length;p++){let z=i[p],U=z[1]+g,I=z[2]+m;if(U>=0&&U<e&&I>=0&&I<c){let R=(U+I*e)*4,j=z[0];for(let v=0;v<3;v++){let q=v+R;f[q]=f[q]+b[v]*j}}}}return x}function O(t,e){return e>1?Math.round(t/e)*e:t}function nt(t,{roundRGB:e=5,roundAlpha:c=10,oneBitAlpha:r=null}={}){let o=new Uint32Array(t.buffer);for(let i=0;i<o.length;i++){let f=o[i],l=f>>24&255,u=f>>16&255,x=f>>8&255,s=f&255;if(l=O(l,c),r){let n=typeof r=="number"?r:127;l=l<=n?0:255}s=O(s,e),x=O(x,e),u=O(u,e),o[i]=l<<24|u<<16|x<<8|s<<0}}function rt(t,e,c="rgb565"){if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let r=new Uint32Array(t.buffer),o=r.length,i=c==="rgb444"?4096:65536,f=new Uint8Array(o),l=c==="rgba4444"||c==="rgba8888";if(e=e.map(u=>l&&u.length<4?[u[0],u[1],u[2],255]:u),c==="rgba8888"||c==="rgb888"){let u=new Map;for(let x=0;x<o;x++){let s=r[x],n=s>>24&255,b=s>>16&255,A=s>>8&255,h=s&255,d;u.has(s)?d=u.get(s):(d=l?P(h,A,b,n,e):L(h,A,b,e),u.set(s,d)),f[x]=d}}else if(c==="rgba4444"){let u=new Array(i);for(let x=0;x<o;x++){let s=r[x],n=s>>24&255,b=s>>16&255,A=s>>8&255,h=s&255,d=G(h,A,b,n),y=d in u?u[d]:u[d]=P(h,A,b,n,e);f[x]=y}}else if(c==="rgb565"||c==="rgb444"){let u=new Array(i),x=c==="rgb444"?D:T;for(let s=0;s<o;s++){let n=r[s],b=n>>16&255,A=n>>8&255,h=n&255,d=x(h,A,b),y=d in u?u[d]:u[d]=L(h,A,b,e);f[s]=y}}else throw new Error(`Invalid format ${c}`);return f}function ft(t={}){let{initialCapacity:e=4096,auto:c=!0}=t,r=V(e),o=5003,i=new Uint8Array(256),f=new Int32Array(o),l=new Int32Array(o),u=!1;return{reset(){r.reset(),u=!1},finish(){r.writeByte($.trailer)},bytes(){return r.bytes()},bytesView(){return r.bytesView()},get buffer(){return r.buffer},get stream(){return r},writeHeader:x,writeFrame(s,n,b,A={}){let{transparent:h=!1,transparentIndex:d=0,delay:y=0,palette:g=null,repeat:m=0,colorDepth:B=8,dispose:w=-1}=A,M=!1;if(c?u||(M=!0,x(),u=!0):M=Boolean(A.first),n=Math.max(0,Math.floor(n)),b=Math.max(0,Math.floor(b)),M){if(!g)throw new Error("First frame must include a { palette } option");dt(r,n,b,g,B),ot(r,g),m>=0&&ht(r,m)}let C=Math.round(y/10);bt(r,w,C,h,d);let _=Boolean(g)&&!M;wt(r,n,b,_?g:null),_&&ot(r,g),pt(r,s,n,b,B,i,f,l)}};function x(){it(r,"GIF89a")}}function bt(t,e,c,r,o){t.writeByte(33),t.writeByte(249),t.writeByte(4),o<0&&(o=0,r=!1);var i,f;r?(i=1,f=2):(i=0,f=0),e>=0&&(f=e&7),f<<=2;let l=0;t.writeByte(0|f|l|i),E(t,c),t.writeByte(o||0),t.writeByte(0)}function dt(t,e,c,r,o=8){let i=1,f=0,l=Z(r.length)-1,u=i<<7|o-1<<4|f<<3|l,x=0,s=0;E(t,e),E(t,c),t.writeBytes([u,x,s])}function ht(t,e){t.writeByte(33),t.writeByte(255),t.writeByte(11),it(t,"NETSCAPE2.0"),t.writeByte(3),t.writeByte(1),E(t,e),t.writeByte(0)}function ot(t,e){let c=1<<Z(e.length);for(let r=0;r<c;r++){let o=[0,0,0];r<e.length&&(o=e[r]),t.writeByte(o[0]),t.writeByte(o[1]),t.writeByte(o[2])}}function wt(t,e,c,r){if(t.writeByte(44),E(t,0),E(t,0),E(t,e),E(t,c),r){let o=0,i=0,f=Z(r.length)-1;t.writeByte(128|o|i|0|f)}else t.writeByte(0)}function pt(t,e,c,r,o=8,i,f,l){tt(c,r,e,o,t,i,f,l)}function E(t,e){t.writeByte(e&255),t.writeByte(e>>8&255)}function it(t,e){for(var c=0;c<e.length;c++)t.writeByte(e.charCodeAt(c))}function Z(t){return Math.max(Math.ceil(Math.log2(t)),1)}var yt=ft;
//# sourceMappingURL=gifenc.js.map
