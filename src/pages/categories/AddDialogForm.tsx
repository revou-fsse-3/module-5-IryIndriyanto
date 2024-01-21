import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";

const FormSchema = yup.object({
  name: yup.string().required(),
});

export function AddDialogForm() {
  const form = useForm<yup.InferType<typeof FormSchema>>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const token = localStorage.getItem("revou-w10-token") ?? "";
  async function onSubmit(data: yup.InferType<typeof FormSchema>) {
    const authToken = token;
    try {
      const response = await fetch(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();        
        console.log("Submit successful:", data);
      } else {
        throw new Error("Submit failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Your Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
}
