import SignInForm from '../../features/auth/ui/SignInForm/SignInForm';

export default function LoginPage({ setUser }) {
  return (
    <div>
      <SignInForm setUser={setUser} />
    </div>
  );
}
