// import React, { Fragment, useEffect } from 'react'
// import "./style.css"
// import partner_1 from "../../assets/featured-logos/logo1.png"
// import partner_2 from "../../assets/featured-logos/logo2.png"
// import partner_3 from "../../assets/featured-logos/logo3.png"
// import partner_4 from "../../assets/featured-logos/logo4.png"
// import partner_5 from "../../assets/featured-logos/logo5.png"
// import partner_6 from "../../assets/featured-logos/logo6.png"

// const partners = [
//     {
//         logo: partner_1,
//         name : "Reddit"
//     },
//     {
//         logo: partner_2,
//         name : "ProductHunt"
//     },
//     {
//         logo: partner_3,
//         name : "BetaList"
//     },
//     {
//         logo: partner_4,
//         name : "DealFuel"
//     },
//     {
//         logo: partner_5,
//         name : "BlackHatWorld"
//     },
//     {
//         logo: partner_6,
//         name : "Quora"
//     },
// ]


// const PartnersTape = () => {


//   return (
//       <div className='partners-tape-wrapper'>
//           <div className='partners-tape-container'>
//           {[
//               ...new Array(4).fill(0).map((_, idx) => (
//                 <Fragment key={idx}>
//                   {partners.map((partner, idx) => (
//                     <div key={idx} className='partner'>
//                           <img src={partner.logo} alt={ partner.name} />
//                     </div>
//                   ))}
//                 </Fragment>
//               )),
//             ]}
//           </div>
//     </div>
//   )
// }


// export default PartnersTape

import React from "react";
import Marquee from "react-fast-marquee";
import "./style.css";

import partner_1 from "../../assets/featured-logos/logo1.png";
import partner_2 from "../../assets/featured-logos/logo2.png";
import partner_3 from "../../assets/featured-logos/logo3.png";
import partner_4 from "../../assets/featured-logos/logo4.png";
import partner_5 from "../../assets/featured-logos/logo5.png";
import partner_6 from "../../assets/featured-logos/logo6.png";

const partners = [
  { logo: partner_1, name: "Reddit" },
  { logo: partner_2, name: "ProductHunt" },
  { logo: partner_3, name: "BetaList" },
  { logo: partner_4, name: "DealFuel" },
  { logo: partner_5, name: "BlackHatWorld" },
  { logo: partner_6, name: "Quora" },
];

const PartnersTape = () => {
  return (
    <div className="partners-tape-wrapper">
      <Marquee speed={50} gradient={false} autoFill className="">
        {[...partners].map((partner, idx) => (
          <div key={idx} className="partner">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PartnersTape;
