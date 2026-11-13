/* ===== ФОТО И ВИДЕО =====
   Фото: положи файл в папку media/photos/ и допиши его имя в список PHOTOS.
   Видео: положи файл в media/videos/ и допиши имя в список VIDEOS,
   либо вставь ссылку на YouTube/Vimeo в формате embed,
   например "https://www.youtube.com/embed/XXXXXXXXXXX".
   Порядок в списке = порядок на сайте. Не забудь запятую после каждой строки. */
const PHOTOS=[
   "1.jpeg",
   "2.jpeg",
   "3.jpeg",
   "4.jpeg",
   "5.jpeg",
   "6.jpeg"
];
const VIDEOS=[
   "video.mp4",
   "video1.mp4",
   "video2.mp4",
   "video3.mp4",
   "video4.mp4",
];

const pg=document.getElementById('photos'),vg=document.getElementById('videos');
if(pg){
  PHOTOS.forEach(function(n){
    const f=document.createElement('figure'),i=new Image();
    i.src='media/photos/'+n;i.alt='ex situ';i.loading='lazy';
    f.appendChild(i);pg.appendChild(f);
  });
  if(!PHOTOS.length)document.getElementById('no-photos').hidden=false;
}
if(vg){
  VIDEOS.forEach(function(n){
    const f=document.createElement('figure');f.className='wide';
    if(/^https?:/.test(n)){
      f.innerHTML='<iframe src="'+n+'" allowfullscreen loading="lazy" title="видео"></iframe>';
    }else{
      f.innerHTML='<video src="media/videos/'+n+'" controls preload="metadata" playsinline></video>';
    }
    vg.appendChild(f);
  });
  if(!VIDEOS.length)document.getElementById('no-videos').hidden=false;
}
