class PaymentService {
  async createPayment(amount: number, customerEmail: string, currency: string) {
    return {
      status: 'success',
      message: 'Payment initialized successfully',
      data: {
        tx_ref: `fake-tx-${Date.now()}`,
        amount,
        currency,
        customer: { email: customerEmail },
      },
    };
  }
}

export const paymentservice = new PaymentService();
