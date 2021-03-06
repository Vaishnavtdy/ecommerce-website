function addToCart(prodId){
    $.ajax({
        url:'/add-to-cart/'+prodId,
        method:'get',
        success:(response)=>{
            if(response.status){
                let count=$('#cart-count').html()
                count = parseInt(count)+1
                $("#cart-count").html(count)
            }
        }
    })
}

function removeItem(cartId, proId) {
    $.ajax({
        url: '/remove-product-from-cart',
        data: {
            cart: cartId,
            product: proId
        },
        method: 'post',
        success: (response) => {
            if (response.removeProduct) {
                alert('Product removed from cart')
                location.reload()
            }
        }
    })
}