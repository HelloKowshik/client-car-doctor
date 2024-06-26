import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg';

const SignUp = () => {
  const { createUser } = useAuth();
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(res => {
          console.log(res.user);
          form.reset();
        })
        .catch(err => console.log(err.mesaage));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="mr-12 w-1/2">
      <img src={loginImg} />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSignUp}>
      <h1 className="text-3xl text-center font-bold">Sign Up!</h1>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <input type='submit' className="btn btn-primary" value='Sign Up' />
        </div>
      </form>
      <p className='text-center my-4'>Have an account? <Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
    </div>
  </div>
</div>
);
};

export default SignUp;
