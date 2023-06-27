import React from 'react'
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51NN0WxGL2GTWt3Im3s5PJccKbU51YB4Up2JL5s9h6aT2GBipnYknrJEoZ2na2LJ5EpazhbdgM37Be4MqFcfKIhHW00WIiKmto9';

const onToken = token => {
    console.log(token);
    alert('Payment Successful')
}

    return (
        <StripeCheckout
        label= 'Pay Now'
        name= 'CRWN CLOTHING LTD'
        billingAddress
        shippingAddress
        image= 'https://svgshare.com/i/CUz.svg'
        description= {`Your total is $${price}`}
        amount= {priceForStripe}
        panelLabel= 'Pay Now'
        token= {onToken}
        stripeKey= {publishableKey}
        />
    )
}



export default StripeCheckoutButton;