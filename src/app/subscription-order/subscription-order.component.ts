import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { PaymentData, SubscriptionParams, Confirmation } from '../models/subscription-order.model';

@Component({
  selector: 'app-subscription-order',
  templateUrl: './subscription-order.component.html',
  styleUrls: ['./subscription-order.component.scss']    
})
export class SubscriptionOrderComponent implements OnInit {

  title = 'Subscription Order';

  subscriptionParamsForm: FormGroup;
  paymentDataForm: FormGroup;  
  confirmationForm: FormGroup;

  selectedSubscription!: string;
  finalPrice!: number;
  subscriptionPlans = [
    {
      duration_months: 3,
      price_usd_per_gb: 3,
    },
    {
      duration_months: 6,
      price_usd_per_gb: 2.5,
    },
    {
      duration_months: 12,
      price_usd_per_gb: 2,
    },
  ];

  currentPlan = this.subscriptionPlans[2];
  currentUsdPerGb = this.currentPlan.price_usd_per_gb;
  storageAmount = [5, 10, 50];
  
  constructor(private fb: FormBuilder) {
    // Step 1: Subscription Parameters
    this.subscriptionParamsForm = this.fb.group({
      duration: [this.currentPlan.duration_months.toString(), Validators.required],
      storageAmount: [5, Validators.required],
      upfrontPayment: [false, Validators.required]
    });

    // Step 2: Payment Data
    this.paymentDataForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.required]
    });

    // Step 3: Confirmation
    this.confirmationForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      termsAndConditions: [false, Validators.requiredTrue]
    });


    this.subscriptionParamsForm.valueChanges.subscribe((value) => {
      // Update current subscription plan and USD per GB based on form values
      const duration = this.subscriptionParamsForm.value.duration;
      this.currentPlan = this.subscriptionPlans.find((plan) => plan.duration_months === duration) || this.currentPlan;
      this.currentUsdPerGb = this.currentPlan.price_usd_per_gb;
    });

  //this.calculatePrice();
  }

  ngOnInit () {
    
  }

  get totalPrice(): number {
    const amount = parseInt(this.subscriptionParamsForm.value.storageAmount);
    const upfrontPayment = this.subscriptionParamsForm.value.upfrontPayment;

    let total = this.currentUsdPerGb * amount;

    if (upfrontPayment) {
      total *= 0.9; // 10% discount for upfront payment
    }

    return total;
  } 

  onSubscriptionConfirm() { }

}
