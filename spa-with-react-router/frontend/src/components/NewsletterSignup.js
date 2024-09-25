import { useActionData, useFetcher, useNavigation } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";
import { useEffect, useRef } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

    // useRef lets get control of the element and then to rest onece you done.
  const formRef = useRef();

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
      formRef.current.reset();
    }
  }, [state, data]);

  return (
    <>
      <fetcher.Form
        action="/newsletter/"
        method="post"
        className={classes.newsletter}
        ref={formRef}
      >
        <input
          type="email"
          name="email"
          placeholder="Sign up for newsletter..."
          aria-label="Sign up for newsletter"
        />
        <button>Sign up</button>
      </fetcher.Form>
    </>
  );
}

export default NewsletterSignup;
