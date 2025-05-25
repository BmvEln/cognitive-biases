export type dataPT = {
  [key: string]: {
    name: string;
    definition: string;
    realLifeExample: string | string[];
    manifestation: string | string[];
    fix: string[];
    simulation: {
      name: string;
      script: string;
      goal: string;
      positiveResult: string;
      steps: {
        name: string;
        question?: string;
        variants: string[];
        situation?: string;
      }[];
      feedbackRightChoices: {
        [key: string]: string;
      };
      rightAnswers: number[];
      feedbackWrongChoices: {
        [key: string]: string;
      }[];
      conclusion: string;
    };
  };
};
