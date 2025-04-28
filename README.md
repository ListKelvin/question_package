# 📚 Quiz Game System

## 1. System Overview

The quiz game system is structured with clear interface definitions:

- **`IQuizGame`**  
  Controls quiz flow — starting, answering, navigating, and ending the quiz. Interacts with `IQuizState`.

- **`IQuizState`**  
  Stores the current state: questions, answers, score, time, etc.

- **`IQuestion`**  
  Defines the structure and behavior of each question.

- **`IOption`**  
  Represents selectable options for questions.

- **`IAnswer`**  
  Represents user-submitted answers.

---

## 2. Example Workflow

Suppose a quiz has three questions:

1. **Multiple Choice**: "What is OOP?" (`IMultipleChoiceQuestion`)
2. **Fill in the Blank**: "console.log() is \_\_\_" (`IFillInTheBlankQuestion`)
3. **Hotspot Question**: "Choose the appropriate algorithm" (`IHotspotQuestion`)

### Flow:

- **Start Quiz**:  
  `IQuizGame.startQuiz()` initializes `IQuizState`, sets `currentQuestionIndex = 0`.

- **Question 1**:

  - Show options: `["Paris", "London"]`
  - User selects "Paris" → Creates an `IAnswer`
  - `handleAnswer()` checks correctness, updates score

- **Next Question**:  
  `IQuizGame.nextQuestion()` increments the index.

- **Question 2**:

  - User types "Jupiter"
  - Answer is validated and score updated

- **Question 3**:

  - User clicks `{ x: 100, y: 200 }` on a hotspot map
  - System validates coordinates

- **End Quiz**:  
  `IQuizGame.endQuiz()` calculates and displays final score.

---

## 3. Core Types

### AnswerValue

Represents user answers:

```typescript
type AnswerValue =
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "boolean"; value: boolean }
  | { type: "array-reorder"; value: string[] }
  | { type: "array-drag-and-drop"; value: DragAndDropItem[] }
  | { type: "array-categorize"; value: CategorizedItem[] }
  | { type: "array-labeling"; value: LabelPosition[] }
  | { type: "array-match"; value: MatchPair[] }
  | { type: "array-graphing"; value: GraphPoint[] }
  | { type: "coordinates"; value: { x: number; y: number } };
```

### OptionValue

Defines selectable option values:

```typescript
type OptionValue =
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "coordinates"; value: { x: number; y: number } };
```

### LocalizedText

Multilingual support:

```typescript
type LocalizedText = string | { [lang: string]: string };
```

---

## 4. Enums

| Enum              | Purpose                                      |
| :---------------- | :------------------------------------------- |
| `QuestionType`    | Defines all supported question types         |
| `AnswerType`      | OBJECTIVE (graded) or NON_EVALUATED (survey) |
| `DifficultyLevel` | EASY, MEDIUM, HARD levels                    |
| `GraphType`       | LINE, BAR, SCATTER (for graph plotting)      |

---

## 5. Interfaces

### IResult

```typescript
interface IResult {
  success: boolean;
  error?: string;
}
```

### IAnswerValidator

```typescript
interface IAnswerValidator {
  validate(
    userAnswer: IAnswer,
    correctAnswer: IAnswer
  ): { isCorrect: boolean; score: number };
}
```

### IOption

```typescript
interface IOption {
  id: string;
  value: OptionValue;
  label?: LocalizedText;
}
```

### IAnswer

```typescript
interface IAnswer {
  questionId: string;
  value: AnswerValue;
  isCorrect: boolean;
  submittedAt?: Date;
  timeSpent?: number; // in seconds
}
```

### IQuestion<T extends AnswerValue>

```typescript
interface IQuestion<T extends AnswerValue> {
  id: string;
  type: QuestionType;
  answerType: AnswerType;
  text: LocalizedText;
  options?: IOption[];
  correctAnswer: T;
  validator?: IAnswerValidator;
  metadata?: QuestionMetadata;
  handleAnswer(answer: IAnswer): IResult;
}
```

### IQuizState

```typescript
interface IQuizState {
  currentQuestionIndex: number;
  score: number;
  userAnswers: Record<string, IAnswer>;
  questions: IQuestion<AnswerValue>[];
  isCompleted: boolean;
  startTime?: Date;
  endTime?: Date;
  metadata?: QuizMetadata;
}
```

### IQuizGame

```typescript
interface IQuizGame {
  startQuiz(): void;
  endQuiz(): void;
  submitAnswer(answer: IAnswer): IResult;
  nextQuestion(): void;
  previousQuestion(): void;
  skipQuestion(): void;
  calculateScore(): number;
  getCurrentQuestion(): IQuestion<AnswerValue>;
  pauseQuiz(): void;
  resumeQuiz(): void;
  shuffleQuestions(): void;
  getHint(questionId: string): string;
}
```

---

## 6. Specific Question Interfaces

| Interface                       | Question Type         | Notes                               |
| :------------------------------ | :-------------------- | :---------------------------------- |
| `IMultipleChoiceQuestion`       | MULTI_CHOICE          | Options + text answer               |
| `IFillInTheBlankQuestion`       | FILL_IN_THE_BLANK     | Text input match                    |
| `IReadingComprehensionQuestion` | READING_COMPREHENSION | Includes a passage and subQuestions |
| `IMatchingQuestion`             | MATCHING              | Match left/right pairs              |
| `IReorderQuestion`              | REORDER               | Reorder sequence                    |
| `IDragAndDropQuestion`          | DRAG_N_DROP           | Drag items to targets               |
| `IDropDownQuestion`             | DROPDOWN              | Dropdown selection                  |
| `IImageHotspotQuestion`         | IMAGE_HOTSPOT         | Click on coordinates                |
| `IImageTaggingQuestion`         | IMAGE_TAGGING         | Tag points on an image              |
| `IClassifyQuestion`             | CLASSIFY              | Categorize items                    |
| `ISurveyQuestion`               | SURVEY                | No grading (non-evaluated)          |
| `IMathInputQuestion`            | MATH_INPUT            | Math input field                    |
| `IGraphPlottingQuestion`        | GRAPH_PLOTTING        | Graph plotting points               |

---

## 7. Key Changes and JSON Alignment

- Only **objective** and **survey** question types supported.
- Enum values strictly match backend JSON fields (`code`, `answer_type`).
- Removed all `any` usages, replaced by **strict typing** with `AnswerValue`.
- Backend naming and structure fully aligned for seamless integration.

---

## 8. How It Works Together

- **Quiz Flow**: `IQuizGame` manages the game; `IQuizState` tracks real-time data.
- **Automatic Grading**: Objective questions graded via `IAnswerValidator`.
- **Survey Support**: Survey questions are recorded but not graded.
- **Strong Typing**: Generics ensure each question enforces correct answer types.
