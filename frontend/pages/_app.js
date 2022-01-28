import '../styles/globals.css'
import { QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { client } from '../utils/client-react-query';
import { Provider } from "react-redux";
import store from "../redux/store";
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <SnackbarProvider maxSnack={3}>
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
