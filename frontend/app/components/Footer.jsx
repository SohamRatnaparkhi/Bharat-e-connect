// import React from "react";

// const Footer = () => {
//     return (
//         <div className="flex flex-col w-full h-40% bg-footer-blue">


//             <div className="flex md:flex-row ">
//                 <div className="flex justify-around w-1/2">
//                     < img src="img/aictelogo.svg" className=' h-full w-auto' />
//                     <img src="img/BharatConnect logo.svg" className="w-auto h-full" />
//                 </div>

//                 <div className="flex text-right  w-1/2 text-white font-[400] text-xl mt-8 uppercase">
//                     Have questions, feedback, or just want to learn more?<br />
//                     Reach out to us at [Contact Email]<br />
//                     or give us a call at [Contact Phone Number].<br />
//                     We're always eager to hear from you

//                 </div>


//             </div>
//             <div className="items-center justify-between  text-white font-[400] text-xl mt-8 uppercase" >
//             Join us in revolutionizing education through innovation and security
//             </div>
//         </div>
//     )



// }

// export default Footer
import React from "react";

const Footer = () => {
    return (
        <div className="bg-footer-blue mt-24">
            <div className="container mx-auto py-8">

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 md:p-4 flex items-left">
                        <img src="/img/aictelogo.svg" alt="AICTE Logo" className="h-24 w-auto" />
                        <img src="/img/BharatConnect logo.svg" alt="BharatConnect Logo" className="h-24 w-auto ml-4" />
                    </div>

                    <div className="w-full md:w-1/2 text-white text-xl font-[400]  text-right mt-4 md:mt-0 uppercase">
                        Have questions, feedback, or just want to learn more?<br />
                        Reach out to us at [Contact Email]<br />
                        or give us a call at [Contact Phone Number].<br />
                        We're always eager to hear from you
                    </div>
                </div>


                <div className="text-white text-right text-xl font-normal mt-10 mb-40 uppercase">
                    Join us in revolutionizing education through innovation and security
                </div>
            </div>
        </div>
    );
}

export default Footer;
