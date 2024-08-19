import Link from 'next/link';
import WaveBackground from '../components/WaveBackground';

const Dashboard = () => {
  const schedule = [
    { time: "9AM", title: "Teambesprechung", room: "028", color: "bg-custom-gray" },
    { time: "10AM", title: "Einzelbesprechung", room: "028", color: "bg-custom-light-gray" },
    { time: "11AM", title: "Einzelbesprechung", room: "028", color: "bg-custom-red" },
    { time: "12PM", title: "Einzelbesprechung", room: "028", color: "bg-purple-200" },
    { time: "2PM", title: "Einzelbesprechung", room: "028", color: "bg-custom-blue" },
    { time: "4PM", title: "Einzelbesprechung", room: "028", color: "bg-custom-light-blue" },
  ];

  const notifications = [
    { message: "Neue Nachricht: Doris Birkner (Klinikleitung)", gradient: "to-custom-red" },
    { message: "ALARM: Notfallknopf betätigt Raum 207", gradient: "to-custom-green" },
    { message: "Medikamentenlieferung verzögert sich um 2 Tage", gradient: "to-custom-red" },
    { message: "Neue Nachricht: Doris Birkner (Klinikleitung)", gradient: "to-custom-green" },
  ];

  const news = [
    "Neues Wellness-Programm bringt Freude und Gesundheit für Bewohner des Sonnenblick-Altenheims",
    "Neues Wellness-Programm bringt Freude und Gesundheit für Bewohner des Sonnenblick-Altenheims",
    "Neues Wellness-Programm bringt Freude und Gesundheit für Bewohner des Sonnenblick-Altenheims",
    "Neues Wellness-Programm bringt Freude und Gesundheit für Bewohner des Sonnenblick-Altenheims",
  ];

  return (
    <div className="flex flex-col w-full h-full px-6 py-12 justify-center items-center rounded-xl z-20"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true">
      
      <div className="flex w-full h-full px-8 my-6 justify-start">
        <Link href="/mitarbeiterprofil/1">
          <h1 className="text-5xl font-fjalla tracking-wide hover:cursor-pointer hover:text-custom-dark-gray z-20">
            Albert Doluk
          </h1>
        </Link>
      </div>

      <div className="flex w-full h-full">
        <div className="flex flex-col w-[40%] h-[93%] bg-custom-light-gray bg-opacity-25 justify-center items-center rounded-xl m-6 z-10">
          <div className="flex flex-col rounded-xl bg-custom-light-gray bg-opacity-25 drop-shadow-2xl w-[100%] h-[100%] overflow-y-auto p-6 custom-scrollbar">
            <Link href="/Dienstplan">
              <h2 className="font-lato text-black font-semibold text-2xl tracking-wide mx-2 hover:cursor-pointer hover:text-custom-dark-gray">
                Dienstplan
              </h2>
            </Link>
            <div className="flex flex-col space-y-2 p-2">
              <p className="text-lg font-lato mb-4 text-black">06-05-2024</p>
              <div className="flex flex-col space-y-2">
                {schedule.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 drop-shadow-xl bg-opacity-60 border border-custom-dark-gray border-opacity-45 rounded ${item.color}`}>
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span>Raum: {item.room}</span>
                    </div>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[50%] h-full flex-col z-10">
          <div className="flex justify-center items-center w-full h-[45%] my-4">
            <div className="flex flex-col w-full h-full border-2 border-gray-200 border-opacity-15 bg-opacity-65 text-black bg-custom-light-gray drop-shadow-2xl rounded-xl p-6 overflow-y-auto custom-scrollbar">
              <h2 className="mb-6 text-2xl font-lato font-semibold">Benachrichtigungen</h2>
              {notifications.map((note, index) => (
                <div key={index} className={`bg-gradient-to-r from-custom-light-gray font-lato bg-opacity-25 ${note.gradient} text-black p-2 rounded mb-2`}>
                  {note.message}
                </div>
              ))}
            </div>
          </div>

          <div className="flex z-10 flex-col w-full h-[50%] rounded-xl drop-shadow-2xl my-4 bg-custom-light-gray bg-opacity-65 border-2 border-gray-200 border-opacity-15 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col p-6 justify-center rounded-xl text-black custom-scrollbar">
              <h2 className="pb-4 text-2xl font-lato font-semibold">Übergabe</h2>
              {news.map((newsItem, index) => (
                <div key={index} className="flex items-center p-2 my-4 rounded-2xl bg-white bg-opacity-35">
                  <img src="https://via.placeholder.com/50" alt={`News ${index + 1}`} className="mr-4 rounded" />
                  <p>{newsItem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
