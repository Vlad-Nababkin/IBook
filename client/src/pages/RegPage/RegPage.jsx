import SignUpForm from '../../features/auth/ui/SignUpForm/SignUpForm';

export default function RegPage({ setUser }) {
  return (
    <div>
      <SignUpForm setUser={setUser} />
    </div>
  );
}
