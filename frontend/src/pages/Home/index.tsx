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
import { biasPT } from "../../static/types.tsx";

const WINDOW_CONTENT = [
  { title: "Название", key: "name" },
  { title: "Простое определение", key: "definition" },
  { title: "Пример из жизни", key: "realLifeExample" },
  { title: "Как проявляется в мышлении?", key: "manifestation" },
  { title: "Как исправить?", key: "fix" },
] as const;

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
  const lsChoicesCompleted = ls.get("choicesCompleted") || [],
    [search, setSearch] = useState(""),
    [tabIdx, setTabIdx] = useState(0),
    listBiases = DATA.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );

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

        <Progress width={200} value={lsChoicesCompleted.length / DATA.length} />
      </div>

      <div className="HomeTabs">
        {["Карта", "Список"].map((str, i) => (
          <div
            key={i}
            onClick={() => setTabIdx(i)}
            className={`${i === tabIdx ? "selected" : ""}`}
          >
            {str}
          </div>
        ))}
      </div>

      {tabIdx !== 0 ? null : (
        <div className="HomeGraphics">
          <img src={IMG.water} width={640} height={640} alt="" />
          <img
            style={{ transform: "scaleX(-1)" }}
            src={IMG.water}
            width={640}
            height={640}
            alt=""
          />
          {/*<editor-fold desc="COGNITIVE_BIAS_MAP">*/}
          {Object.entries(COGNITIVE_BIAS_MAP).map(
            ([key, { name, width, height, top, left, biases }], i) => (
              <div
                key={i}
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

                {Object.entries(biases).map(([key, { top, left, img }], j) => (
                  <div
                    key={j}
                    className="bias"
                    // ???
                    // title={DATA[i].name}
                    onClick={() => setBiasId(key)}
                    style={{
                      top,
                      left,
                      backgroundColor: lsChoicesCompleted.includes(
                        `choice${key}`,
                      )
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
          {/*</editor-fold>*/}
        </div>
      )}

      {tabIdx !== 1 ? null : (
        <>
          <Input
            placeholder="Поиск по искажениям"
            width={600}
            value={search}
            onChange={(v) => setSearch(v)}
          />
          <div className="HomeListBiases">
            {listBiases.map(({ name, id }) => (
              <div
                key={id}
                onClick={() => setBiasId(id.toString())}
                style={{
                  color: lsChoicesCompleted.includes(`choice${id}`)
                    ? "green"
                    : "red",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Home() {
  const [biasId, setBiasId] = useState<string | undefined>(undefined),
    biasItem: biasPT = DATA.find((item) => biasId == item.id),
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
          : WINDOW_CONTENT.map(({ title, key }, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="HomeSubtitle">{title}</div>
                  {Array.isArray(biasItem[key]) ? (
                    <ul className="HomeContent">
                      {(biasItem[key] as string[]).map((v: string) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="HomeContent">{biasItem[key]}</div>
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
