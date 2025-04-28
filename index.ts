import { QuestionType, DifficultyLevel, GraphType, AnswerType } from "./enum";
import { AnswerValue, OptionValue, LocalizedText } from "./type";

// Result Type for Error Handling
export interface IResult {
  success: boolean;
  error?: string;
}

// Answer Validator Interface
export interface IAnswerValidator {
  validate(
    userAnswer: IAnswer,
    correctAnswer: IAnswer
  ): { isCorrect: boolean; score: number };
}

// Option Interface
export interface IOption {
  id: string;
  value: OptionValue;
  label?: LocalizedText;
}

// Answer Interface
export interface IAnswer {
  questionId: string;
  value: AnswerValue;
  isCorrect: boolean;
  submittedAt?: Date;
  timeSpent?: number; // Time spent on this answer in seconds
}

// Base Question Interface with Generics
export interface IQuestion<T extends AnswerValue> {
  id: string;
  type: QuestionType;
  answerType: AnswerType;
  text: LocalizedText;
  options?: IOption[];
  correctAnswer: IAnswer;
  validator?: IAnswerValidator;
  metadata?: {
    difficulty?: DifficultyLevel;
    points?: number;
    timeLimit?: number; // in seconds
    tags?: string[];
    hint?: LocalizedText;
  };
  handleAnswer(answer: IAnswer): IResult;
}

// Quiz State Interface
export interface IQuizState {
  currentQuestionIndex: number;
  score: number;
  userAnswers: Map<string, IAnswer>;
  questions: IQuestion<AnswerValue>[];
  questionLoader?: {
    totalQuestions: number;
    loadQuestions(
      startIndex: number,
      count: number
    ): Promise<IQuestion<AnswerValue>[]>;
  };
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
  metadata?: {
    quizId: string;
    userId?: string;
    totalPointsPossible: number;
  };
}

// Quiz Game Logic Interface
export interface IQuizGame {
  state: IQuizState;
  startQuiz(): IResult;
  submitAnswer(questionId: string, userAnswer: IAnswer): IResult;
  nextQuestion(): IResult;
  previousQuestion(): IResult;
  calculateScore(): number;
  endQuiz(): IResult;
  getCurrentQuestion(): IQuestion<AnswerValue> | null;
  pauseQuiz(): IResult;
  resumeQuiz(): IResult;
  shuffleQuestions(): IResult;
  getHint(questionId: string): LocalizedText | null;
  skipQuestion(): IResult;
}

// Specific Question Interfaces
export interface IMultipleChoiceQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  options: IOption[];
  correctAnswer: IAnswer;
}

export interface IFillInTheBlankQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  correctAnswer: IAnswer;
}

export interface IReadingComprehensionQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  passage: LocalizedText;
  subQuestions: IQuestion<AnswerValue>[];
  correctAnswer: IAnswer;
}

export interface IMatchingQuestion
  extends IQuestion<{
    type: "array-match";
    value: Array<{ left: string; right: string }>;
  }> {
  pairs: Array<{ left: IOption; right: IOption }>;
  correctAnswer: IAnswer;
}

export interface IReorderQuestion
  extends IQuestion<{ type: "array-reorder"; value: Array<string | number> }> {
  items: IOption[];
  correctAnswer: IAnswer;
}

export interface IDragAndDropQuestion
  extends IQuestion<{
    type: "array-drag-and-drop";
    value: Array<{ itemId: string; targetId: string }>;
  }> {
  items: IOption[];
  targets: IOption[];
  correctAnswer: IAnswer;
}

export interface IDropDownQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  options: IOption[];
  correctAnswer: IAnswer;
}

export interface IImageHotspotQuestion
  extends IQuestion<{ type: "coordinates"; value: { x: number; y: number } }> {
  imageUrl: string;
  hotspots: IOption[];
  correctAnswer: IAnswer;
}

export interface IImageTaggingQuestion
  extends IQuestion<{
    type: "array-labeling";
    value: Array<{ labelId: string; position: { x: number; y: number } }>;
  }> {
  imageUrl: string;
  labels: IOption[];
  correctAnswer: IAnswer;
}

export interface IClassifyQuestion
  extends IQuestion<{
    type: "array-categorize";
    value: Array<{ itemId: string; categoryId: string }>;
  }> {
  items: IOption[];
  categories: IOption[];
  correctAnswer: IAnswer;
}

export interface ISurveyQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  options: IOption[];
  correctAnswer: IAnswer;
}

export interface IMathInputQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  equation: LocalizedText;
  correctAnswer: IAnswer;
}

export interface IGraphPlottingQuestion
  extends IQuestion<{
    type: "array-graphing";
    value: Array<{ x: number; y: number }>;
  }> {
  graphType: GraphType;
  dataPoints: IOption[];
  correctAnswer: IAnswer;
}
