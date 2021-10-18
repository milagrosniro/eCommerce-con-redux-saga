import React, { useState, useEffect } from "react";
import FormInput from '../Forms/FormInput/index';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Buttom from "../Forms/Buttom";
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from "../../Utils";
import './styles.scss';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../../redux/Cart/cart.actions';
import { useHistory } from "react-router";
import { saveOrderHistory } from '../../redux/Orders/orders.actions';

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
});

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
}



const PaymentDetails = () => {
    const elements = useElements();
    const { total, itemCount, cartItems } = useSelector(mapState);
    const stripe = useStripe();
    const dispatch = useDispatch();
    const history = useHistory();

    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if (itemCount < 1) {
            history.push('/dashboard')
        }
    }, [itemCount]) //cuando los valores del carrito esten vacios, se redirige al home, pq ya se realizo el pago.

    const handleSubmit = async event => {
        event.preventDefault();
        const cardElement = elements.getElement('card');

        if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country || !shippingAddress.state || !billingAddress.line1 || !billingAddress.city || !billingAddress.postalCode || !billingAddress.country ||
            !billingAddress.state || !recipientName || !nameOnCard) {
            return;
        }

        alert('aca se hace el post del pago');
        dispatch(saveOrderHistory({orderTotal: 5000,
                                cartItems:  { documentID:45, productThumbnail:'https://static.dafiti.com.ar/p/clon-6449-917293-1-product.jpg', productName:'remera', productPrice:'5000', quantity:1 }}))

        //conexion con firebase
        // apiInstance.post('/payments/create', {
        //     amount: total * 100,
        //     shippin: {
        //         name: recipientName,
        //         address: {
        //             ...shippingAddress
        //         }
        //     }
        // }).then(({ data: clientSecret }) => {
        //     stripe.createPaymentMethod({
        //         type: 'card',
        //         card: cardElement,
        //         billing_details: {
        //             name: nameOnCard,
        //             address: {
        //                 ...billingAddress
        //             }
        //         }
        //     }).then(({ paymentMethod }) => {
        //         stripe.confirmCardPayment(clientSecret, {
        //             payment_method: paymentMethod.id
        //         })
        //             .then(({ paymentIntent }) => {

        //                 const configOrder = {
        //                     orderTotal: total,
        //                     cartItems: cartItems.map(item => {
        //                         const { documentID, productThumbnail, productName, productPrice, quantity } = item,

        //                         return {
        //                             documentID, productThumbnail, productName, productPrice, quantity

        //                         }
        //                     })

        //                 }
        //                 dispatch(saveOrderHistory(configOrder))
        //             })
        //     })
        // })

    }

    const handleShipping = e => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })
    }

    const handleBilling = e => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    }
    return (
        <div className='paymentDetails'>
            <form onSubmit={handleSubmit}>

                <div className='group'>
                    <h2>
                        Shipping Address
                    </h2>
                    <FormInput
                        required
                        placeholder='Recipient Name'
                        name='recipientName'
                        handleChange={e => setRecipientName(e.target.value)}
                        value={recipientName}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='Line 1'
                        name='line1'
                        handleChange={e => handleShipping(e)}
                        value={shippingAddress.line1}
                        type='text'
                    />

                    <FormInput
                        placeholder='Line 2'
                        name='line2'
                        handleChange={e => handleShipping(e)}
                        value={shippingAddress.line2}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='City'
                        name='city'
                        handleChange={e => handleShipping(e)}
                        value={shippingAddress.city}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='State'
                        name='state'
                        handleChange={e => handleShipping(e)}
                        value={shippingAddress.state}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='Postal Code'
                        name='postalCode'
                        handleChange={e => handleShipping(e)}
                        value={shippingAddress.postalCode}
                        type='text'
                    />

                    <div className='formRow checkoutInput'>
                        <CountryDropdown
                            required
                            onChange={val => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={billingAddress.country} valueTypes='short' />
                    </div>
                </div>

                <div className='group'>
                    <h2>
                        Billing Address
                    </h2>

                    <FormInput
                        required
                        placeholder=' Name on Card'
                        name='nameOnCard'
                        handleChange={e => setNameOnCard(e.target.value)}
                        value={nameOnCard}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='Line 1'
                        name='line1'
                        handleChange={e => handleBilling(e)}
                        value={billingAddress.line1}
                        type='text'
                    />

                    <FormInput placeholder='Line 2'
                        name='line2'
                        handleChange={e => handleBilling(e)}
                        value={billingAddress.line2}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='City'
                        name='city'
                        handleChange={e => handleBilling(e)}
                        value={billingAddress.city}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='State'
                        name='state'
                        handleChange={e => handleBilling(e)}
                        value={billingAddress.state}
                        type='text'
                    />

                    <FormInput
                        required
                        placeholder='Postal Code'
                        name='postalCode'
                        handleChange={e => handleBilling(e)}
                        value={billingAddress.postalCode}
                        type='text'
                    />

                    <div className='formRow checkoutInput'>
                        <CountryDropdown
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={billingAddress.country} valueTypes='short' />
                    </div>
                </div>

                <div className='group'>
                    <h2>
                        Card Details
                    </h2>

                    <CardElement
                        options={configCardElement} />
                </div>
                <Buttom
                    type='submit'
                >Pay Now</Buttom>
            </form>
        </div>
    )
}

export default PaymentDetails;