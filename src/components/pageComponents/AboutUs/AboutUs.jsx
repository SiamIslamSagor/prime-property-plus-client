import { Fade } from "react-awesome-reveal";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <div className="container mx-auto space-y-28 my-28">
      <div className="overflow-hidden">
        <Fade>
          <SectionTitle heading={"about us"}></SectionTitle>
        </Fade>
      </div>

      <div className="flex max-lg:flex-col justify-between items-center">
        <div className="overflow-hidden">
          <Fade direction="left" delay={800}>
            <div>
              <img
                className="max-w-2xl max-sm:w-full"
                src={"https://i.ibb.co/MfxfZxw/ownerImg.jpg"}
                alt=""
              />
            </div>
          </Fade>
        </div>
        <div className="max-w-3xl mt-5 lg:mt-10">
          <h2 className="text-4xl px-2">
            A leading PPP in the property industry
          </h2>
          <div>
            <Fade>
              <div className="max-md:space-y-2 max-lg:space-y-3 lg:space-y-4 my-5 lg:mt-10 px-2 font-semibold">
                <p>
                  Owned and run by a group of commercial property experts, we
                  are a long-established property consultancy that’s a popular
                  alternative to the industry’s larger international firms.
                </p>
                <p>
                  With a history in property consultancy dating back to 1833,
                  we’ve adapted and evolved to be one of the leading SMEs in the
                  industry.
                </p>
                <p>
                  People are at the core of our ethos at Sanderson Weatherall,
                  which is the key to our success. A collaborative mindset
                  amongst our team engenders a sense of ownership and belonging
                  at our firm, which is empowering for everyone.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col flex-row-reverse justify-between items-center">
        <div className="overflow-hidden">
          <Fade direction="right" delay={800}>
            <div>
              <img
                className="max-w-2xl max-sm:w-full"
                src={"https://i.ibb.co/9vK81p0/teamImg.jpg"}
                alt=""
              />
            </div>
          </Fade>
        </div>
        <div className="max-w-3xl mt-10">
          <h2 className="text-4xl px-2">An approachable alternative</h2>
          <div>
            <Fade>
              <div className="max-md:space-y-2 max-lg:space-y-3 lg:space-y-4 my-5 lg:mt-10 px-2 font-semibold">
                <p>
                  We’re proud to be independently owned. We’ve built a
                  reputation for the care we put in to looking after our
                  clients, and the fact our partners get stuck in to the day job
                  just as much as the rest of the team.
                </p>
                <p>
                  By combining our knowledge and expertise we provide complete
                  property advice and integrated services that focus on making
                  your business more successful.
                </p>
                <p>
                  We have circa 200 talented people in our team and some of the
                  most skilled in the industry.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
