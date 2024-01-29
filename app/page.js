import CurrencyDollar from "@/components/icons/currency-dollar";
import TheUsers from "@/components/icons/user";
import UserGroup from "@/components/icons/user-group";
import PageTitle from "@/components/page-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cards = [
  {
    label: "Total Students",
    amount: "+50000",
    description: "+25% from last year",
    icon: TheUsers,
  },
  {
    label: "Total Parents",
    amount: "+60000",
    description: "+30% from last year",
    icon: UserGroup,
  },
  {
    label: "Total Teachers",
    amount: "+1500",
    description: "+10% from last year",
    icon: UserGroup,
  },
  {
    label: "Total Revenue",
    amount: "$250000",
    description: "+2000 since last month",
    icon: CurrencyDollar,
  },
];

export default function Home() {
  return (
    <div className="space-y-4">
      <PageTitle title="Dashboard" />
      <section className="grid grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <Card key={i}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{c.label}</CardTitle>
              <c.icon className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <h2 className="font-bold text-xl">{c.amount}</h2>
              <CardDescription>{c.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
