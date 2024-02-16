import { notFound } from "next/navigation";
import { getCourses } from "./actions";
import TheCourses from "./courses";

export const metadata = {
  title: "Courses By Category",
  description: "Courses by a department category",
};

export default async function TheCategories({ params, searchParams }) {
  const id = Number(params.id);
  let { cat } = searchParams;
  if (!id) notFound();
  const { categories, courses, catId } = await getCourses(id, cat);
  const category = categories.find((c) => c.id === catId) ?? {};
  return (
    <div className="space-y-6">
      <TheCourses
        categories={categories}
        courses={courses}
        catId={catId}
        category={category}
      />
    </div>
  );
}
