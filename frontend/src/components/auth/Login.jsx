import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    ///convert into formData

    try {
      //api call
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-5 my-10"
        >
          <h1 className="font-bold text-3xl mb-5 text-center">Login</h1>
          <div className="my-2">
            <Label>Email : </Label>
            <Input
              name="email"
              type="email"
              placeholder="your email"
              value={input.email}
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password : </Label>
            <Input
              name="password"
              type="password"
              placeholder="your password"
              value={input.password}
              onChange={changeHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center my-3 gap-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruitor"
                  className="cursor-pointer"
                  checked={input.role === "recruitor"}
                  onChange={changeHandler}
                />
                <Label htmlFor="r2">Recruitor</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
          <span className="text-sm">
            Not have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
