// import SearchBar from "@/components/Home/SearchBar"
import LocationInputBox from "@/components/Home/LocationInputBox"
// import CarouselComponent from "@/components/Home/Carousel"
import CampaignsDisplay from "@/components/Home/CampaignsDisplay"
import CouponCarousel from "@/components/Home/CouponCarousel"
import SocialComponent from "@/components/Home/SocialComponent"
import FaQ from "@/components/Home/FaQ"
import Blog from "@/components/Home/Blog"
import Footer from "@/components/Footer"

const page = () => {
    
  return (
   <div className="flex flex-col justify-center items-center bg-[#341266] sm:w-[30rem] w-full mx-auto">
     {/* <SearchBar/> */}
     <LocationInputBox/>
     {/* <CarouselComponent/> */}
     <CampaignsDisplay/>
     <SocialComponent/>
     <Blog/>
     <FaQ/>
     <CouponCarousel/>
     <Footer/>
   </div>
  )
}

export default page
