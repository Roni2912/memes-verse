import { useState } from 'react';

/** Two-step button: first click asks for confirmation, second click runs the action. */
export default function ConfirmButton({ onConfirm, children, confirmLabel = 'Click again to confirm', className = 'btn-danger' }) {
  const [armed, setArmed] = useState(false);

  const handleClick = () => {
    if (armed) {
      setArmed(false);
      onConfirm();
    } else {
      setArmed(true);
      setTimeout(() => setArmed(false), 4000);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {armed ? confirmLabel : children}
    </button>
  );
}
