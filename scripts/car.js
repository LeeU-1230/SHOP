let p_name = [];       // 商品名稱array
let p_price = [];     //  商品價格array
let total_vu = 0;    // 總金額

if (Cookies.get("carItem") == undefined) {          // 若 Cookies 中沒有 carItem
    let element = document.createElement("p");
    element.innerText = "購物車內沒有物品喔!趕快去選購"
    document.querySelector("ul").appendChild(element);
}
else {
    let items = Cookies.get("carItem");      // split方法將品項列出來
    items = items.split(",");
    // console.log(items);

    for (let item of items) {
        p_name.push(item.split(";", 2)[0]);
        p_price.push(item.split(";", 2)[1]);
        // console.log(items);
        // console.log(p_name);
        // console.log(p_price);
    }
    print(p_name);
}

function print(arr) {           // 將商品顯示畫面
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            continue
        } else if (arr[i] != '') {
            let element = document.createElement("li");
            element.className = 'prod-item';
            element.innerHTML = `
                <span class="prod_name">${p_name[i]}</span>
                <span class="prod_price">${p_price[i]}</span>
                <span class="prod_qty">
                    <select class="select_qty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select></span>
                <span class="prod_subtotal">${p_price[i]}</span>
                <span class="prod_cancel">
                <button type="button" id='${[i]}' class="btn btn-outline-primary">取消</button></span>`;
            document.querySelector("ul").appendChild(element);
        }
    }
}



let select_qty_s = document.getElementsByClassName('select_qty');
let prod_name_s = document.getElementsByClassName('prod_name');
let prod_price_s = document.getElementsByClassName('prod_price');
let prod_subtotal_s = document.getElementsByClassName('prod_subtotal');
let buttons = document.getElementsByTagName('button');
let total_price = document.getElementsByClassName('total_price');
let shipping_price = 80;



for (let i = 0; i < prod_price_s.length; i++) {             // 商品數量選擇的事件
    select_qty_s[i].addEventListener('change', function () {
        let thp = select_qty_s[i].value * prod_price_s[i].textContent;
        // console.log(thp);
        prod_subtotal_s[i].textContent = thp;
        total();
    })

    total();
}

function total() {                 // 計算總金額
    let value = 0;

    for (let i = 0; i < prod_subtotal_s.length; i++) {
        value += Number(prod_subtotal_s[i].textContent);
    }
    value = value + shipping_price;
    total_price[0].textContent = value;
    total_vu = value;
    console.log(total_vu);
}


for (let j = 0; j < buttons.length; j++) {            // 取消商品選取的事件
    // console.log(prod_price_s[j]);
    buttons[j].addEventListener('click', function () {
        let items = Cookies.get("carItem");
        let str = `${prod_name_s[j].textContent};${prod_price_s[j].textContent}`;

        items = items.replace(str, '');
        items = items.replace(', ', '');

        // console.log(str);
        // console.log(items);
        Cookies.set("carItem", items);

        print(p_name);
        // console.log(p_name);
        window.location.reload();
    })
}



let a_creditcard = document.querySelector('.a_creditcard');         // 向付款頁面傳遞購買總金額
let a_COD = document.querySelector('.a_COD');
let a_ATM = document.querySelector('.a_ATM');
let a_IBO = document.querySelector('.a_IBO');

a_creditcard.addEventListener('click', function () {
    a_creditcard.setAttribute('href', `htmls/creditcard.html?${total_vu}`);
})

a_COD.addEventListener('click', function () {
    a_COD.setAttribute('href', `htmls/COD.html?${total_vu}`);
})

a_ATM.addEventListener('click', function () {
    a_ATM.setAttribute('href', `htmls/ATM.html?${total_vu}`);
})

a_IBO.addEventListener('click', function () {
    a_IBO.setAttribute('href', `htmls/ibon.html?${total_vu}`);
})
