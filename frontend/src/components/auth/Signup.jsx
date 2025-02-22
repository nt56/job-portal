import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    file: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //convert into formData

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
          <h1 className="font-bold text-3xl mb-5 text-center">Signup</h1>
          <div className="my-2">
            <Label>Full Name : </Label>
            <Input
              name="fullName"
              type="text"
              placeholder="your name"
              value={input.fullName}
              onChange={changeHandler}
            />
          </div>
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
          <div className="my-2">
            <Label>Phone Number : </Label>
            <Input
              name="phone"
              type="text"
              placeholder="your mobile number"
              value={input.phone}
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Profile : </Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center my-3 gap-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruitor"
                  checked={input.role === "recruitor"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruitor</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
