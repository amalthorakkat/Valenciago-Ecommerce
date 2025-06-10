import React from 'react'
import Cloth1 from "../assets/clothes/1.png";
import Cloth2 from "../assets/clothes/2.png";
import Cloth3 from "../assets/clothes/3.png";
import Cloth4 from "../assets/clothes/4.png";
import Cloth7 from "../assets/clothes/7.png";

const BannerHero = () => {
  return (
    <div>
          {/* banner */}
              <div className="grid grid-cols-10 grid-rows-4 gap-4 rounded-[15px] overflow-hidden ">
                <div className=" relative col-span-2 row-span-3 h-[400px] overflow-hidden">
                  <img
                    src={Cloth1}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                    alt=""
                  />
                </div>
                <div className="col-span-2 row-span-3 col-start-3 row-start-2 h-[400px] overflow-hidden ">
                  <img
                    src={Cloth2}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                    alt=""
                  />
                </div>
                <div className="col-span-2 row-span-3 col-start-5 row-start-1 h-[400px] overflow-hidden  ">
                  <img
                    src={Cloth3}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                    alt=""
                  />
                </div>
                <div className="col-span-2 row-span-3 col-start-7 row-start-2 h-[400px] overflow-hidden  ">
                  <img
                    src={Cloth4}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                    alt=""
                  />
                </div>
                <div className="col-span-2 row-span-3 col-start-9 row-start-1 h-[400px] overflow-hidden  ">
                  <img
                    src={Cloth7}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                    alt=""
                  />
                </div>
                <div className="col-span-2 col-start-1 row-start-4 bg-[#F5C875]  "></div>
                <div className="col-span-2 col-start-3 row-start-1 bg-[#D3A994]  "></div>
                <div className="col-span-2 col-start-5 row-start-4 bg-[#B2B3B7]  "></div>
                <div className="col-span-2 col-start-7 row-start-1 bg-[#596579]  "></div>
                <div className="col-span-2 col-start-9 row-start-4 bg-[#75A274]  "></div>
              </div>
    </div>
  )
}

export default BannerHero