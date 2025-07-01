import React from "react";

const HomePage = () => {
  // Dữ liệu mẫu (có thể thay bằng API hoặc state management)
  const services = [
    {
      title: "Haircut Styles",
      desc: "Duis aute irure dolor in reprehenderit in volupte velit esse cillum dolore fugiat nulla.",
    },
    {
      title: "Beard Trim",
      desc: "Duis aute irure dolor in reprehenderit in volupte velit esse cillum dolore fugiat nulla.",
    },
    {
      title: "Hot Shave",
      desc: "Duis aute irure dolor in reprehenderit in volupte velit esse cillum dolore fugiat nulla.",
    },
  ];

  const pricing = [
    {
      title: "Haircut",
      price: "$20.00",
      desc: "Our stylist consults & delivers you a precision haircut.",
    },
    {
      title: "Moustache Trim",
      price: "$10.00",
      desc: "Select & Change your hair color for new experience.",
    },
    {
      title: "Beard Trim",
      price: "$15.00",
      desc: "Keep your beard clean and sharp with an awesome style.",
    },
    {
      title: "Hair Wash",
      price: "$6.00",
      desc: "Relax and have a hot towel for cleaning your face.",
    },
    {
      title: "Hair Color",
      price: "$18.00",
      desc: "Select & Change your hair color for new experience.",
    },
    {
      title: "Face Mask",
      price: "$12.00",
      desc: "Our stylist consults & delivers you a precision haircut.",
    },
    {
      title: "Men’s Facial",
      price: "$25.00",
      desc: "Relax and have a hot towel for cleaning your face.",
    },
    {
      title: "Line Up",
      price: "$13.00",
      desc: "Keep your beard clean and sharp with an awesome style.",
    },
  ];

  const testimonials = [
    {
      name: "Ryan Printz",
      quote:
        "“Proin gravida nibh vel velit auctor aliquet aenean sollidin, lorem quis bibendum auctor nisi elit.”",
    },
    {
      name: "Mark Smith",
      quote:
        "“Proin gravida nibh vel velit auctor aliquet aenean sollidin, lorem quis bibendum auctor nisi elit.”",
    },
    {
      name: "Steve Martin",
      quote:
        "“Proin gravida nibh vel velit auctor aliquet aenean sollidin, lorem quis bibendum auctor nisi elit.”",
    },
    {
      name: "Smith Printz",
      quote:
        "“Proin gravida nibh vel velit auctor aliquet aenean sollidin, lorem quis bibendum auctor nisi elit.”",
    },
  ];

  const blogPosts = [
    {
      date: "Oct 20, 2017",
      category: "barbers",
      title: "Foil shaver versus clippers & trimmers",
      desc: "Are you a dedicated razor shaver? dude who hasn't really thought about trying a different..",
    },
    {
      date: "Oct 15, 2017",
      category: "Styles",
      title: "Men’s hairstyles for all face shapes",
      desc: "Most of the time, men don't know the haircuts that suit their face shape - but don't worry, we're here to..",
    },
    {
      date: "Oct 25, 2017",
      category: "Haircut",
      title: "Basic tips for styling men’s hair",
      desc: "The first tip is to choose a hairstyle that’s realistic for your lifestyle, hair type, and general image..",
    },
  ];

  const workingHours = [
    { day: "Sun", time: "10.00 am - 5.00 am" },
    { day: "Mon", time: "9.00 am - 4.30 am" },
    { day: "Tue", time: "10.00 am - 5.30 am" },
    { day: "Wed", time: "9.30 am - 4.00 am" },
    { day: "Thu", time: "10.00 am - 5.00 am" },
    { day: "Fri", time: "9.00 am - 4.30 am" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-gray-600 text-sm">
            <span>Mon - Fri 9.00 : 17.00</span> | <span>(04) 491 570 110</span>
          </div>
          <div className="text-gray-600 text-sm">
            <span>
              <a href="#" className="hover:text-blue-500">
                Login
              </a>{" "}
              /{" "}
              <a href="#" className="hover:text-blue-500">
                Register
              </a>
            </span>
            <span className="ml-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 ml-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 ml-2">
                <i className="fab fa-google-plus"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 ml-2">
                <i className="fab fa-instagram"></i>
              </a>
            </span>
          </div>
        </div>
        <nav className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <button className="md:hidden text-gray-600 focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <a href="#" className="ml-4">
                <img src="/logo-light.png" alt="Hairy Logo" className="h-10" />
              </a>
            </div>
            <div className="hidden md:flex space-x-6">
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-500">
                  Home
                </a>
                <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Homepage 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Homepage 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Homepage 3
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Landing
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-500">
                  Pages
                </a>
                <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Book Online
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Our Staff
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Our Services
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    404
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-500">
                  Elements
                </a>
                <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Buttons
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Grid System
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Typography
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Forms
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Heading
                  </a>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Gallery
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Blog
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Shop
              </a>
            </div>
            <div className="flex space-x-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
                Book Online
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Slider */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/slide-bg-1.jpg)" }}
        ></div>
        <div className="relative h-full flex items-center text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              We Will Make You Stylish
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Preparing your money is a daunting challenge for today's investors
              and will give you a complete account of the system.
            </p>
            <a
              href="#"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
            >
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What We Do?</h2>
            <p className="text-gray-600 mt-2">
              Duis aute irure dolor in reprehenderit volupte velit esse cillum
              dolore eu fugiat pariatursint occaecat cupidatat non proident
              culpa.
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-md"
              >
                <img
                  src={`/service-${index + 4}.png`}
                  alt={service.title}
                  className="h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section
        className="py-16 bg-gray-800 text-white bg-cover bg-center"
        style={{ backgroundImage: "url(/background-2.jpg)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Working Hours</h2>
            <p className="text-gray-300 mt-2">
              Duis aute irure dolor in reprehenderit volupte velit esse cillum
              dolore eu fugiat pariatursint occaecat cupidatat non proident
              culpa.
            </p>
            <div className="w-16 h-1 bg-white mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {workingHours.map((hour, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-700/50 rounded-lg"
              >
                <h3 className="text-lg font-semibold">{hour.day}</h3>
                <ul className="text-sm space-y-1">
                  <li>{hour.time.split(" - ")[0]}</li>
                  <li>to</li>
                  <li>{hour.time.split(" - ")[1]}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Pricing</h2>
            <p className="text-gray-600 mt-2">
              Duis aute irure dolor in reprehenderit volupte velit esse cillum
              dolore eu fugiat pariatursint occaecat cupidatat non proident
              culpa.
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="w-16 h-1 bg-gray-300 mx-auto mb-4"></div>
                <span className="text-2xl font-bold text-blue-500">
                  {item.price}
                </span>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 bg-gray-800 bg-cover bg-center"
        style={{ backgroundImage: "url(/testimonial-bg-1.jpg)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Clients Say</h2>
            <p className="text-gray-300 mt-2">
              Duis aute irure dolor in reprehenderit volupte velit esse cillum
              dolore eu fugiat pariatursint occaecat cupidatat non proident
              culpa.
            </p>
            <div className="w-16 h-1 bg-white mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-700/50 rounded-lg"
              >
                <img
                  src={`/testimonial-${index + 1}.png`}
                  alt={testimonial.name}
                  className="h-16 mx-auto mb-4 rounded-full"
                />
                <p className="text-gray-300 italic mb-2">{testimonial.quote}</p>
                <h4 className="text-lg font-semibold text-white">
                  {testimonial.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Blog Posts</h2>
            <p className="text-gray-600 mt-2">
              Duis aute irure dolor in reprehenderit volupte velit esse cillum
              dolore eu fugiat pariatursint occaecat cupidatat non proident
              culpa.
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`/blog-${index + 1}.jpg`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-gray-500">
                    <span>{post.date}</span> |{" "}
                    <span className="text-blue-500">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                  <p className="text-gray-600 mt-2">{post.desc}</p>
                  <a href="#" className="text-blue-500 mt-2 inline-block">
                    read more <i className="fas fa-angle-double-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300"
            >
              View More
            </a>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 gap-8">
            <img src="/client-1.png" alt="Client 1" className="mx-auto" />
            <img src="/client-2.png" alt="Client 2" className="mx-auto" />
            <img src="/client-3.png" alt="Client 3" className="mx-auto" />
            <img src="/client-4.png" alt="Client 4" className="mx-auto" />
            <img src="/client-5.png" alt="Client 5" className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/logo-light.png" alt="Logo" className="h-12 mb-4" />
              <p className="text-gray-400">
                Proin gravida nibh vel velit auctor aliquet anean lorem quis.
                bindum auctor, nisi elite conset ipsums sagtis id duis sed odio
                sit.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  Monday - Friday{" "}
                  <span className="text-gray-300">9.00 : 17.00</span>
                </li>
                <li>
                  Saturday <span className="text-gray-300">9.00 : 15.00</span>
                </li>
                <li>
                  Sunday <span className="text-gray-300">9.00 : 13.00</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Latest Posts</h5>
              <div className="space-y-4">
                <div>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Essential barbering tips you need to know before you start
                  </a>
                  <p className="text-sm text-gray-500">Nov 09, 2017</p>
                </div>
                <div>
                  <a href="#" className="text-gray-300 hover:text-white">
                    What are the 360 waves? and how you can get them
                  </a>
                  <p className="text-sm text-gray-500">Oct 30, 2017</p>
                </div>
                <div>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Discover what is the best haircut for your face shape?
                  </a>
                  <p className="text-sm text-gray-500">Oct 19, 2017</p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Get In Touch</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 1220 Petersham town,
                  Wardll St New South Wales Australia PA 6550.
                </li>
                <li>
                  <i className="fas fa-phone"></i> (04) 491 570 110
                </li>
                <li>
                  <i className="fas fa-envelope"></i>{" "}
                  <a href="#" className="text-gray-300 hover:text-white">
                    example@email.com
                  </a>
                </li>
              </ul>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-2 rounded-l-md border-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="text-gray-400">© 2017, All rights reserved.</span>
            <div className="mt-2">
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
