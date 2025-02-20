import SignUpForm from '../../features/auth/ui/SignUpForm/SignUpForm';
import '../PageStyles/Log-Reg.css'

export default function RegPage({ setUser }) {
  return (
    <div className='registration-login-container'>
      <SignUpForm setUser={setUser} />
    </div>
  );
}
