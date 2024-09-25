import { useActionData } from "react-router-dom";
import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

function NewsletterPage() {
    const email = useActionData();
    console.log(email);
    
  return (
    <PageContent title="Join our awesome newsletter!">
          <NewsletterSignup email={ email} />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!", email: email };
}
