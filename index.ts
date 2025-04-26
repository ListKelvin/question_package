import { QuestionType, DifficultyLevel, GraphType } from "./enums";
import { AnswerValue, OptionValue, LocalizedText } from "./types";

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
  questions: IQuestion<any>[]; // Keep as a fallback for small quizzes
  questionLoader?: {
    totalQuestions: number;
    loadQuestions(startIndex: number, count: number): Promise<IQuestion<any>[]>;
  }; // Async loader for large quizzes
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
  getCurrentQuestion(): IQuestion<any> | null;
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

// For Passage, we use a dummy AnswerValue since answers are stored in subQuestions
export interface IPassageQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  passage: LocalizedText;
  subQuestions: IQuestion<any>[];
  correctAnswer: IAnswer; // Dummy answer, correctness determined by subQuestions
}

export interface IMatchQuestion
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

export interface IHotspotQuestion
  extends IQuestion<{ type: "coordinates"; value: { x: number; y: number } }> {
  imageUrl: string;
  hotspots: IOption[];
  correctAnswer: IAnswer;
}

export interface ILabelingQuestion
  extends IQuestion<{
    type: "array-labeling";
    value: Array<{ labelId: string; position: { x: number; y: number } }>;
  }> {
  imageUrl: string;
  labels: IOption[];
  correctAnswer: IAnswer;
}

export interface ICategorizeQuestion
  extends IQuestion<{
    type: "array-categorize";
    value: Array<{ itemId: string; categoryId: string }>;
  }> {
  items: IOption[];
  categories: IOption[];
  correctAnswer: IAnswer;
}

export interface IDrawQuestion
  extends IQuestion<{ type: "canvas"; value: string }> {
  correctAnswer: IAnswer;
}

export interface IOpenEndedQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  maxLength: number;
  correctAnswer: IAnswer;
}

export interface IVideoResponseQuestion
  extends IQuestion<{ type: "media"; value: string }> {
  maxDuration: number; // in seconds
  correctAnswer: IAnswer;
}

export interface IAudioResponseQuestion
  extends IQuestion<{ type: "media"; value: string }> {
  maxDuration: number; // in seconds
  correctAnswer: IAnswer;
}

export interface IPollQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  options: IOption[];
  correctAnswer: IAnswer;
}

export interface IWordCloudQuestion
  extends IQuestion<{ type: "array-word-cloud"; value: string[] }> {
  maxWords: number;
  correctAnswer: IAnswer;
}

export interface IMathResponseQuestion
  extends IQuestion<{ type: "text"; value: string }> {
  equation: LocalizedText;
  correctAnswer: IAnswer;
}

export interface IGraphingQuestion
  extends IQuestion<{
    type: "array-graphing";
    value: Array<{ x: number; y: number }>;
  }> {
  graphType: GraphType;
  dataPoints: IOption[];
  correctAnswer: IAnswer;
}
