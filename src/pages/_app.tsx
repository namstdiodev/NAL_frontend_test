import type { AppProps } from "next/app";
import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "src/components/ListBlog/style.scss"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "src/components/Dropzone/style.scss"
import { Provider } from "react-redux";
import store from "src/app/store";

function MyApp({ Component, pageProps }: AppProps) {
  // const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
