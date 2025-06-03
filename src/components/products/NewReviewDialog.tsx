import { TbPencilPlus } from "react-icons/tb";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";

const NewReviewDialog = ({ productId }: { productId: string }) => {
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
            {/* <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription> */}
          </DialogHeader>
          <div></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewReviewDialog;
