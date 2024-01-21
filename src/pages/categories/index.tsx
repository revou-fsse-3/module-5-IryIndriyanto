"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CATEGORY_API_URL } from "@/utils/constant";
import { useEffect, useState } from "react";
import { AddCategory } from "./AddCategory";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";

const CategoryTable = () => {
  type categories = {
    id: string;
    name: string;
    is_active: boolean;
  };

  const [categories, setCategories] = useState<categories[]>([]);
  //   const navigate = useNavigate();

  const fetchDataWithToken = async () => {
    const token = localStorage.getItem("revou-w10-token") ?? "";

    const authToken = token;
    if (authToken) {
      try {
        const response = await fetch(CATEGORY_API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach token in the header
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    } else {
      //   navigate("/login");
      console.log("User is not logged in");
      console.log(token);
    }
  };

  useEffect(() => {
    fetchDataWithToken();
  }, [categories]);

  const form = useForm();
  // const [categoryToEdit, setCategoryToEdit] = useState<categories[]>([]);
  const onSubmitEdit = async (editedData: any) => {
    const token = localStorage.getItem("revou-w10-token") ?? "";

    const authToken = token;
    try {
      const response = await fetch(
        "https://mock-api.arikmpt.com/api/category/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        console.log("Successfully edit data");
        location.reload();
      } else {
        // Request was not successful
        console.error("Failed to edit data:", response.statusText);
        console.log(editedData);
      }
    } catch (error) {
      console.error("Error occurred while geting data:", error);
    }
    console.log(editedData);
  };

  const deleteData = async (idToDelete: any) => {
    const token = localStorage.getItem("revou-w10-token") ?? "";

    const authToken = token;
    try {
      const response = await fetch(
        `https://mock-api.arikmpt.com/api/category/${idToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
        console.log("Successfully deleted data");
      } else {
        // Request was not successful
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while deleting data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-between my-3 px-6 max-w-[768px]">
          <span className="text-xl font-bold sm:text-2xl">
            Table of Category
          </span>
          <AddCategory />
        </div>
        <div className="flex justify-center w-full">
          <div className=" mt-2 overflow-x-scroll p-4">
            <div className=" w-full min-w-[768px]">
              <Table>
                <TableCaption>List of Category </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Id</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Is Active</TableHead>
                    <TableHead className="w-[170px] text-center">
                      Control
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="text-center">
                        {category.id}
                      </TableCell>
                      <TableCell className="text-center">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {category.is_active ? (
                          <span>Active</span>
                        ) : (
                          <span>Inactive</span>
                        )}
                      </TableCell>
                      <TableCell className="flex justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className=" w-[65px]" size={"sm"}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className=" py-9 px-12 sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                              <DialogDescription>
                                Edit Your Category List .
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(onSubmitEdit)}
                                className="space-y-0"
                              >
                                <FormField
                                  control={form.control}
                                  name="id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Id</FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={category.id}
                                          disabled
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={category.name}
                                          placeholder="Input Your Name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="is_active"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md px-2 pb-6">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Is user active?</FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit">Submit</Button>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          className=" w-[65px]"
                          size={"sm"}
                          variant={"destructive"}
                          onClick={() => deleteData(category.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryTable;
