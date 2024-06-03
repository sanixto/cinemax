'use client';

import styles from './review-form.module.css';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

interface ReviewFormProps {
  action: (prevState: { errorMessages: string[] }, formData: FormData) => Promise<{ errorMessages: string[] }>,
}

export default function ReviewForm({ action }: ReviewFormProps) {
  const [state, formAction] = useFormState(action, {errorMessages: [] });
  const { pending } = useFormStatus();
  const [rating, setRating] = useState<number>(10);
  const [comment, setComment] = useState<string>('');

  const handleChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.currentTarget.value));
  }

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  }

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
    setRating(10);
    setComment('');
  }

  return (
    <form className={styles.form} action={handleSubmit}>
      <h4>Як ви оцінюєте фільм?</h4>
      <div className="flex justify-space mb-3">
        <input
            className={styles.slider}
            type="range"
            name="rating"
            id="rating"
            min={0}
            max={10}
            value={rating}
            onChange={handleChangeRating}
            style={{ '--value': `${(rating) * 10}%` }}
        />
        <span>{rating}/10★</span>
      </div>
      <h4>Напишіть відгук</h4>
      <textarea
        className="mb-3"
        name="comment"
        id="comment"
        rows={10}
        value={comment}
        onChange={handleChangeComment}
        required
      ></textarea>
      <div className="flex justify-end">
        <button type="submit">
          {pending ? 'Надсилання...' : 'Надіслати відгук'}
        </button>
      </div>
      {state.errorMessages.length > 0 && (
        <ul className={styles.errors}>
          {state.errorMessages.map(errorMsg => (
            <li key={errorMsg}>{errorMsg}</li>
          ))}
        </ul>
      )}
    </form>
  );
}