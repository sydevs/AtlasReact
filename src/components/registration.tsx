import { Input, Textarea, Button, Form } from "@nextui-org/react";
import { Event } from "@/types";
import { useState } from "react";
import { ShareIcon, PlusSquareIcon } from "@/components/icons";

type Props = {
  event: Event;
};

export default function Registration({ event }: Props) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="flex flex-row my-5 gap-5 space-around justify-center align-middle">
        <img src="/graphics/leaves.svg" className="h-12 object-fit -rotate-90 flip" />
        <div className="text-center text-lg">
          <h3 className="mb-1.5">Register Now</h3>
          <div className="text-xs italic">This class is on-going</div>
        </div>
        <img src="/graphics/leaves.svg" className="h-12 object-fit rotate-90" />
      </div>
      {submitted ?
        <>
          <div className="bg-circle-pattern bg-fit bg-center bg-no-repeat flex flex-col justify-center items-center px-10 py-24 -mx-6 gap-7 text-center">
            <div className="max-w-64 text-2xl mt-4">Thank you for registering!</div>
            <div className="max-w-48 text-lg italic font-normal">you will receive an email soon</div>
          </div>
          <div className="flex my-5 gap-5 space-around justify-center align-middle font-bold text-sm leading-4">
            <div className="w-32 flex items-center justify-center gap-2.5 cursor-pointer opacity-80 hover:opacity-100" onClick={() => setSubmitted(false)}>
              <PlusSquareIcon className="text-[2.5em]" />
              <span>Register someone else</span>
            </div>
            <div className="w-32 flex items-center justify-center gap-2.5 cursor-pointer opacity-80 hover:opacity-100">
              <ShareIcon className="text-[2.5em]" />
              <span>Invite a friend along</span>
            </div>
          </div>
        </> :
        <Form className="gap-4 flex flex-col justify-center">
          <Input label="Name" type="text" placeholder="Enter your name" variant="bordered" isRequired radius="none" />
          <Input label="Email" type="email" placeholder="Enter your email" variant="bordered" isRequired radius="none" />
          <Textarea label="Do you have any questions?" variant="bordered" isRequired radius="none" />
          <p className="text-xs text-center">By submitting you confirm you agree to receive follow up messages about this and similar events, in accordance with our privacy policy.</p>
          <Button className="w-full rounded-sm" color="primary" onClick={() => setSubmitted(true)}>
            Register
          </Button>
        </Form>}
    </>
  );
}
