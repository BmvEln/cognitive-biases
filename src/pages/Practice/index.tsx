import { Link, Navigate, useParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import classnames from "classnames";

import "./style.less";

import { DATA } from "../fakeData.ts";
import { ls } from "../../functions/functions.tsx";
import { IMG } from "../../static/img.ts";

import Page from "../../components/layout/Page";
import Button from "../../components/controls/Button";
import { Radio } from "../../components/controls/Radio";
import { ACHIEVEMENTS } from "../../static/achievements.ts";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../redux/store.tsx";
import { setAchievementNotice } from "../../redux/slices/achievementNoticeSlice.tsx";

const IMAGE_SIZES = {
  1: { w: 384, h: 256 },
  2: { w: 256, h: 384 },
  3: { w: 256, h: 384 },
  4: { w: 256, h: 384 },
  5: { w: 256, h: 256 },
};

function getLsKeyName(id: string) {
  return `choice${id}`;
}

type StepsProps = {
  steps: {
    name: string;
    variants: string[];
    situation: undefined | string;
    question: undefined | string;
  }[];
  outputNumberSteps: number;
  variantsIdxs: number[];
  handleClickChoice: (stepIdx: number, varIdx: number) => void;
  rightAnswers: number[];
  fbWrongChoices: { [number: string]: string }[];
  setVariantsIdxs: (v: number[]) => void;
  lsChoice: number[];
  id: string | undefined;
};

function Steps({
  steps,
  outputNumberSteps,
  variantsIdxs,
  handleClickChoice,
  rightAnswers,
  fbWrongChoices,
  setVariantsIdxs,
  lsChoice,
  id,
}: StepsProps) {
  const lsKeyName = getLsKeyName(id),
    handleClickTryAgain = useCallback(() => {
      const newValue = [...lsChoice].slice(0, -1);
      ls.set(lsKeyName, newValue);
      setVariantsIdxs(newValue);
    }, [lsChoice, lsKeyName, setVariantsIdxs]);

  return steps.map(({ name, variants, situation, question }, i: number) => {
    return (
      <React.Fragment key={name}>
        <Step
          i={i}
          name={name}
          variants={variants}
          situation={situation}
          question={question}
          outputNumberSteps={outputNumberSteps}
          variantsIdxs={variantsIdxs}
          handleClickChoice={handleClickChoice}
          rightAnswers={rightAnswers}
        />

        {Object.keys(fbWrongChoices[i]).includes(
          String(variantsIdxs[i] + 1),
        ) ? (
          <>
            <div className="PracticeFeedback PracticeFeedback_negative">
              <div>Ты попал в сети когнитивного искажения!</div>
              <div className="line tiny">
                {fbWrongChoices[i][variantsIdxs[i] + 1]}
              </div>
              <div>Попробуй пройти еще раз учитывая полученный опыт.</div>
            </div>

            <Button onClick={handleClickTryAgain}>Попробовать ещё раз</Button>
          </>
        ) : null}
      </React.Fragment>
    );
  });
}

type StepProps = {
  i: number;
  name: string;
  variants: string[];
  situation: undefined | string;
  question: undefined | string;
  outputNumberSteps: number;
  variantsIdxs: number[];
  handleClickChoice: (stepIdx: number, varIdx: number) => void;
  rightAnswers: number[];
};

function Step({
  i,
  name,
  variants,
  variantsIdxs,
  handleClickChoice,
  rightAnswers,
  situation,
  question,
}: StepProps) {
  const [variantsIdx, setVariantsIdx] = useState<number | undefined>(
    variantsIdxs[i],
  );

  // !!0 (первый шаг) - false => 1
  // !!1 (второй шаг) - true && (4 (правильный ответ) !== 4 => false) => 1
  const isStepAccess = !!i && variantsIdxs[i - 1] + 1 !== rightAnswers[i - 1];

  return (
    <div
      className="PracticeStep"
      style={{
        pointerEvents: isStepAccess ? "none" : "auto",
        // opacity: isStepAccess ? 0 : 1,
        display: isStepAccess ? "none" : "block",
      }}
    >
      <div
        className={classnames("line semi-medium text_font-16", {
          "semi-medium": situation,
        })}
      >
        <span>
          <span className="text_medium">👣 Шаг {i + 1}:</span>
          <span>&nbsp;{name}</span>
        </span>
      </div>

      {!situation ? null : (
        <div className="line flex_column text_font-16">
          <span>
            <span className="text_medium">Ситуация:</span>
            <span>&nbsp;{situation}</span>
          </span>
        </div>
      )}

      {!question ? null : (
        <div className="text_semiBold" style={{ margin: "20px 0 20px" }}>
          {question}
        </div>
      )}

      <div
        style={{
          width: "800px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
          }}
        >
          {variants.map((variant: string, j: number) => (
            <Radio
              key={j}
              onClick={() => setVariantsIdx(j)}
              selected={j === variantsIdx}
              disabled={typeof variantsIdxs[i] === "number"}
              text={variant}
            />
          ))}
        </div>

        {typeof variantsIdxs[i] === "number" ? null : (
          <div className="flex flex_justify_end" style={{ marginTop: "20px" }}>
            <Button
              disabled={typeof variantsIdxs[i] === "number"}
              onClick={() => {
                if (
                  typeof variantsIdx === "number" &&
                  typeof variantsIdxs[i] !== "number"
                ) {
                  handleClickChoice(i, variantsIdx);
                }
              }}
            >
              Проверить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

type Briefing = {
  name: string;
  script: string;
  goal: string;
  lsKeyName: string;
  setVariantsIdxs: (v: []) => void;
  id: string | undefined;
};

function Briefing({
  name,
  script,
  goal,
  lsKeyName,
  setVariantsIdxs,
  id,
}: Briefing) {
  return (
    <>
      <div className="PracticeTop">
        <div>
          <div>Симуляция:</div>
          <div>{name}</div>
        </div>

        <div>
          <Button
            theme="gray"
            onClick={() => {
              const choicesCompleted = ls.get("choicesCompleted") || [];

              ls.remove(lsKeyName);
              setVariantsIdxs([]);

              if (choicesCompleted.includes(lsKeyName)) {
                if (choicesCompleted.length > 1) {
                  ls.set(
                    "choicesCompleted",
                    [...choicesCompleted].filter((key) => key !== lsKeyName),
                  );
                } else {
                  ls.remove("choicesCompleted");
                }
              }
            }}
          >
            Сбросить все
          </Button>

          <Link to="/">
            <Button>Вернуться</Button>
          </Link>
        </div>
      </div>

      <div className="line upper-middle flex_column">
        <div className="PracticeSubTitle">🎬 Сценарий:</div>
        <div>{script}</div>
      </div>

      {!IMG[`bias${id}`] ? null : (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              borderRadius: "12px",
              width: IMAGE_SIZES[id].w + "px",
              height: IMAGE_SIZES[id].h + "px",
              backgroundImage: `url(${IMG[`bias${id}`]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}

      <div className="line upper-middle flex_column">
        <div className="PracticeSubTitle">🎯 Цель:</div>
        <div>{goal}</div>
      </div>
    </>
  );
}

type ResultProps = {
  conclusion: string;
  positiveResult: string;
  activeAnalysis: boolean;
  setActiveAnalysis: (v: boolean) => void;
  fbRightChoices: { [number: number]: string };
  fbWrongChoices: { [number: number]: string }[];
};

function Result({
  conclusion,
  positiveResult,
  activeAnalysis,
  setActiveAnalysis,
  fbRightChoices,
  fbWrongChoices,
}: ResultProps) {
  return (
    <div>
      <div style={{ margin: "30px 0 24px" }}>💪 {positiveResult}</div>

      <div className="PracticeFeedback PracticeFeedback_positive">
        <div style={{ color: "green" }}>Ты принял правильные решения!</div>
        <div>🧩 {conclusion}</div>
      </div>

      <Button onClick={() => setActiveAnalysis(!activeAnalysis)}>
        <img
          src={IMG.idea}
          width={20}
          height={20}
          alt=""
          style={{ marginRight: "4px" }}
        />
        {activeAnalysis ? "Свернуть" : "Показать"} разбор
      </Button>

      {!activeAnalysis ? null : (
        <>
          <div
            style={{ margin: "24px 0 16px" }}
            className="text_font-20 text_semiBold"
          >
            🧠 Разбор:
          </div>

          <div
            style={{ border: "1px solid #0000000D", marginBottom: "24px" }}
          />

          <div className="PracticeRationalChoices">
            <div>✅ Рациональные выборы:</div>

            <div>
              {Object.values(fbRightChoices).map((text, i) => (
                <div key={i}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                      fill="#0283C5FF"
                    />
                  </svg>
                  <div>{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="PracticeMistakeChoices">
            <div>❌ Ловушки и их последствия:</div>

            <div>
              {Object.values(fbWrongChoices).map((obj, i) => (
                <div style={{ marginBottom: "12px" }} key={i}>
                  <div className="line text_semiBold">Шаг {i + 1}</div>

                  <ul>
                    {Object.values(obj).map((text, j) => (
                      <li key={j}>{text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ключ - количество пройденных
// придумать что-то, чтобы много раз не приходилось к индексу прибавлять 1

function Practice() {
  const { id } = useParams(),
    dispatch = useAppDispatch(),
    // TODO: Переименовать переменную. Более конкретно
    lsKeyName = getLsKeyName(id as string),
    biasItem = DATA.find((item) => id == item.id),
    simulation = biasItem?.simulation,
    rightAnswers = simulation?.rightAnswers,
    lsChoice = ls.get(lsKeyName) || [],
    [variantsIdxs, setVariantsIdxs] = useState(lsChoice),
    [activeAnalysis, setActiveAnalysis] = useState(false),
    outputNumberSteps = !lsChoice.length ? 1 : lsChoice.length + 1,
    isDone = rightAnswers?.every(
      (a: number, i: number) => a === variantsIdxs[i] + 1,
    );

  const checkAchievements = useCallback(() => {
    const userData = { choicesCompleted: ls.get("choicesCompleted") },
      numberAchievs = Object.values(ACHIEVEMENTS).filter(({ condition }) =>
        condition(userData),
      ).length;

    if (numberAchievs > Number(ls.get("numberAchievs") || "0")) {
      ls.set("hasNewAchiev", true);
      ls.set("numberAchievs", numberAchievs);
      dispatch(setAchievementNotice(true));
    }
  }, [dispatch]);

  const handleClickChoice = useCallback(
    (stepIdx: number, varIdx: number) => {
      if (outputNumberSteps !== stepIdx + 1) {
        return;
      }

      const newValue = [...lsChoice];
      newValue.push(varIdx);
      ls.set(lsKeyName, newValue);
      setVariantsIdxs([...variantsIdxs, varIdx]);

      if (
        stepIdx === simulation?.steps?.length - 1 &&
        varIdx + 1 === rightAnswers[1]
      ) {
        const choicesCompleted = ls.get("choicesCompleted");

        if (choicesCompleted === null) {
          ls.set("choicesCompleted", [lsKeyName]);
        } else {
          const newValue = choicesCompleted;
          if (!newValue.includes(lsKeyName)) {
            newValue.push(lsKeyName);
            ls.set("choicesCompleted", newValue);
          }
        }

        checkAchievements();
      }
    },
    [
      lsChoice,
      lsKeyName,
      outputNumberSteps,
      rightAnswers,
      simulation?.steps?.length,
      variantsIdxs,
    ],
  );

  if (!DATA.find((item) => id == item.id)) {
    return <Navigate to="/" />;
  }

  return (
    <Page className="Practice">
      <Briefing
        id={id}
        name={simulation.name}
        script={simulation.script}
        goal={simulation.goal}
        lsKeyName={lsKeyName}
        setVariantsIdxs={setVariantsIdxs}
      />

      <Steps
        id={id}
        steps={simulation.steps}
        outputNumberSteps={outputNumberSteps}
        variantsIdxs={variantsIdxs}
        setVariantsIdxs={setVariantsIdxs}
        handleClickChoice={handleClickChoice}
        rightAnswers={rightAnswers}
        fbWrongChoices={simulation?.feedbackWrongChoices}
        lsChoice={lsChoice}
      />

      {!isDone ? null : (
        <Result
          conclusion={simulation.conclusion}
          positiveResult={simulation.positiveResult}
          activeAnalysis={activeAnalysis}
          setActiveAnalysis={setActiveAnalysis}
          fbRightChoices={simulation?.feedbackRightChoices}
          fbWrongChoices={simulation?.feedbackWrongChoices}
        />
      )}
    </Page>
  );
}

export default Practice;
