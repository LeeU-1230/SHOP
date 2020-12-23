let buys = document.getElementsByTagName('button');
let car = [];

for (let i = 0; i < buys.length; i++) {
    buys[i].addEventListener('click', addToCar);
}


function addToCar(e) {
    let item = e.target.value;
    // console.log(item);

    car.push(item);
    // console.log(car.length);

    //item為品項名稱，型態為字串
    if (Cookies.get("carItem") == undefined) {
        //若目前沒有 carItem 這個 key 的 Cookie ，直接新增一個，並只對購物車頁面設定 Cookie
        Cookies.set("carItem", item, { path: 'https://leeu-1230.github.io/shop/car.html' });
    }
    else {
        //有的話就用逗號將品項做分隔再加入至 carItem 中
        currentItem = Cookies.get("carItem");
        currentItem = currentItem + "," + item;
        Cookies.set("carItem", currentItem, { path: 'https://leeu-1230.github.io/shop/car.html' });
    }
    alert("已加入購物車");
}