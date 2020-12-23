window.addEventListener('load',function(){
    let  url = location.search;
    let total = url.split("?")[1];
    let price_info = document.querySelector('.price_info');
    price_info.textContent = `NT$ ${total}`;
    console.log(total);
})

