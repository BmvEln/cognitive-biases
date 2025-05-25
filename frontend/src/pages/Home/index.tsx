import React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import "./style.less";

import { IMG } from "../../static/img.ts";
import { DATA } from "../fakeData.ts";
import { COGNITIVE_BIAS_MAP } from "./cognitiveDistortionMap.ts";
import { ls } from "../../functions/functions.tsx";

import Page from "../../components/layout/Page";
import Heading from "../../components/blocks/Heading";
import Window from "../../components/layout/Window";
import Button from "../../components/controls/Button";
import Progress from "../../components/controls/Progress";
import ShowMore from "../../components/blocks/ShowMore";
import Input from "../../components/controls/Input";

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
      <ShowMore title="Что такое когнитивные искажения?">
        <div>
          Когнитивные искажения — это ошибки мышления, которые искажают наше
          восприятие реальности.
        </div>
        <div className="line upper-middle">
          Проще говоря: «Это когда мозг обманывает сам себя» — чтобы сэкономить
          силы, упростить информацию или подстроить её под наши убеждения.
        </div>
      </ShowMore>

      <ShowMore title="Зачем их знать?">
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
              Когнитивные искажения — как «баги» в программе мозга. Научившись
              их замечать, ты становишься
            </span>
            <span className="text_semiBold"> рациональнее.</span> <br />
            <span className="text_semiBold"> Более 382 пользователей</span>
            <span> уже нашли свои когнитивные слепые пятна.</span>
          </span>
        </div>
      </ShowMore>
    </>
  );
}

type MapBiasesProps = {
  setBiasId: (id: string) => void;
};

function MapBiases({ setBiasId }: MapBiasesProps) {
  const lsChoicesCompleted = ls.get("choicesCompleted") || [];
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="text_font-20 line text_semiBold semi-medium">
        Карта когнитивных искажений
      </div>

      <div
        className="line flex_align_center semi-medium"
        style={{ columnGap: "12px" }}
      >
        <div>Прогресс прохождения:</div>

        <Progress
          width={200}
          value={lsChoicesCompleted.length / Object.keys(DATA).length}
        />
      </div>

      <div className="HomeBiases">
        <Input
          placeholder="Поиск по искажениям"
          width={600}
          value={search}
          onChange={(v) => setSearch(v)}
        />

        <img src={IMG.water} width={640} height={640} alt="" />
        <img
          style={{ transform: "scaleX(-1)" }}
          src={IMG.water}
          width={640}
          height={640}
          alt=""
        />
        {Object.entries(COGNITIVE_BIAS_MAP).map(
          ([key, { name, width, height, top, left, biases }], i) => (
            <div
              style={{
                backgroundImage: `url("${IMG[`continent_${i + 1}`]}")`,
                width,
                height,
                top,
                left,
                backgroundSize: "cover",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: name.top,
                  left: name.left,
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {name.text}
              </div>

              {Object.entries(biases).map(([key, { top, left, img }]) => (
                <div
                  className="bias"
                  title={DATA[key].name}
                  onClick={() => setBiasId(key)}
                  style={{
                    top,
                    left,
                    backgroundColor: lsChoicesCompleted.includes(`choice${key}`)
                      ? "green"
                      : "red",
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          ),
        )}
      </div>
    </>
  );
}

function Home() {
  const [biasId, setBiasId] = useState<string | undefined>(undefined),
    biasItem = typeof biasId === "string" ? DATA[biasId] : undefined,
    handleClickClose = useCallback(() => {
      setBiasId(undefined);
    }, []);

  return (
    <Page className="Home">
      <Heading one>Когнитивные искажения</Heading>
      <Briefing />
      <MapBiases setBiasId={setBiasId} />

      <Window
        open={typeof biasId === "string"}
        onClose={() => handleClickClose()}
      >
        {!biasId
          ? null
          : Object.values(biasItem).map((v, i) => {
              if (typeof v === "object" && !Array.isArray(v) && v !== null) {
                return;
              }

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

        <Link to={`/bias/${biasId}`}>
          <Button>Тренироваться</Button>
        </Link>
      </Window>
    </Page>
  );
}

export default Home;
