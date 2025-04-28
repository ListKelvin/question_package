export enum QuestionType {
  MULTI_CHOICE = "MULTI_CHOICE",
  FILL_IN_THE_BLANK = "FILL_IN_THE_BLANK",
  READING_COMPREHENSION = "READING_COMPREHENSION",
  MATCHING = "MATCHING",
  DRAG_N_DROP = "DRAG_N_DROP",
  IMAGE_HOTSPOT = "IMAGE_HOTSPOT",
  CLASSIFY = "CLASSIFY",
  REORDER = "REORDER",
  DROPDOWN = "DROPDOWN",
  IMAGE_TAGGING = "IMAGE_TAGGING",
  SURVEY = "SURVEY",
  MATH_INPUT = "MATH_INPUT",
  GRAPH_PLOTTING = "GRAPH_PLOTTING",
}

export enum AnswerType {
  OBJECTIVE = "objective",
  NON_EVALUATED = "non_evaluated",
}

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum GraphType {
  LINE = "line",
  BAR = "bar",
  SCATTER = "scatter",
}
