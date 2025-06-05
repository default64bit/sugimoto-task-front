"use client";
import { TbPencilPlus } from "react-icons/tb";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Textarea } from "../ui/Textarea";
import { Slider } from "../ui/Slider";

const formSchema = z.object({
  username: z.string({ required_error: "add your name here please" }),
  reviewText: z.string({ required_error: "please write your review" }),
  rating: z.number({ required_error: "please add a rating" }),
});

const NewReviewDialog = ({ productId }: { productId: string }) => {
  const [creating, setCreating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      reviewText: "",
      rating: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (creating) return;
    setCreating(true);

    const data = {
      usersName: values.username,
      text: values.reviewText,
      rating: values.rating,
    };

    const R = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

    if (R.status >= 400) {
      const errorArray = (await R.json()).message;
      setErrorMsg(errorArray[0].errors[0]);
    }

    if (R.status < 300) {
      alert("review has been posted!");
      form.reset();
    }

    setCreating(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="flex gap-2" size="sm" variant="secondary">
            <TbPencilPlus size="1.2rem" /> New review
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit New Review</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviewText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <div className="flex">
                      <FormControl className="w-full max-w-2xs">
                        <Slider defaultValue={[1]} max={5} step={1} onChange={(v) => field.onChange(v)} />
                      </FormControl>
                      <span className="flex items-center gap-2 bg-neutral-300/20 p-1 px-4 rounded-full">{field.value} Stars</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="" type="submit">
                Submit
              </Button>
              {errorMsg && <div className="text-rose-500/70">{errorMsg}</div>}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewReviewDialog;
