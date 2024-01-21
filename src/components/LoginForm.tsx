import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LOGIN_API_URL, TOKEN_KEY } from "@/utils/constant";


const LoginForm = () => {
  const formSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  type formValues = yup.InferType<typeof formSchema>;
  const form = useForm<formValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: formValues) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        // Optionally, you might handle the successful registration response
        console.log("Login successful:", data);
        localStorage.setItem(TOKEN_KEY, data.data.token)
        // navigate("/category");
      } else {
        // Handle registration failure (e.g., validation errors, server error)
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-[92vh] p-8 bg-slate-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="flex flex-col justify-between w-[350px] p-4 sm:w-[450px]">
            <div>
              <CardHeader>
                <CardTitle className="text-center"> Login</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Input Your Email" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Input Your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <CardFooter className="flex flex-col items-center gap-2">
              <Button className="w-3/4">Login</Button>
              <span className="text-xs">
                {"Don't have account?"}
                <a className=" underline " href="/register">
                  Register
                </a>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
