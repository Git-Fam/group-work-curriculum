
import { useAuth } from '../assets/contexts/AuthContext.jsx';
import '../assets/styles/button.scss';

const Button = ({ children, className, onClick, type = 'button' }) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const LogoutButton = ({ className = '' }) => {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} className={className}>
      Logout
    </Button>
  );
};

export { Button, LogoutButton };
