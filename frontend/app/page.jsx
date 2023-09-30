'use client'

import { HiOutlineArrowRight } from 'react-icons/hi';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="w-full bg-white overflow-hidden">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full my-8">
        <div className="md:w-1/2">
          <div className=" flex flex-col justify-center items-start px-6 md:px-10">
            {/* h-screen */}
            <div
              className="relative text-left font-bold text-4xl md:text-5xl"
              style={{
                background: 'linear-gradient(#2D31FA, #04DFFC)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join the <br /> Future of<br /> Communication
            </div>
            <div className="relative text-left font-bold text-black text-2xl Montserrat mt-4 md:mt-6">
              Effortless Video Conferencing
            </div>
            <button onClick={()=>{push('/schedule-meets/')}} className="flex items-left justify-left text-black font-semibold text-sm md:text-base border border-solid border-black bg-gradient-to-r from-[#5D8BF4] from-20% via-[transparent] to-[#FFF] rounded-full mt-6 md:mt-8 p-3 md:p-4 px-6 md:px-8 space-x-2">
              <span>Schedule a meeting</span>
              <HiOutlineArrowRight size={24} />
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="img/meet.png" className="w-full max-w-full mt-4 md:mt-0" alt="Meeting" />
        </div>
      </div>

      {/* <div class="h-0 w-0 border-t-[25px] border-l-[55px] border-b-[25px]  border-solid border-t-transparent border-b-transparent border-l-[#555]">
      </div> */}
    

  



      <div className='text-center justify-center m-10'>
        <div className='items-center text-[600] font-bold text-xl md:text-5xl' style={{
          background: 'linear-gradient(#2D31FA, #04DFFC)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
        }>
          Fortress-Grade Security
        </div>

        <div className='text-center text-[600] text-black text-xl mb-6 Montserrat mt-4 md:mt-6'>
          <b>"Safeguarding Every Virtual Classroom,<br /> Every Interaction, Every Click."</b>
        </div>

      </div>




      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="bg-card-color shadow-md p-8">
            <h2 className="text-xl font-semibold  px-4 text-black">Secure Data Sharing</h2>
            <p className='p-4 text-black'>The platform can enable secure and controlled data sharing among AICTE, technical institutions, and other stakeholders. This can include sharing of research data, academic records, and reports while maintaining data privacy and security.</p>
          </div>


          <div className="bg-card-color shadow-md p-8">
            <h2 className="text-xl font-semibold px-4">International Collaboration</h2>
            <p className='p-4'>AICTE can use online meetings to establish and maintain collaborations with international educational institutions and organizations.</p>
          </div>


          <div className="bg-card-color shadow-md p-8">
            <h2 className="text-xl font-semibold  px-4">Immutable Record Keeping</h2>
            <p className='p-4'>Meetings, decisions, and actions taken by AICTE committees and officials can be recorded on the blockchain. This creates an immutable and transparent record of all activities, making it easier to track and audit processes.</p>
          </div>
        </div>
      </div>





      <div className='text-center justify-center m-10'>
        <div className='items-center text-[600] font-bold text-xl md:text-5xl' style={{
          background: 'linear-gradient(#2D31FA, #04DFFC)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
        }>
          About Us
        </div>
        <div className='text-center text-[400] text-black text-l mb-6 Montserrat mt-4 md:mt-6'>
          At <b>Bharat Connect</b> we're redefining the future of education through <br />cutting-edge technology and unwavering dedication.
          Our mission is to<br /> provide a secure, seamless, and enriching virtual learning experience for <br />educators and students alike.
        </div>


      </div>
      <div className='text-center justify-center m-10'>
        <div className='items-center text-[600] font-bold text-xl md:text-5xl' style={{
          background: 'linear-gradient(#2D31FA, #04DFFC)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
        }>
          Our Vision
        </div>
        <div className='text-center text-[400] text-black text-l mb-6 Montserrat mt-4 md:mt-6'>
          <b>Empowering Education, Ensuring Security</b><br />
          We envision a world where every learner can access quality education<br /> without compromising on safety.
          Through the fusion of blockchain <br /> technology and robust cybersecurity, we're creating a platform that<br /> revolutionizes how education is delivered and received.
        </div>


      </div>

      <Footer />
    </div>
  );
}
