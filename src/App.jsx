import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { AllPrograms, SearchPage } from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import { About, Locate, Blog, BlogPost, Faqs, Alumni, Legal } from './pages/Info';
import { Cart, Login, Enroll } from './pages/Account';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="programs" element={<AllPrograms />} />
        <Route path="programs/:exam" element={<AllPrograms />} />
        <Route path="program/:slug" element={<ProgramDetail />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="about" element={<About />} />
        <Route path="locate" element={<Locate />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="testimonials" element={<Alumni />} />
        <Route path="legal/:slug" element={<Legal />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="enroll" element={<Enroll />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
