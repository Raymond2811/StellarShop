const computers = [
  {
    name: 'Apple - MacBook Pro 14" Laptop - 512GB SSD - Space Black',
    description: 'The 14-inch MacBook Pro blasts forward with M3 Pro and M3 Max, radically advanced chips that drive even greater performance for more demanding workflows. With industry-leading battery life—up to 18 hours—and a beautiful Liquid Retina XDR display, it’s a pro laptop without equal. Now in a new color: Space Black.',
    image: '/assets/images/Apple-MacBookPro14.jpeg',
    price: 1600.00,
    quantity: 100,
    category: 'Computers',
  },
  {
    name: 'Apple - MacBook Air 13.6" Laptop - 256GB SSD - Midnight',
    description:'Supercharged by the next-generation M2 chip, the redesigned MacBook Air combines incredible performance and up to 18 hours of battery life into its strikingly thin aluminum enclosure.¹',
    image: '/assets/images/Apple-MacBookAir-13.6.jpeg',
    price: 599.00,
    quantity: 100,
    category: 'Computers',
  },
  {
    name:'Apple - MacBook Air 15" Laptop - 512GB SSD - Midnight',
    description:'The M3 chip brings even greater capabilities to the superportable 15-inch MacBook Air. With up to 18 hours of battery life, you can take it anywhere and blaze through work and play. ',
    image:'/assets/images/Apple-MacBookAir-15.jpeg',
    price:1699.00,
    quantity:100,
    category:'Computers',
  },
  {
    name:'Apple - MacBook Pro 16" Laptop - 1TB SSD - Silver',
    description:'The 16-inch MacBook Pro blasts forward with M3 Pro and M3 Max, radically advanced chips that bring massive performance and capabilities for the most extreme workflows. With industry-leading battery life—up to 22 hours—and a beautiful Liquid Retina XDR display, it’s a pro laptop without equal.',
    image:'/assets/images/Apple-MacBookPro16.jpeg',
    price:3499.00,
    quantity:100,
    category:'Computers',
  },
  {
    name:'Acer - KA242Y Ebi 23.8” Full HD IPS Monitor - AMD FreeSync - 100Hz Refresh Rate - 1 x HDMI 1.4 & 1 - Black',
    description:"In competitive gaming, every frame matters. Introducing Acer's KA242Y gaming monitor - the Full HD resolution monitor that can keep up with your game play. Through AMD FreeSync technology, the game’s frame rate is determined by your graphics card, not the fixed refresh rate of the monitor, giving you a serious competitive edge. Plus, users can enjoy comfortable viewing experience while gaming via flicker-less and low dimming display. The design saves space on your desk and lets you place multiple monitors side by side to build a seamless big-screen display. ",
    image:'/assets/images/Acer-KA242Y.jpeg',
    price:69.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'LG - UltraGear 27” Nano IPS QHD 1-ms G-SYNC Compatible Monitor with HDR - Black',
    description:"The pinnacle of gaming monitors. Complete your battle station with a premium LG UltraGear Gaming Monitor. Built for gamers, it delivers the latest hardware, specs, ergonomics, sleek design and sensory experience. With gaming-focused features like NVIDIA G-SYNC compatibility, 1ms GTG response times, pro-level customization and fast, vivid Nano IPS panels, you're sure to gain an added edge. ",
    image:'/assets/images/LG-UltraGear.jpeg',
    price:229.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'Samsung - Odyssey G3 24" LED FreeSync Premium 165Hz 1ms Gaming Monitor - Black',
    description:'Performance oriented gamers require a monitor that can keep up. With up to 165hz refresh rates, extreme 1ms MPRT response times and full Freesync Premium support, you can be sure that the G32A has the performance to keep up with your skill.',
    image:'/assets/images/Samsung-Odyssey.jpeg',
    price:119.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'Acer - Nitro XF243Y 23.8" Full HD IPS LCD 180Hz FreeSync Monitor (HDMI, DP) - Black',
    description:"In competitive gaming, every frame matters. Introducing Acer's XF243Y gaming monitor - the Full HD (1920 x 1080) resolution monitor that can keep up with your game play. Through AMD FreeSync Premium technology, the game’s frame rate is determined by your graphics card, not the fixed refresh rate of the monitor, giving you a serious competitive edge. Plus, users can enjoy comfortable viewing experience while gaming via flicker-less, low dimming and ComfyView display. The design saves space on your desk and lets you place multiple monitors side by side to build a seamless big-screen display. ",
    image:'/assets/images/Acer-Nitro.jpeg',
    price:129.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'Alienware - Aurora R16 – Intel Core i7 14700KF – NVIDIA GeForce RTX 4070 - 32GB Memory – 1TB SDD - Black',
    description:'Designed to prioritize airflow efficiency by introducing larger passageways and optimized internal cable management. This allows fans to be more productive at lower RPM, resulting in quieter acoustics. ',
    image:'/assets/images/Alienware-Aurora.jpeg',
    price:1799.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'CyberPowerPC - Gamer Master Gaming Desktop - AMD Ryzen 5 5500 - 16GB Memory - AMD Radeon RX 6500 XT 4GB - 1TB SSD - Black',
    description:'Dominate virtual battlefields with this CyberPowerPC Gamer Master gaming desktop computer. The six-core AMD Ryzen 5 processor and 16GB of RAM support seamless multitasking, and the 1TB SSD provides fast start-ups and in-game load times. This CyberPowerPC Gamer Master gaming desktop computer comes with an AMD Radeon RX 6500 XT graphics card for immersive, stutter-free action. ',
    image:'/assets/images/CyberPowerPC-Ryzen5.jpeg',
    price: 699.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'iBUYPOWER - Slate 8 MESH Gaming Desktop PC - Intel Core i7 14700F - NVIDIA GeForce RTX 4060 8GB - 32GB DDR5 RAM - 1TB NVMe - Black',
    description:'Level up your setup with the iBUYPOWER SMI7N4601, the perfect gaming PC build for someone looking to upgrade their computer system for art, editing, and gaming. This prebuild utilizes professionally vetted components to create a high-performing machine that lets you do everything from streaming, creating content, and rendering videos to playing your favorite games at a higher FPS. You can take your gaming and content creation to a whole new level with the Intel Core i7 14700F and the NVIDIA GeForce RTX 4060 8GB. ',
    image:'/assets/images/iBUYPOWER-Slate.jpeg',
    price:1049.99,
    quantity:100,
    category:'Computers',
  },
  {
    name:'CyberPowerPC - Supreme Gaming Desktop - AMD Ryzen 7 7800X3D - 32GB Memory - NVIDIA GeForce RTX 4070 12GB - 2TB SSD - White',
    description:'CyberPowerPC - Gamer Supreme Gaming Desktop - AMD Ryzen 7 7800X3D - 32GB Memory - NVIDIA GeForce RTX 4070 SUPER 12GB - 2TB SSD - White',
    image:'/assets/images/CyberPowerPC-Ryzen7.jpeg',
    price:1699.99,
    quantity:100,
    category:'Computers',
  },
];

module.exports = computers;