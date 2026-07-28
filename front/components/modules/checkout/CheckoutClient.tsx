//front/components/modules/checkout/CheckoutClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import CheckoutHeader from './CheckoutHeader';
import CheckoutSteps from './CheckoutSteps';
import styles from './checkout.module.scss';
import PaymentMethodCard from './PaymentMethodCard';
import { Check, CreditCard } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { StripePaymentForm, StripePaymentProvider } from './stripe-payment-form';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { OrderItem } from '@/types/orders.types';
import { useOrder } from '@/hooks/useOrder';
import { useAuth } from '@/hooks/useAuth';

type Step = 1 | 2 | 3;

export default function CheckoutClient(){
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [stripeError, setStripeError] = useState<string | null>(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [orderId, setOrderId] = useState<string>("");

    const { isAuthenticated } = useAuth();
    const { totalPrice, items, clearAllCart } = useCart();
    const { clientSecret, confirmPayment, createPaymentIntent } = usePayment();

    const { createOrder } = useOrder()
    const router = useRouter();


    useEffect(() => {
        if(!isAuthenticated) {
            router.push("/auth/login?redirect=/checkout");
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        if(items.length == 0 && !orderId) {
            router.push("/cart");
        }
    }, [orderId, items, router])

    useEffect(() => {
        const createOrderAutomatically = async () => {
            if(selectedPayment && !orderId && !isCreatingOrder && !clientSecret) {
                setIsCreatingOrder(true);
                setStripeError(null);

                try {
                    const cartItems: OrderItem[] = items.map((item) => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price
                    }))

                    const order = await createOrder({
                        items: cartItems,
                        shippingAddress: "Banten, Tangerang Selatan"
                    })

                    if(!order){
                        throw new Error("Failed to create order")
                    }

                    setOrderId(order.id)

                    if(selectedPayment === "stripe") {
                        const paymentCreated = await createPaymentIntent({
                            orderId: order.id,
                            amount: totalPrice,
                            description: "Order payment for ecommerce purchase",
                            currency: "usd"
                        })

                        if(!paymentCreated) {
                            throw new Error("Failed to create payment intent")
                        }
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Failed to create payment intent";
                    setStripeError(errorMessage)
                    console.log("Order creation error:", error);
                } finally {
                    setIsCreatingOrder(false)
                }
            }
        };
        createOrderAutomatically()
    }, [selectedPayment, orderId, isCreatingOrder, clientSecret, items, createOrder, createPaymentIntent, totalPrice])

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPayment(method);
        setStripeError(null);
    }

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        try {
            setCurrentStep(3)
            const confirmed = await confirmPayment({
                orderId,
                paymentIntentId
            });

            if(!confirmed){
                throw new Error("Failed to confirm payment")
            }

            await clearAllCart()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to confirm payment";
            setStripeError(errorMessage)
        } 
    }

    const handlePaymentError = async (error: string) => {
        setStripeError(error)
        
    }

    return (
        <section className={styles.section}>
            {/* container */}
            <div className={styles.container}>
                <CheckoutHeader/>
                <CheckoutSteps currentStep={currentStep}/>
                <div className={styles.content}>
                    {
                        currentStep === 1 && (
                            <div className={styles.stepContent}>
                                <h2>Select Payment Method</h2>
                                <div className={styles.paymentMethod}>
                                    {/* stripe */}
                                    <PaymentMethodCard
                                        method="stripe"
                                        selectedMethod={selectedPayment}
                                        onSelect={handlePaymentMethodSelect}
                                        icon={<CreditCard/>}
                                        title="Credit / Debit Card"
                                        description="Pay securely with stripe"
                                    >
                                        {
                                            stripeError && (
                                                <div className={styles.errorMessage}>{stripeError}</div>
                                            )
                                        }
                                        {
                                            isCreatingOrder && !clientSecret && (
                                                <div className={styles.loadingContainer}>
                                                    <div className={styles.spinner}></div>
                                                    <div className={styles.loadingText}>
                                                        Creating your order
                                                    </div>
                                                </div>
                                            )
                                        }
                                    {
                                        clientSecret && (
                                            <StripePaymentProvider
                                                clientSecret={clientSecret}
                                                amount={totalPrice}    
                                                onSuccess={handlePaymentSuccess} 
                                                onError={handlePaymentError}                                       
                                            >
                                                <StripePaymentForm
                                                    amount={totalPrice}    
                                                    onSuccess={handlePaymentSuccess} 
                                                    onError={handlePaymentError} 
                                                />
                                            </StripePaymentProvider>
                                        )
                                    }
                                    </PaymentMethodCard>

                                    {/* other payments methods other than stripe*/}
                                </div>

                                {/* Summary */}
                                <div className={styles.summary}>
                                    <h3>Order summary</h3>
                                    <div className={styles.summaryRow}>
                                        <span>Items ({items.length})</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>

                                    <div className={styles.summaryRow}>
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>

                                    <hr className={styles.divider}/>
                                    <div className={styles.summaryTotal}>
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        currentStep === 3 && (
                            <div className={styles.stepContent}>
                                <div className={styles.success}>
                                    <Check size={80} strokeWidth={2}/>
                                    <h2>Order placed successfully</h2>
                                    <p>Your order #{orderId} has been confirmed</p>
                                    <p className={styles.shippingInfo}>Shipping to: <strong>Tangerang Selatan, Banten - 15223, Indonesia</strong></p>

                                    <button 
                                        className={styles.continueButton}
                                        onClick={() => router.push("/user/orders")}
                                    >
                                        Go to my orders
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};