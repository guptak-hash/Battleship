import React from 'react';
import Navbar from '../components/Navbar';
import { FaGithub } from 'react-icons/fa';

const developers = [
  {
    name: "Alexandros Oikonomou",
    image: "/img/alex.jpg",
    github: "https://github.com/alexoiik",
  },
  {
    name: "Vasilios Mourtzios",
    image: "/img/billy.jpg",
    github: "https://github.com/ssjbillys",
  },
  {
    name: "Stylianos Panagiotopoulos",
    image: "/img/stelios.jpg",
    github: "https://github.com/steliospanag01",
  },
  {
    name: "Kostas Kyriakos Batsios",
    image: "/img/kostas.jpg",
    github: "https://github.com/KostasKyriakosBatsios",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white font-sans">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h4 className="text-lg text-sky-300">Battleship Game</h4>
        <h1 className="text-4xl font-bold mb-6">DEVELOPERS</h1>
        
        <p className="mb-10 leading-relaxed">
          We are 4 young undergraduate students with a passion for gaming and web development 
          that teamed up to create an innovative web game. This game is a strong full-stack
          project and created for our university's course "Development of Web Systems and Applications" 
          at the department of{" "}
          <a href="https://www.iee.ihu.gr/en/" className="text-sky-300 underline" target="_blank" rel="noreferrer">
            IEE
          </a>. Together, our collaboration resulted in a captivating, enjoyable and user-friendly{" "}
          <a href="/" className="text-sky-300 underline" target="_blank" rel="noreferrer">
            Online Battleship Game!
          </a>
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-xl shadow-lg p-4 text-center hover:bg-white/20 transition"
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-sky-400"
              />
              <h3 className="font-semibold text-lg">{dev.name}</h3>
              <a
                href={dev.github}
                target="_blank"
                rel="noreferrer"
                className="text-sky-300 hover:text-sky-400 inline-block mt-2"
              >
                <FaGithub size={24} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
