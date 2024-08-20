import React from 'react';

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 bottom-0  w-full h-[120%] z-0 ">
      <div className="relative w-[240vw] h-screen   ">
        <div className="absolute bottom-0 w-full h-full animate-wave-1">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(106, 139, 180, 0.5)" fillOpacity="1" d="M0,160L80,176C160,192,320,224,480,202.7C640,181,800,107,960,112C1120,117,1280,203,1360,245.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full animate-wave-2">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(163, 179, 204, 0.5)" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,208C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full animate-wave-3">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(208, 199, 194, 0.5)" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,165.3C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full animate-wave-4">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(243, 240, 231, 0.5)" fillOpacity="1" d="M0,256L48,224C96,192,192,128,288,112C384,96,480,128,576,165.3C672,203,768,245,864,229.3C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full animate-wave-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(183, 210, 197, 0.5)" fillOpacity="1" d="M0,32L48,58.7C96,85,192,139,288,170.7C384,203,480,213,576,186.7C672,160,768,96,864,64C960,32,1056,32,1152,74.7C1248,117,1344,203,1392,245.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full animate-wave-6">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(208, 199, 194, 0.5)" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,208C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaveBackground;
