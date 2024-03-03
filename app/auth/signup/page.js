import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./sign-up-form";

export default function SignUp() {
  return (
    <div className="space-y-4 flex items-center justify-center min-h-85">
      <Card className="w-full xl:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">User Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
