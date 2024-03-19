import { getServerSession } from "next-auth";
import SignInForm from "./sign-in-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function SignIn({ searchParams }) {
  const { callbackUrl } = searchParams;
  const session = await getServerSession();
  if (session?.user) redirect("/");
  return (
    <div className="space-y-4 flex items-center justify-center min-h-85">
      <Card className="md:w-1/2 w-full">
        <CardHeader>
          <CardTitle className="text-center">Sign in to SMS</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm callbackUrl={callbackUrl} />
        </CardContent>
      </Card>
    </div>
  );
}
