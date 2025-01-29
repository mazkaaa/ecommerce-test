import { MainContentPage, Navbar } from './components/container';
import { ProductProvider } from './components/context/product-provider';
import { ThemeProvider } from './components/context/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='theme'>
      <ProductProvider>
        <Navbar />
        <MainContentPage />
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
