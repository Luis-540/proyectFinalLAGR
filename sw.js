importScripts('js/sw_aux.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dinamic-v1';
const INMUTABLE_CACHE = 'inmutable-V1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/arenita.jpg',
    'img/avatars/bob_esponja.jpg',
    'img/avatars/calamardo.jpg',
    'img/avatars/don_cangrejo.jpg',
    'img/avatars/patricio.jpg',
    'js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', event => {
    const cache_static = caches.open(STATIC_CACHE)
        .then( cache => {
            cache.addAll(APP_SHELL);
    });
    const cache_inmutable = caches.open(INMUTABLE_CACHE)
        .then( cache => {
            cache.addAll(APP_SHELL_INMUTABLE);
    });
    event.waitUntil(Promise.all([cache_static, cache_inmutable]));
});

self.addEventListener('activate', event => {
    const respuesta = caches.keys().then( keys => {
        keys.forEach(key => {
            if(key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});

self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then(res => {
        if(res){
            return res;
        }else{
            console.log(event.request.url);
            return fetch(event.request).then(new_response => {
                actualizarCacheDinamico(DYNAMIC_CACHE,event.request,new_response);
            });
        }

    });
    event.respondWith(respuesta);
});
