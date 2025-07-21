// src/App.jsx
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { SidebarVariant1 } from './components/sidebar/variant1';
// import { Card } from './Card';

import CardVariant1 from './components/card/Variant1';

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const images = [
    "https://a0.muscache.com/im/pictures/monet/Luxury-43353638/original/603bb794-bdfe-49ae-bf8a-9765e0307b0b",
    "https://a0.muscache.com/im/pictures/0f1d3850-0c9a-4930-86b2-4467619714f5.jpg?im_w=1920",
    "https://images.squarespace-cdn.com/content/v1/524f25dde4b0b1071ff2235d/9aac49b2-b7e4-49d3-a1b4-ec309e116b6b/cozy-tropical-cottage-mal-pais-airbnb.jpg",
  ];

  const title = "Iceland Cabin";
  const description = "Cozy cabin nestled in Iceland's breathtaking landscape, offering stunning views of mountains and Northern Lights.";
  const price = "680";
  const tags = ["Top Rated", "5 Day stay"];


  return (
    <div className="md:p-8 min-h-screen">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" fixed top-4 right-4 z-50 bg-black/90 p-2 rounded-md"
      >
        <Menu size={24} />
      </button>

      <SidebarVariant1 isOpen={isOpen} setIsOpen={setIsOpen} />
{/* TEST1 */}
      {/* You can add your main content here */}
      <main className="md:ml-[320px] transition-all grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 duration-300 p-8">
  <CardVariant1 images={images} title={title} description={description} price={price} tags={tags} />
 </main>

    </div>
  );
}