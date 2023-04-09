export interface SubscriptionParams {
    duration: number;
    storageAmount: number;
    upfrontPayment: boolean;
}
  
export interface PaymentData {
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}
  
export interface Confirmation {
    email: string;
    subscriptionPrice: number;
    termsAndConditions: boolean;
}