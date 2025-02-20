import SignInForm from '../../features/auth/ui/SignInForm/SignInForm';
import '../PageStyles/Log-Reg.css'
export default function LoginPage({ setUser }) {
  return (
    <div className='registration-login-container'>
      <SignInForm setUser={setUser} />
    </div>
  );
}
