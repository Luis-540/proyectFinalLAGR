function actualizarCacheDinamico(dynamicCache,req,res){
    if(res.ok){
        return caches.open(dynamicCache).then( cache => {
            cache.put(req,res.clone());
            return res.clone();
        });
    }else{
        // return fetch(event.request).then(new_response => {
        //     actualizarCacheDinamico(DYNAMIC_CACHE,event.request,new_response);
        // });
        return res;
    }
}