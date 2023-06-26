const cartIcon=document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const closecart=document.querySelector("#cart-close");


cartIcon.addEventListener("click",() =>{
    cart.classList.add("active");
});


closecart.addEventListener("click",() =>{
    cart.classList.remove("active");
});

if(document.readyState=="loading"){
    document.addEventListener('DOMContentLoaded',start);

}
else{
    start();
}

function start(){
    
    addEvents();

}

function update(){
    addEvents();
    updateTotal();

}

function addEvents(){
console.log("----------------------add events--------")
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    

    console.log(cartRemove_btns);

    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removecartItem);   
    });
//change Item Quantity
    let cartQuantity_inputs=document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change",handle_ChangeItemQuantity);
    })


//ADD to cart
let addcart_btns=document.querySelectorAll(".add-cart");
addcart_btns.forEach(btn => {
    btn.addEventListener("click" ,handle_addcartItem);
});

//checkout process
let checkout_btn=document.querySelector(".btn-checkout");
checkout_btn.addEventListener("click" ,checkoutprocess);
//confirmation message

let contiunepayment=document.querySelector(".submit-btn");
contiunepayment.addEventListener("click" ,payment);


}

function checkoutprocess(){
    console.log("hiii")
    window.location.href = "checkout.html";
}




function payment(){
    console.log("hello")
    var txt;
    if (confirm("Press a button!")) {
        window.location.href = "index.html";

  } else {
    txt = "payment not done";
  }
}

 
function handle_addcartItem(){
    let product= this.parentElement;
    let title=product.querySelector(".product-title").innerHTML;
    let price=product.querySelector(".product-price").innerHTML;
    let imgsrc=product.querySelector(".product-img").src;
    console.log(title,price,imgsrc);
     
    let newToAdd={
        title,
        price,
        imgsrc
    };

    //Add product to cart
    let cartBoxElement= CartBoxComponent(title,price,imgsrc);
    let newNode=document.createElement("div");
    newNode.innerHTML=cartBoxElement;
    const cartContent=cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();

}




function handle_removecartItem() {
     this.parentElement.remove();
     update();
}

function handle_ChangeItemQuantity()
{
    if(isNaN(this.value) || this.value < 1){
        this.value=1;
    }
    this.value=Math.floor(this.value);
    update();
}

function updateTotal(){

    let cartBoxes=document.querySelectorAll('.cart-box');
    console.log(cartBoxes);
    const totalElement=cart.querySelector('.total-price');
    let total=0;
    cartBoxes.forEach(cartBox =>{
        let priceElement=cartBox.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs",""));
        let quantity=cartBox.querySelector(".cart-quantity").value;
        total+= price*quantity;

    });

    totalElement.innerHTML=" "+ total;
}




function CartBoxComponent(title,price,imgsrc){
                      return   `<div class="cart-box">
                        <img src=${imgsrc} alt="" class="cart-img">
                        <div class="detail-box">
                           <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" id="add_cart_1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>

                        </div>`;
 } 