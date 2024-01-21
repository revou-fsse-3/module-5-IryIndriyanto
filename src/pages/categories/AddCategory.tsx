import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddDialogForm } from "./AddDialogForm";

export function AddCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className=" bg-green-600 sm:h-10">
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className=" py-9 px-12 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Add Your Category List .</DialogDescription>
        </DialogHeader>
        <AddDialogForm />
      </DialogContent>
    </Dialog>
  );
}
