import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Login() {
  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            My Account
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">My Account</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center pt-24 px-4">
        <Card className="flex flex-col gap-8 p-4 border-none outline-none shadow-lg  sm:w-[50%]">
          <div className="">
            <CardTitle className="font-josifen text-[32px] font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-[#9096B2] text-center font-lato text-[17px]">
              Please login using account detail bellow
            </CardDescription>
          </div>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <Input
                placeholder="Email address"
                className="border-gray-300 text-gray-400 py-5"
              />
              <Input
                placeholder="Password"
                className="border-gray-300 text-gray-400 py-5"
              />
              <p className="text-[#9096B2] font-lato text-[17px]">
                Forgot your Password?
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full bg-[#FB2E86] hover:bg-[#FB4E86] text-white">
                Sign in
              </Button>
              <p className="text-[#9096B2] font-lato text-[17px]">
                Don't have an account? Create Account
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-16">
          <Image
            src="/brands.png"
            alt="brand"
            width={1000}
            height={1000}
            className="w-[80%]"
          ></Image>
        </div>
      </div>
    </div>
  );
}
