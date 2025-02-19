import { useState } from 'react';
import UserValidator from '../../../../entities/user/User.validator';
import UserApi from '../../../../entities/user/UserApi';
import { useNavigate } from 'react-router';
import { setAccessToken } from '../../../../shared/lib/axiosinstance';

const INITIAL_INPUTS_DATA = {
  email: '',
  password: '',
};

export default function SignInForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { isValid, error } = UserValidator.validateSignIn(inputs);

    if (!isValid) return alert(error);

    try {
      const {
        statusCode,
        data,
        error: responseError,
        message,
      } = await UserApi.signIn(inputs);

      if (responseError) {
        alert(responseError);
        return;
      }

      if (statusCode === 200) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const { email, password } = inputs;

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type='email'
        name='email'
        placeholder='email'
        onChange={onChangeHandler}
        value={email}
      />

      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={onChangeHandler}
        value={password}
      />
      <button type='submit'>Send</button>
    </form>
  );
}
