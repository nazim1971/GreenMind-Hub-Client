/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import PaymentAfter from '@/components/Payment';

const ClientValidation = ({ res }: { res: any }) => {
const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('hasReloaded');

    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload(); // Reload once
    } else {
      setShouldRender(true); // Allow rendering only after reload
    }
  }, []);

  if (!shouldRender) return null;
  return (
    <PaymentAfter
      response={res}
      icon="ShieldCheck"
      pageName="Payment Successful"
      description="Your payment is validated successfully. Take a ScreenShot before refreshing or leaving this page for further queries."
      href="/"
      buttonText="Go to Home"
    />
  );
};

export default ClientValidation;
