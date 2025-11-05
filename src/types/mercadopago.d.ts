interface MercadoPagoInstance {
  checkout(options: {
    preference: {
      id: string;
    };
    render: {
      container: string;
      label?: string;
    };
  }): void;
}

interface Window {
  MercadoPago: {
    new (publicKey: string, options: { locale: string }): MercadoPagoInstance;
  };
}
