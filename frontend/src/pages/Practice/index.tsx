import { Link, Navigate, useParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import classnames from "classnames";

import "./style.less";

import { DATA } from "../fakeData.ts";

import Page from "../../components/layout/Page";
import Button from "../../components/controls/Button";

const WIDTH_CONTENT = "800px";

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
  id: string;
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
    handleClick = useCallback(() => {
      const newValue = [...lsChoice].slice(0, -1);
      localStorage.setItem(lsKeyName, JSON.stringify(newValue));
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
          <div>
            <div style={{ color: "red" }}>
              Ты попал в сети когнитивного искажения.
            </div>
            <div>{fbWrongChoices[i][variantsIdxs[i] + 1]}</div>
            <div className="line upper-middle">
              Попробуй пройти еще раз учитывая полученный опыт.
            </div>

            <Button onClick={handleClick}>Попробовать ещё раз</Button>
          </div>
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
  // !!0 (первый шаг) - false => 1
  // !!1 (второй шаг) - true && (4 (правильный ответ) !== 4 => false) => 1
  const isStepAccess = !!i && variantsIdxs[i - 1] + 1 !== rightAnswers[i - 1];

  return (
    <div
      className="PracticeStep"
      style={{
        pointerEvents: isStepAccess ? "none" : "auto",
        opacity: isStepAccess ? 0 : 1,
      }}
    >
      <div className="line upper-middle">
        <span>
          <span className="text_semiBold">Шаг {i + 1}:</span>
          <span>&nbsp;{name}</span>
        </span>
      </div>

      {!situation ? null : (
        <div style={{ margin: "20px 0 20px" }}>
          <span>
            <span className="text_semiBold">Ситуация:</span>
            <span>&nbsp;{situation}</span>
          </span>
        </div>
      )}

      {!question ? null : (
        <div className="text_semiBold" style={{ margin: "20px 0 20px" }}>
          {question}
        </div>
      )}

      <ol className="PracticeChoices">
        {variants.map((variant: string, j: number) => (
          <li
            className={classnames("PracticeChoice", {
              active: j === variantsIdxs[i],
            })}
            style={{
              cursor:
                typeof variantsIdxs[i] === "number" ? "default" : "pointer",
            }}
            key={j}
            onClick={() => handleClickChoice(i, j)}
          >
            {variant}
          </li>
        ))}
      </ol>
    </div>
  );
}

type Briefing = {
  name: string;
  script: string;
  goal: string;
  numberSteps: number;
};

function Briefing({ name, script, goal, numberSteps }: Briefing) {
  return (
    <>
      <div className="line upper-middle">
        <span>
          <span>
            Тебе предложено пройти симуляцию 🎮 нацеленную помочь научиться
            распознавать и понимать <br /> когнитивное искажение. Представленная
            симуляция состоит из
          </span>
          <span className="text_semiBold"> {numberSteps} шагов. </span>
          <span>Будь внимателен!</span>
        </span>
      </div>

      <div className="line upper-middle">
        <div className="text_semiBold">Симуляция:</div>
        <div>&nbsp;{name}</div>
      </div>

      <div className="line">
        <div className="text_semiBold">Сценарий:</div>
        <div>&nbsp;{script}</div>
      </div>

      <div className="line upper-middle">
        <div className="text_semiBold">Цель:</div>
        <div>&nbsp;{goal}</div>
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
    <div style={{ width: WIDTH_CONTENT }}>
      <div style={{ margin: "24px 0 24px" }}>{positiveResult}</div>

      <div style={{ margin: "50px 0 24px" }}>
        <div style={{ color: "green" }}>Ты принял правильные решения!</div>
        <div>{conclusion}</div>
      </div>

      <Button onClick={() => setActiveAnalysis(!activeAnalysis)}>
        {activeAnalysis ? "Свернуть" : "Показать"} разбор
      </Button>

      {!activeAnalysis ? null : (
        <>
          <div
            style={{ margin: "24px 0 24px" }}
            className="text_font-20 text_semiBold"
          >
            Разбор:
          </div>

          <div className="line tiny text_semiBold">Рациональные выборы:</div>

          <ul className="line upper-middle">
            {Object.values(fbRightChoices).map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>

          <div className="line tiny text_semiBold">
            Ловушки и их последствия:
          </div>

          <ul>
            {Object.values(fbWrongChoices).map((obj, i) => (
              <div className="line">
                <div style={{ marginBottom: "6px" }} className="text_semiBold">
                  Шаг {i + 1}
                </div>

                {Object.values(obj).map((text, j) => (
                  <li key={j}>{text}</li>
                ))}
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Practice() {
  const { id } = useParams(),
    lsKeyName = getLsKeyName(id as string),
    simulation = DATA[id]?.simulation,
    rightAnswers = simulation?.rightAnswers,
    fbRightChoices = simulation?.feedbackRightChoices,
    fbWrongChoices = simulation?.feedbackWrongChoices,
    lsChoice =
      localStorage.getItem(lsKeyName) === null
        ? []
        : JSON.parse(localStorage.getItem(lsKeyName) as string),
    [variantsIdxs, setVariantsIdxs] = useState(lsChoice),
    [activeAnalysis, setActiveAnalysis] = useState(false),
    outputNumberSteps = !lsChoice.length ? 1 : lsChoice.length + 1,
    isDone = rightAnswers?.every(
      (a: number, i: number) => a === variantsIdxs[i] + 1,
    );

  const handleClickChoice = useCallback(
    (stepIdx: number, varIdx: number) => {
      if (outputNumberSteps !== stepIdx + 1) {
        return;
      }

      const newValue = [...lsChoice];
      newValue.push(varIdx);
      localStorage.setItem(lsKeyName, JSON.stringify(newValue));
      setVariantsIdxs([...variantsIdxs, varIdx]);
    },
    [outputNumberSteps, variantsIdxs],
  );

  if (!Object.keys(DATA).includes(id as string)) {
    return <Navigate to="/" />;
  }

  return (
    <Page className="Practice">
      <div style={{ display: "flex", columnGap: "24px", marginBottom: "24px" }}>
        <Button
          onClick={() => {
            localStorage.removeItem(lsKeyName);
            setVariantsIdxs([]);
          }}
        >
          Сбросить все
        </Button>

        <Link to="/">
          <Button>Вернуться</Button>
        </Link>
      </div>

      <div style={{ width: WIDTH_CONTENT }}>
        <Briefing
          name={simulation.name}
          script={simulation.script}
          goal={simulation.goal}
          numberSteps={simulation.steps.length}
        />

        <Steps
          id={id}
          steps={simulation.steps}
          outputNumberSteps={outputNumberSteps}
          variantsIdxs={variantsIdxs}
          setVariantsIdxs={setVariantsIdxs}
          handleClickChoice={handleClickChoice}
          rightAnswers={rightAnswers}
          fbWrongChoices={fbWrongChoices}
          lsChoice={lsChoice}
        />
      </div>

      {!isDone ? null : (
        <Result
          conclusion={simulation.conclusion}
          positiveResult={simulation.positiveResult}
          activeAnalysis={activeAnalysis}
          setActiveAnalysis={setActiveAnalysis}
          fbRightChoices={fbRightChoices}
          fbWrongChoices={fbWrongChoices}
        />
      )}
    </Page>
  );
}

export default Practice;
