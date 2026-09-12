/* 柿柿如意：原创程序化宫苑与柿子角色。 */
function persimmon(parent,x,y,z,size=1,character=false,orange=false){
 const g=new THREE.Group();g.name=character?(orange?'橙意':'喜柿'):'如意柿子';g.position.set(x,y,z);g.scale.setScalar(size);parent.add(g);
 sphere(g,0,0,0,1,.82,.94,mat(orange?0xf59b28:0xe65427,.66));
 const leaf=mat(0x607542);for(let i=0;i<4;i++){let a=i*Math.PI/2;let l=sphere(g,Math.cos(a)*.28,.76,Math.sin(a)*.28,.42,.055,.15,leaf);l.rotation.y=-a;l.rotation.z=.12;}
 box(g,0,.9,0,.12,.32,.12,mat(0x745033),.04);
 if(character){[-1,1].forEach(s=>{sphere(g,s*.29,.08,.865,.068,.105,.035,mat(0x422c22));sphere(g,s*.52,-.12,.77,.13,.07,.04,mat(0xffb583));});tube(g,[V(-.14,-.12,.93),V(0,-.21,.96),V(.14,-.12,.93)],.028,mat(0x62382b));}
 return g;
}
const palaceTextures={};
function palaceLabel(text){if(palaceTextures[text])return palaceTextures[text];return palaceTextures[text]=canvasTexture((c,w,h)=>{c.fillStyle='#652c24';c.fillRect(0,0,w,h);c.strokeStyle='#dcb56a';c.lineWidth=10;c.strokeRect(10,10,w-20,h-20);c.fillStyle='#ffe0a2';c.font='bold 66px "STKaiti","KaiTi",serif';c.textAlign='center';c.textBaseline='middle';c.fillText(text,w/2,h/2)},512,180);}
function palacePlaque(g,text,x,y,z,w=7){const p=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.35),new THREE.MeshBasicMaterial({map:palaceLabel(text),side:THREE.DoubleSide}));p.position.set(x,y,z);p.rotation.y=z<0?Math.PI:0;g.add(p);const q=p.clone();q.position.z=-z;q.rotation.y=z<0?0:Math.PI;g.add(q);}
function palaceRoof(g,w,d,y,h){
 const gold=mat(0xd6a245,.65),edge=mat(0xf3ca70,.5),beams=mat(0x37695f);
 box(g,0,y-.24,0,w,.48,d,beams);const vs=[],ids=[],n=14;
 // Curved eaves rise at the corners; a narrow ridge crowns the tiled roof.
 for(let side of [-1,1]){let base=vs.length/3;for(let j=0;j<=n;j++){let t=j/n;for(let i=0;i<=n;i++){let u=i/n*2-1;let half=w/2*(.76+.24*t);vs.push(u*half,y+h*(1-t)*(1-t)+.65*Math.pow(Math.abs(u),8)*t,side*d/2*t);}}for(let j=0;j<n;j++)for(let i=0;i<n;i++){let a=base+j*(n+1)+i;ids.push(a,a+1,a+n+1,a+1,a+n+2,a+n+1);}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));geo.setIndex(ids);geo.computeVertexNormals();gold.side=THREE.DoubleSide;g.add(new THREE.Mesh(geo,gold));
 for(let side of [-1,1]){let pts=[];for(let i=0;i<=16;i++){let u=i/8-1;pts.push(V(u*w/2,y+.65*Math.pow(Math.abs(u),8),side*d/2));}tube(g,pts,.14,edge);for(let i=-6;i<=6;i++){let pts=[];for(let j=0;j<=8;j++){let t=j/8,u=i/6;pts.push(V(u*w/2*(.76+.24*t),y+h*(1-t)*(1-t)+.65*Math.pow(Math.abs(u),8)*t+.04,side*d/2*t));}tube(g,pts,.055,edge);}}
 tube(g,[V(-w*.4,y+h+.3,0),V(0,y+h+.15,0),V(w*.4,y+h+.3,0)],.2,edge);
}
function palaceHall(d,side,label,scale=1){const f=frameAt(d,side*35),g=new THREE.Group();g.name='宫苑-'+label;g.position.copy(f.p);g.rotation.y=f.yaw+Math.PI/2;g.scale.setScalar(scale);scene.add(g);const red=mat(0xa83c2b),white=mat(0xe9dcc1),dark=mat(0x552b24),gold=mat(0xe7b85d);
 for(let i=0;i<3;i++)box(g,0,.3+i*.5,0,23-i*1.2,.6,15-i*.9,white);
 box(g,0,4.8,0,19,6.6,10,red);for(let x=-8;x<=8;x+=4){box(g,x,4.6,5.08,2.4,4.5,.08,dark);for(let j=-1;j<=1;j++)box(g,x+j*.6,4.6,5.16,.06,4.4,.08,gold);for(let y=3;y<=6;y++)box(g,x,y,5.17,2.4,.06,.08,gold);}
 for(let x=-10;x<=10;x+=4)for(let z of [-6,6]){box(g,x,4.8,z,.48,6.8,.48,red,.08);box(g,x,1.6,z,.85,.45,.85,white);}
 palaceRoof(g,24,16,8.1,3.4);box(g,0,10.9,0,15,1.6,7,red);palaceRoof(g,19,11,11.6,3.3);palacePlaque(g,label,0,7,6.08,6);
}
function palaceGate(d,text){let f=frameAt(d),g=new THREE.Group();g.name='宫苑-宫门-'+text;g.position.copy(f.p);g.rotation.y=f.yaw;scene.add(g);const red=mat(0xa83b2d),gold=mat(0xe9bd65);[-1,1].forEach(s=>{box(g,s*14,5.1,0,6,10.2,4,red);for(let x=0;x<4;x++)for(let y=0;y<6;y++)sphere(g,s*(11.8+x*1.2),1.8+y*1.15,-2.04,.1,.1,.1,gold);});box(g,0,10,0,34,2.1,4,red);palaceRoof(g,36,8,11.2,3.4);palacePlaque(g,text,0,10,-2.12,8);}
function persimmonTree(d,off,index){const f=frameAt(d,off),g=new THREE.Group();g.name='柿子树';g.position.copy(f.p);scene.add(g);let wood=mat(0x73513c),leaf=mat([0xb89235,0xd7ac42,0x89914f][index%3]);box(g,0,2.7,0,.5,5.4,.5,wood,.1);for(let s of [-1,1])tube(g,[V(0,2.4,0),V(s*1.2,4.2,0),V(s*2.4,5.4,.4)],.16,wood);sphere(g,0,5.8,0,2.5,1.5,2,leaf);sphere(g,2,5.2,.2,1.5,1.3,1.6,leaf);sphere(g,-2,5.4,0,1.6,1.3,1.5,leaf);for(let k=0;k<7;k++){let a=k*2.4;persimmon(g,Math.cos(a)*(1.6+k%2*.7),4.6+Math.sin(k)*.6,Math.sin(a)*1.7,.35);}}
function addPalace(){
 palaceGate(30,'柿柿如意');palaceGate(trackLength*.53,'喜柿临门');
 [80,190,320,450,780,935,1120,1260].forEach((d,i)=>palaceHall(d,i%2?1:-1,['如意殿','橙意阁','金秋苑','喜柿轩'][i%4],i===0?1.2:.85));
 for(let i=0;i<42;i++){const d=i/42*trackLength,side=i%2?1:-1,f=frameAt(d,side*24),g=new THREE.Group();g.name='宫苑-朱墙';g.position.copy(f.p);g.rotation.y=f.yaw;scene.add(g);box(g,0,2.6,0,1.2,5.2,23,mat(0xb64b36));box(g,0,5.25,0,1.7,.35,23.5,mat(0xd6a245));box(g,0,.35,0,1.5,.7,23,mat(0xd6c4a6));}
 for(let i=0;i<100;i++)persimmonTree((i+.3)/100*trackLength,(i%2?1:-1)*(16+(i%3)*3),i);
 for(let i=0;i<4;i++){let f=frameAt((i*.23+.12)*trackLength,-17),g=new THREE.Group();g.name='喜柿与橙意的拥抱站';g.position.copy(f.p);g.rotation.y=f.yaw;scene.add(g);box(g,0,.4,0,7,.8,5,mat(0xe4ccb0),.2);persimmon(g,-1.5,2.1,0,1.5,true);persimmon(g,1.5,1.9,0,1.3,true,true);palacePlaque(g,['喜柿抱抱','橙意满满','慢慢也很好','好柿在前方'][i],0,4.5,-1,6);}
}
