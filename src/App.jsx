import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import { DemoModalProvider } from './components/DemoModal';
import Hero from './sections/Hero';
import ProductIntro from './sections/ProductIntro';
import ProductExplorer from './sections/ProductExplorer';
import HowItWorks from './sections/HowItWorks';
import ExplodedView from './sections/ExplodedView';
import Technology from './sections/Technology';
import Context from './sections/Context';
import Future from './sections/Future';
import Specifications from './sections/Specifications';
import FinalCTA from './sections/FinalCTA';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 400);
            return 100;
          }
          return prev + Math.random() * 8 + 2;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return <LoadingScreen progress={Math.min(progress, 100)} />;
  }

  return (
    <DemoModalProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <ProductIntro />
          <ProductExplorer />
          <HowItWorks />
          <ExplodedView />
          <Technology />
          <Context />
          <Future />
          <Specifications />
          <FinalCTA />
        </main>
      </div>
    </DemoModalProvider>
  );
}
