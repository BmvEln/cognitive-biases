import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import "./style.less";

import { DATA } from "../fakeData.ts";

import Page from "../../components/layout/Page";
import Heading from "../../components/blocks/Heading";
import Window from "../../components/layout/Window";
import Button from "../../components/controls/Button";
import React from "react";
import { IMG } from "../../static/img.ts";

const SUBTITLES = [
  "Название",
  "Простое определение",
  "Пример из жизни",
  "Как проявляется в мышлении?",
  "Как исправить?",
];

function Briefing() {
  return (
    <>
      <div className="text_font-18 line semi-medium">
        Что такое когнитивные искажения?
      </div>
      <div>
        Когнитивные искажения — это ошибки мышления, которые искажают наше
        восприятие реальности.
      </div>
      <div className="line upper-middle">
        Проще говоря: «Это когда мозг обманывает сам себя» — чтобы сэкономить
        силы, упростить информацию или подстроить её под наши убеждения.
      </div>
      <div className="text_font-18 line semi-medium">Зачем их знать?</div>
      <ul style={{ marginBottom: "24px" }}>
        <li>
          Принимать лучшие решения — меньше ошибок в финансах, отношениях,
          карьере.
        </li>
        <li>
          Меньше стресса — не катастрофизировать из-за искажений вроде
          «чёрно-белого мышления».
        </li>
        <li>
          Лучше понимать других — осознавать, почему люди спорят, верят фейкам
          или не меняют мнение.
        </li>
        <li>Прокачивать критическое мышление — отделять факты от иллюзий.</li>
      </ul>
      <div className="line upper-middle">
        <span>
          <span>
            Когнитивные искажения — как «баги» в программе мозга. Научившись их
            замечать, ты становишься
          </span>
          <span className="text_semiBold"> рациональнее.</span> <br />
          <span className="text_semiBold"> Более 382 пользователей</span>
          <span> уже нашли свои когнитивные слепые пятна.</span>
        </span>
      </div>
    </>
  );
}

type MapBiasesProps = {
  setItemId: (id: string) => void;
};

function MapBiases({ setItemId }: MapBiasesProps) {
  return (
    <>
      <div className="text_font-18 line semi-medium">
        Карта когнитивных искажений
      </div>

      <div className="HomeBiases">
        <div
          style={{
            backgroundImage: `url(${IMG.brain})`,
          }}
        />

        <ul>
          {Object.entries(DATA).map(([key, { name }]) => (
            <li key={name} onClick={() => setItemId(key)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Home() {
  const [itemId, setItemId] = useState<string | undefined>(undefined),
    item = {
      name: null,
      definition: null,
      realLifeExample: null,
      manifestation: null,
      fix: null,
    };

  if (DATA[itemId]) {
    item.name = DATA[itemId].name;
    item.definition = DATA[itemId].definition;
    item.realLifeExample = DATA[itemId].realLifeExample;
    item.manifestation = DATA[itemId].manifestation;
    item.fix = DATA[itemId].fix;
  }

  const handleClickClose = useCallback(() => {
    setItemId(undefined);
  }, []);

  return (
    <Page className="Home">
      <Heading>Когнитивные искажения</Heading>
      <Briefing />
      <MapBiases setItemId={setItemId} />

      <Window
        open={typeof itemId === "string"}
        onClose={() => handleClickClose()}
      >
        {!itemId
          ? null
          : Object.values(item).map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="HomeSubtitle">{SUBTITLES[i]}</div>
                  {Array.isArray(v) ? (
                    <ul className="HomeContent">
                      {(v as string[]).map((v: string) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="HomeContent">{v}</div>
                  )}
                </React.Fragment>
              );
            })}

        <Link to={`/task/${itemId}`}>
          <Button>Тренироваться</Button>
        </Link>
      </Window>
    </Page>
  );
}

export default Home;
