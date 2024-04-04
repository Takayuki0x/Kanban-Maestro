import { useRouteError } from "react-router-dom";

/**
 * ErrorPage component displays an error message when an unexpected error occurs.
 * @returns {JSX.Element} The rendered ErrorPage component.
*/

export default function ErrorPage(){
    const error = useRouteError();
    console.error(error);

    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
}
