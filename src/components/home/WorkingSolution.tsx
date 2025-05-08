import s1 from '../../assets/service-icon-1.png';
import s2 from '../../assets/service-icon-2.png';
import s3 from '../../assets/service-icon-3.png';
import s4 from '../../assets/service-icon-4.png';
import s5 from '../../assets/service-icon-5.png';
import s6 from '../../assets/service-icon-6.png';
import bulb from '../../assets/bulb-icon.png';
import Image from 'next/image';

const WorkingSolutins = () => {
  return (
    <div className="w-full mx-auto ">
      <section className="text-center">
        <div className="font-bold text-3xl mt-16 mb-7"> Working Solutions</div>

        <p className="text-center text-xl mb-18">
          To combat rising energy costs and reduce our carbon footprint, solar
          panels are being installed on community buildings such as schools,{' '}
          <br />
          libraries, and government offices.
        </p>
      </section>
      <div>
        <div className="flex justify-center gap-48 lg:flex-row flex-col">
          <div className="flex flex-col items-center text-center lg:-mb-0 -mb-16">
            <Image src={s1} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">Recycling Waste</p>
            <h1 className="">
              Transform used plastic bottles and <br /> containers into reusable{' '}
              <br />
              materials, reducing pollution
            </h1>
          </div>
          <div className="flex flex-col items-center text-center">
            {' '}
            <Image src={s2} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">The Eco System</p>
            <h1 className="">
              An ecosystem is a balanced network <br /> of living organisms and
              their environment,
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center gap-26 mt-20 lg:flex-row flex-col">
          <div className="flex flex-col items-center text-center">
            <Image src={s3} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">Water Refining</p>
            <h1 className="">
              Innovative water rifting systems collect, <br /> filter, and
              redistribute runoff water
            </h1>
          </div>
          <div className="lg:ml-0 sm:ml-0 flex justify-center items-center">
            <Image src={bulb} width={300} height={200} alt="s1"></Image>
          </div>
          <div className="flex justify-center items-center flex-col text-center lg:mb-0 mb-26">
            <Image src={s4} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">Wind Energy</p>
            <h1 className="">
              Harnessing wind power through turbines <br /> generates clean
              electricity, lowers <br /> greenhouse gas emissions.
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-48 lg:flex-row flex-col">
          <div className="flex flex-col items-center text-center lg:-mb-0 -mb-16">
            <Image src={s5} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">Dynamic Ecology</p>
            <h1 className="">
              Dynamic ecology studies changing interactions <br /> between
              organisms and environments.
            </h1>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src={s6} width={100} height={100} alt="s1"></Image>
            <p className="font-bold text-2xl">Saving Plants</p>
            <h1>
              Planting and preserving greenery restores ecosystems, <br />{' '}
              improves air quality, supports wildlife.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingSolutins;