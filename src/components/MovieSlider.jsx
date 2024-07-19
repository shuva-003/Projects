// // src/components/MovieSlider.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const MovieSlider = ({ movies }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <Slider {...settings}>
//       {movies.map((movie, index) => (
//         <div key={index}>
//           <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
//           <h3>{movie.title}</h3>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default MovieSlider;
// src/components/MovieSlider.jsx
// src/components/MovieSlider.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const MovieSlider = ({ movies }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <Slider {...settings}>
//       {movies.map((movie, index) => (
//         <div key={index}>
//           <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
//           <h3>{movie.title}</h3>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default MovieSlider;
// src/components/MovieSlider.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const MovieSlider = ({ movies }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <Slider {...settings}>
//       {movies.map((movie, index) => (
//         <div key={index}>
//           <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
//           <h3>{movie.title}</h3>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default MovieSlider;
// src/components/MovieSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieSlider = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {movies.map((movie, index) => (
        <div key={index}>
          <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default MovieSlider;




