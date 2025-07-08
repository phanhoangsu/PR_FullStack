// import React from "react";
// import "../../css/style.css";
// import blog1 from "../../assets/blog/1.jpg";
// import blog2 from "../../assets/blog/2.jpg";
// import blog3 from "../../assets/blog/3.jpg";

// const blogPosts = [
//   {
//     id: 1,
//     title: "We teach you the modern barber tech",
//     date: "June 27, 2016",
//     update: "September 23, 2016",
//     author: "admin",
//     excerpt:
//       "Shabby chic try-hard kombucha intelligentsia, typewriter microdosing +1 iPhone ennui farm-to-table dreamcatcher authentic...",
//     categories: ["hair", "barbershop"],
//     comments: "2 Comments",
//     image: blog1,
//   },
//   {
//     id: 2,
//     title: "Facial hair care and trimming at home",
//     date: "June 27, 2016",
//     update: "September 23, 2016",
//     author: "admin",
//     excerpt:
//       "Williamsburg keytar +1, taxidermy dreamcatcher scenester chillwave aesthetic meditation cardigan godard...",
//     categories: ["barbershop"],
//     comments: "Leave a comment",
//     image: blog2,
//   },
//   {
//     id: 3,
//     title: "Meet & Greet: the best barber in town",
//     date: "June 27, 2016",
//     update: "September 23, 2016",
//     author: "admin",
//     excerpt:
//       "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud...",
//     categories: ["Entertainment", "barbershop"],
//     tags: ["Lifestyle", "hair"],
//     comments: "1 Comment",
//     image: blog3,
//   },
//   {
//     id: 4,
//     title: "How to start your own barbershop",
//     date: "June 27, 2016",
//     update: "September 23, 2016",
//     author: "admin",
//     excerpt:
//       "8-bit asymmetrical wolf, squid street art vinyl tofu shoreditch iPhone shabby chic...",
//     categories: ["Lifestyle"],
//     comments: "Leave a comment",
//     image: null,
//   },
// ];

// const BlogSection = () => {
//   return (
//     <div className="container py-16">
//       <div className="row">
//         {/* Blog content */}
//         <div className="col-sm-8">
//           <main id="main" className="site-main">
//             <header>
//               <h1 className="page-title screen-reader-text">Blog</h1>
//             </header>

//             {/* Post Loop */}
//             {blogPosts.map((post) => (
//               <article key={post.id} className="post mb-8">
//                 <div className="post-element">
//                   {post.image && (
//                     <div className="post-featured-image mb-3">
//                       <a href="#">
//                         <img src={post.image} alt={post.title} />
//                       </a>
//                     </div>
//                   )}

//                   <div className="post-content">
//                     <header className="entry-header">
//                       <div className="entry-meta mb-2 text-sm text-gray-500">
//                         <span className="entry-meta-content">
//                           <span className="posted-on">
//                             Posted on{" "}
//                             <a href="#" rel="bookmark">
//                               <time dateTime={post.date}>{post.date}</time>
//                               <time dateTime={post.update}>
//                                 {" "}
//                                 – {post.update}
//                               </time>
//                             </a>
//                           </span>{" "}
//                           <span className="byline">
//                             by <a href="#">{post.author}</a>
//                           </span>
//                         </span>
//                       </div>
//                       <h2 className="entry-title text-xl font-semibold mb-2">
//                         <a href="#">{post.title}</a>
//                       </h2>
//                     </header>

//                     <div className="entry-content">
//                       <p>{post.excerpt}</p>
//                       <div className="entry-btn-wrapper mt-3">
//                         <a
//                           href="#"
//                           className="primary-btn with-bg px-4 py-2 text-white bg-black inline-block rounded"
//                         >
//                           See More
//                         </a>
//                       </div>
//                     </div>

//                     <footer className="entry-footer mt-4 text-sm text-gray-500">
//                       {post.categories && (
//                         <span className="cat-links mr-4">
//                           {post.categories.map((cat, idx) => (
//                             <a href="#" key={idx} className="mr-1">
//                               {cat}
//                             </a>
//                           ))}
//                         </span>
//                       )}
//                       {post.tags && (
//                         <span className="tags-links mr-4">
//                           {post.tags.map((tag, idx) => (
//                             <a href="#" key={idx} className="mr-1">
//                               {tag}
//                             </a>
//                           ))}
//                         </span>
//                       )}
//                       <span className="comments-link">
//                         <a href="#">{post.comments}</a>
//                       </span>
//                     </footer>
//                   </div>
//                 </div>
//               </article>
//             ))}

//             {/* Quote */}
//             <div className="post-element post-element-quote my-10 p-6 bg-gray-100 rounded">
//               <blockquote>
//                 <p className="text-lg italic">
//                   “It always seems impossible until it’s done.”
//                 </p>
//                 <footer className="quote-author text-right mt-2 font-medium">
//                   — Nelson Mandela
//                 </footer>
//               </blockquote>
//             </div>

//             {/* Video */}
//             <article className="post-element post-element-video mb-10">
//               <div className="post-featured-image mb-3">
//                 <iframe
//                   width="100%"
//                   height="400"
//                   src="https://www.youtube.com/embed/_Zbj_W_qTIY"
//                   title="Video Post Format Example"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <div className="post-content">
//                 <header className="entry-header mb-2">
//                   <h2 className="entry-title text-xl font-semibold">
//                     <a href="#">Video Post Format Example</a>
//                   </h2>
//                 </header>
//                 <div className="entry-content">
//                   <p>
//                     Cornhole meh lumbersexual williamsburg. Gluten-free
//                     chicharrones sustainable, artisan tofu mustache...
//                   </p>
//                   <a
//                     href="#"
//                     className="primary-btn with-bg px-4 py-2 text-white bg-black inline-block rounded mt-3"
//                   >
//                     See More
//                   </a>
//                 </div>
//                 <footer className="entry-footer text-sm mt-2 text-gray-500">
//                   <span className="cat-links mr-4">
//                     <a href="#">video</a>
//                   </span>
//                   <span className="comments-link">
//                     <a href="#">Leave a comment</a>
//                   </span>
//                 </footer>
//               </div>
//             </article>

//             {/* Pagination */}
//             <nav className="navigation posts-navigation mt-10">
//               <div className="nav-links">
//                 <div className="nav-previous">
//                   <a href="#">Older posts</a>
//                 </div>
//               </div>
//             </nav>
//           </main>
//         </div>

//         {/* Sidebar */}
//         <div className="col-sm-4">
//           <aside id="secondary" className="widget-area sidebar-area">
//             {/* Search */}
//             <div id="search-2" className="widget widget_search mb-4">
//               <form
//                 role="search"
//                 method="get"
//                 className="search-form"
//                 action="#"
//               >
//                 <label>
//                   <span className="screen-reader-text">Search for:</span>
//                   <input
//                     type="search"
//                     className="search-field"
//                     placeholder="Search …"
//                     name="s"
//                   />
//                 </label>
//                 <input type="submit" className="search-submit" value="Search" />
//               </form>
//             </div>

//             {/* Recent Posts */}
//             <section className="widget widget_recent_entries mb-4">
//               <h2 className="widget-title">Recent Posts</h2>
//               <ul>
//                 <li>
//                   <a href="#">
//                     Getting nervous each day, can’t wait for the big day
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">He popped the question</a>
//                 </li>
//                 <li>
//                   <a href="#">Big day is almost here</a>
//                 </li>
//                 <li>
//                   <a href="#">Planning our trip</a>
//                 </li>
//                 <li>
//                   <a href="#">Post Format: Quote</a>
//                 </li>
//               </ul>
//             </section>

//             {/* Recent Comments */}
//             <section className="widget widget_recent_comments mb-4">
//               <h2 className="widget-title">Recent Comments</h2>
//               <ul>
//                 <li>
//                   <strong>
//                     <a href="#">James Flavor</a>
//                   </strong>{" "}
//                   on <a href="#">He made the first step!</a>
//                 </li>
//                 <li>
//                   <strong>
//                     <a href="#">John Linconl</a>
//                   </strong>{" "}
//                   on <a href="#">Planning our trip</a>
//                 </li>
//                 <li>
//                   <strong>Anna Jofren</strong> on{" "}
//                   <a href="#">Getting nervous each day...</a>
//                 </li>
//                 <li>
//                   <strong>
//                     <a href="#">Laura Otelo</a>
//                   </strong>{" "}
//                   on <a href="#">Getting nervous each day...</a>
//                 </li>
//               </ul>
//             </section>

//             {/* Archives */}
//             <section className="widget widget_archive mb-4">
//               <h2 className="widget-title">Archives</h2>
//               <ul>
//                 <li>
//                   <a href="#">June 2016</a>
//                 </li>
//               </ul>
//             </section>

//             {/* Categories */}
//             <section className="widget widget_categories mb-4">
//               <h2 className="widget-title">Categories</h2>
//               <ul>
//                 <li>
//                   <a href="#">Entertainment</a>
//                 </li>
//                 <li>
//                   <a href="#">Lifestyle</a>
//                 </li>
//                 <li>
//                   <a href="#">Video</a>
//                 </li>
//                 <li>
//                   <a href="#">Photos</a>
//                 </li>
//                 <li>
//                   <a href="#">Quotes</a>
//                 </li>
//                 <li>
//                   <a href="#">Hair</a>
//                 </li>
//                 <li>
//                   <a href="#">Uncategorized</a>
//                 </li>
//                 <li>
//                   <a href="#">Barbershop</a>
//                 </li>
//               </ul>
//             </section>

//             {/* Meta */}
//             <section className="widget widget_meta">
//               <h2 className="widget-title">Meta</h2>
//               <ul>
//                 <li>
//                   <a href="#">Log in</a>
//                 </li>
//                 <li>
//                   <a href="#">Entries RSS</a>
//                 </li>
//                 <li>
//                   <a href="#">Comments RSS</a>
//                 </li>
//                 <li>
//                   <a href="#">WordPress.org</a>
//                 </li>
//               </ul>
//             </section>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogSection;

import React, { useState } from "react";
import "../../css/style.css";
import blog1 from "../../assets/blog/1.jpg";
import blog2 from "../../assets/blog/2.jpg";
import blog3 from "../../assets/blog/3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "We teach you the modern barber tech",
    date: "June 27, 2016",
    update: "September 23, 2016",
    author: "admin",
    excerpt:
      "Shabby chic try-hard kombucha intelligentsia, typewriter microdosing +1 iPhone ennui farm-to-table dreamcatcher authentic...",
    categories: ["hair", "barbershop"],
    comments: "2 Comments",
    image: blog1,
  },
  {
    id: 2,
    title: "Facial hair care and trimming at home",
    date: "June 27, 2016",
    update: "September 23, 2016",
    author: "admin",
    excerpt:
      "Williamsburg keytar +1, taxidermy dreamcatcher scenester chillwave aesthetic meditation cardigan godard...",
    categories: ["barbershop"],
    comments: "Leave a comment",
    image: blog2,
  },
  {
    id: 3,
    title: "Meet & Greet: the best barber in town",
    date: "June 27, 2016",
    update: "September 23, 2016",
    author: "admin",
    excerpt:
      "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud...",
    categories: ["Entertainment", "barbershop"],
    tags: ["Lifestyle", "hair"],
    comments: "1 Comment",
    image: blog3,
  },
  {
    id: 4,
    title: "How to start your own barbershop",
    date: "June 27, 2016",
    update: "September 23, 2016",
    author: "admin",
    excerpt:
      "8-bit asymmetrical wolf, squid street art vinyl tofu shoreditch iPhone shabby chic...",
    categories: ["Lifestyle"],
    comments: "Leave a comment",
    image: null,
  },
];

const BlogSection = () => {
  const galleryImages = blogPosts
    .map((post) => post.image)
    .filter((img) => img !== null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="container py-16">
      <div className="row">
        <div className="col-sm-8">
          <main id="main" className="site-main">
            <header>
              <h1 className="page-title screen-reader-text">Blog</h1>
            </header>

            {blogPosts.map((post, idx) => (
              <article key={post.id} className="post mb-8">
                <div className="post-element">
                  {post.image && (
                    <div
                      className="post-featured-image mb-3 cursor-pointer"
                      onClick={() =>
                        openLightbox(galleryImages.indexOf(post.image))
                      }
                    >
                      <img src={post.image} alt={post.title} />
                    </div>
                  )}

                  <div className="post-content">
                    <header className="entry-header">
                      <div className="entry-meta mb-2 text-sm text-gray-500">
                        <span className="entry-meta-content">
                          <span className="posted-on">
                            Posted on{" "}
                            <a href="#" rel="bookmark">
                              <time dateTime={post.date}>{post.date}</time>
                              <time dateTime={post.update}>
                                {" "}
                                – {post.update}
                              </time>
                            </a>
                          </span>{" "}
                          <span className="byline">
                            by <a href="#">{post.author}</a>
                          </span>
                        </span>
                      </div>
                      <h2 className="entry-title text-xl font-semibold mb-2">
                        <a href="#">{post.title}</a>
                      </h2>
                    </header>

                    <div className="entry-content">
                      <p>{post.excerpt}</p>
                      <div className="entry-btn-wrapper mt-3">
                        <a
                          href="#"
                          className="primary-btn with-bg px-4 py-2 text-white bg-black inline-block rounded"
                        >
                          See More
                        </a>
                      </div>
                    </div>

                    <footer className="entry-footer mt-4 text-sm text-gray-500">
                      {post.categories && (
                        <span className="cat-links mr-4">
                          {post.categories.map((cat, idx) => (
                            <a href="#" key={idx} className="mr-1">
                              {cat}
                            </a>
                          ))}
                        </span>
                      )}
                      {post.tags && (
                        <span className="tags-links mr-4">
                          {post.tags.map((tag, idx) => (
                            <a href="#" key={idx} className="mr-1">
                              {tag}
                            </a>
                          ))}
                        </span>
                      )}
                      <span className="comments-link">
                        <a href="#">{post.comments}</a>
                      </span>
                    </footer>
                  </div>
                </div>
              </article>
            ))}

            <div className="post-element post-element-quote my-10 p-6 bg-gray-100 rounded">
              <blockquote>
                <p className="text-lg italic">
                  “It always seems impossible until it’s done.”
                </p>
                <footer className="quote-author text-right mt-2 font-medium">
                  — Nelson Mandela
                </footer>
              </blockquote>
            </div>

            <article className="post-element post-element-video mb-10">
              <div className="post-featured-image mb-3">
                <iframe
                  width="100%"
                  height="400"
                  //   src="https://www.youtube.com/embed/_Zbj_W_qTIY"
                  src="https://www.youtube.com/embed/CJrPBAcaiMI
"
                  title="Video Post Format Example"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="post-content">
                <header className="entry-header mb-2">
                  <h2 className="entry-title text-xl font-semibold">
                    <a href="#">Video Post Format Example</a>
                  </h2>
                </header>
                <div className="entry-content">
                  <p>
                    Cornhole meh lumbersexual williamsburg. Gluten-free
                    chicharrones sustainable, artisan tofu mustache...
                  </p>
                  <a
                    href="#"
                    className="primary-btn with-bg px-4 py-2 text-white bg-black inline-block rounded mt-3"
                  >
                    See More
                  </a>
                </div>
                <footer className="entry-footer text-sm mt-2 text-gray-500">
                  <span className="cat-links mr-4">
                    <a href="#">video</a>
                  </span>
                  <span className="comments-link">
                    <a href="#">Leave a comment</a>
                  </span>
                </footer>
              </div>
            </article>

            <nav className="navigation posts-navigation mt-10">
              <div className="nav-links">
                <div className="nav-previous">
                  <a href="#">Older posts</a>
                </div>
              </div>
            </nav>
          </main>
        </div>

        {/* Sidebar */}
        <div className="col-sm-4">
          <aside id="secondary" className="widget-area sidebar-area">
            {/* Search */}
            <div id="search-2" className="widget widget_search mb-4">
              <form
                role="search"
                method="get"
                className="search-form"
                action="#"
              >
                <label>
                  <span className="screen-reader-text">Search for:</span>
                  <input
                    type="search"
                    className="search-field"
                    placeholder="Search …"
                    name="s"
                  />
                </label>
                <input type="submit" className="search-submit" value="Search" />
              </form>
            </div>

            {/* Recent Posts */}
            <section className="widget widget_recent_entries mb-4">
              <h2 className="widget-title">Recent Posts</h2>
              <ul>
                <li>
                  <a href="#">
                    Getting nervous each day, can’t wait for the big day
                  </a>
                </li>
                <li>
                  <a href="#">He popped the question</a>
                </li>
                <li>
                  <a href="#">Big day is almost here</a>
                </li>
                <li>
                  <a href="#">Planning our trip</a>
                </li>
                <li>
                  <a href="#">Post Format: Quote</a>
                </li>
              </ul>
            </section>

            {/* Recent Comments */}
            <section className="widget widget_recent_comments mb-4">
              <h2 className="widget-title">Recent Comments</h2>
              <ul>
                <li>
                  <strong>
                    <a href="#">James Flavor</a>
                  </strong>{" "}
                  on <a href="#">He made the first step!</a>
                </li>
                <li>
                  <strong>
                    <a href="#">John Linconl</a>
                  </strong>{" "}
                  on <a href="#">Planning our trip</a>
                </li>
                <li>
                  <strong>Anna Jofren</strong> on{" "}
                  <a href="#">Getting nervous each day...</a>
                </li>
                <li>
                  <strong>
                    <a href="#">Laura Otelo</a>
                  </strong>{" "}
                  on <a href="#">Getting nervous each day...</a>
                </li>
              </ul>
            </section>

            {/* Archives */}
            <section className="widget widget_archive mb-4">
              <h2 className="widget-title">Archives</h2>
              <ul>
                <li>
                  <a href="#">June 2016</a>
                </li>
              </ul>
            </section>

            {/* Categories */}
            <section className="widget widget_categories mb-4">
              <h2 className="widget-title">Categories</h2>
              <ul>
                <li>
                  <a href="#">Entertainment</a>
                </li>
                <li>
                  <a href="#">Lifestyle</a>
                </li>
                <li>
                  <a href="#">Video</a>
                </li>
                <li>
                  <a href="#">Photos</a>
                </li>
                <li>
                  <a href="#">Quotes</a>
                </li>
                <li>
                  <a href="#">Hair</a>
                </li>
                <li>
                  <a href="#">Uncategorized</a>
                </li>
                <li>
                  <a href="#">Barbershop</a>
                </li>
              </ul>
            </section>

            {/* Meta */}
            <section className="widget widget_meta">
              <h2 className="widget-title">Meta</h2>
              <ul>
                <li>
                  <a href="/login">Log in</a>
                </li>
                <li>
                  <a href="#">Entries RSS</a>
                </li>
                <li>
                  <a href="#">Comments RSS</a>
                </li>
                <li>
                  <a href="#">WordPress.org</a>
                </li>
              </ul>
            </section>
          </aside>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="lightbox-overlay fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div
              className="lightbox-content relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentIndex]}
                alt="Gallery"
                className="lightbox-image w-full rounded shadow-lg"
              />
              <button
                className="lightbox-close absolute top-2 right-4 text-white text-4xl"
                onClick={closeLightbox}
              >
                &times;
              </button>
              <button
                className="lightbox-prev absolute top-1/2 left-4 text-white text-3xl"
                onClick={prevImage}
              >
                &#10094;
              </button>
              <button
                className="lightbox-next absolute top-1/2 right-4 text-white text-3xl"
                onClick={nextImage}
              >
                &#10095;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
