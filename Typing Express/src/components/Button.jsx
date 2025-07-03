import '../assets/styles/button.scss';

export const Button = ({ children, className, onClick, type = 'button' }) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
