export type AnswerValue =
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "boolean"; value: boolean }
  | { type: "array-reorder"; value: Array<string | number> } // For Reorder
  | {
      type: "array-drag-and-drop";
      value: Array<{ itemId: string; targetId: string }>;
    } // For Drag and Drop
  | {
      type: "array-categorize";
      value: Array<{ itemId: string; categoryId: string }>;
    } // For Classify
  | {
      type: "array-labeling";
      value: Array<{ labelId: string; position: { x: number; y: number } }>;
    } // For Image Tagging
  | { type: "array-match"; value: Array<{ left: string; right: string }> } // For Matching
  | { type: "array-graphing"; value: Array<{ x: number; y: number }> } // For Graph Plotting
  | { type: "coordinates"; value: { x: number; y: number } }; // For Image Hotspot

export type OptionValue =
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "coordinates"; value: { x: number; y: number } };

export type LocalizedText = string | { [language: string]: string };
