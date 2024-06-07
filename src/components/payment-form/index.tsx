'use client';

import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

interface PaymentFormProps {
  price: number,
  action: (prevState: { isPayed: boolean }, formData: FormData) => Promise<{ isPayed: boolean }>,
}

export default function PaymentForm({ price, action }: PaymentFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, { isPayed: false });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.isPayed) {
      router.replace('/movies');
    }
  }, [state.isPayed, router]);

  return (
    <form className={styles.form} action={formAction}>
      <div>
        <label htmlFor="card-number">Номер картки</label>
        <input
          type="number"
          name="card-number"
          id="card-number"
          minLength={16}
          maxLength={16}
          placeholder='0000 0000 0000 0000'
        />
      </div>
      <div className="flex flex-row">
        <div>
            <label htmlFor="validity">Термін дії</label>
            <input
              type="number"
              name="validity"
              id="validity"
              minLength={4}
              maxLength={4}
              placeholder='24/07'
            />
        </div>
        <div>
            <label htmlFor="cvv2">CVV2</label>
            <input
              type="number"
              name="cvv2"
              id="cvv2"
              maxLength={3}
              minLength={3}
              placeholder='123'
            />
        </div>
      </div>
      <div>
        <button type="submit">
          {pending ? 'Зачекайте...' : `Сплатити ${price}`} грн
        </button>
      </div>
    </form>
  )
}