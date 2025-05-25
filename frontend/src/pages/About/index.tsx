import "./style.less";

import { IMG } from "../../static/img.ts";

import Heading from "../../components/blocks/Heading";
import Page from "../../components/layout/Page";

const TEAM = [
  {
    name: "Катерина Тихова",
    img: IMG.avatar2,
    rank: (
      <>
        Кандидат психологических наук, специалист <br /> по когнитивным
        искажениям
      </>
    ),
  },
  {
    name: "Эльнар Бикмаев",
    img: IMG.avatar1,
    rank: "Магистр когнитивных наук, исследователь",
  },
  {
    name: "Лилия Ловцова",
    img: IMG.avatar3,
    rank: (
      <>
        Психолог-консультант, эксперт по <br /> принятию решений
      </>
    ),
  },
];

function About() {
  return (
    <Page className="About">
      <Heading one>О нас</Heading>

      <div className="line big">
        Наша команда состоит из экспертов в области когнитивных наук и
        психологии, которые увлечены изучением и объяснением когнитивных
        искажений. Мы стремимся сделать эту сложную тему доступной и понятной
        для всех, чтобы помочь людям принимать более осознанные решения.
      </div>

      <Heading three>Наша команда</Heading>

      <div className="AboutTeam">
        {TEAM.map(({ name, img, rank }, i) => (
          <div key={i}>
            <img src={img} alt="" />
            <div>{name}</div>
            <div>{rank}</div>
          </div>
        ))}
      </div>

      <Heading three>Контактные данные</Heading>

      <div>Email: info@mindbug.com</div>
    </Page>
  );
}

export default About;
