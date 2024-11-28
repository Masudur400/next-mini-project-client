import CreateForm from "@/components/CreactForm/CreateForm";
import ShowTasks from "@/components/ShowTasks/ShowTasks";
import Image from "next/image";

export default function Home() {
  return (
     <div>
       <CreateForm></CreateForm>
       <ShowTasks></ShowTasks>
     </div>
  );
}
