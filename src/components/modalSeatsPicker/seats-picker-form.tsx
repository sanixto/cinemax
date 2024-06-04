import styles from './seats-picker-form.module.css';

interface SeatsPickerForm {
  availableSeats: boolean[][],
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  disabled: boolean,
}

export default function SeatsPickerForm({ availableSeats, handleChange, handleSubmit, disabled }: SeatsPickerForm) {
  return (
    <form className={styles.hall} onSubmit={handleSubmit}>
      {availableSeats.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`} className={styles.row}>
            {row.map((seat, seatIndex) => (
              <input
                key={`seat-${rowIndex}-${seatIndex}`}
                className={seat ? styles.seat : `${styles.seat} ${styles.booked}`}
                type="checkbox"
                value={`${rowIndex+1}${seatIndex}`}
                onChange={handleChange}
                title={seat ? `Місце ${rowIndex+1}${seatIndex}` : 'Заброньовано'}
                disabled={!seat}
              />
            ))}
          </div>
        );
      })}
      <div className="flex justify-center">
        <button type="submit" disabled={disabled}>Далі</button>
      </div>
    </form>
  );
}