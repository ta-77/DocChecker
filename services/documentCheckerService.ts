import { CheckResult } from '../types';

/**
 * Mocks the document checking process.
 * In a real application, this would make an API call to a backend server.
 * @param file The .docx file to be checked.
 * @returns A promise that resolves with a mocked check result after a short delay.
 */
export const checkDocument = async (file: File): Promise<CheckResult> => {
  console.log('Checking document:', file.name);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mocked response based on the defined JSON structure
  const mockResult: CheckResult = {
    documentStructure: [
      {
        type: 'paragraph',
        text: '1. 本文のサンプルです。',
        style: '本文',
        errors: [
          { type: 'IndentError', message: '1行目のインデントが指定（1.0文字）と異なります（0.0文字）。' }
        ],
        runs: [
          { text: '1.', font: 'Century', errors: [] },
          { text: ' 本文のサンプルです。', font: 'MS明朝', errors: [] }
        ]
      },
      {
        type: 'paragraph',
        text: 'これは半角数字12345です。',
        style: '標準',
        errors: [],
        runs: [
          { text: 'これは半角数字', font: 'MS明朝', errors: [] },
          {
            text: '12345',
            font: 'ＭＳ 明朝',
            errors: [
              { type: 'FontError', message: "フォントが'Century'ではありません ('ＭＳ 明朝'になっています)。" }
            ]
          },
          { text: 'です。', font: 'MS明朝', errors: [] }
        ]
      },
       {
        type: 'paragraph',
        text: 'これは正しい日本語の文章です。しかし、この部分はCenturyフォントです。',
        style: '標準',
        errors: [],
        runs: [
          { text: 'これは正しい日本語の文章です。', font: 'MS明朝', errors: [] },
          {
            text: 'しかし、この部分はCenturyフォントです。',
            font: 'Century',
            errors: [
              { type: 'FontError', message: "日本語を含むテキストのフォントが'MS明朝'ではありません ('Century'になっています)。" }
            ]
          },
        ]
      },
      {
        type: 'paragraph',
        text: 'すべてが正しい段落です。',
        style: '本文',
        errors: [],
        runs: [
            { text: 'すべてが正しい段落です。', font: 'MS明朝', errors: [] }
        ]
      }
    ],
    aiSuggestions: [
      { message: '段落3の敬語表現「〜していただく」は、二重敬語の可能性があります。よりシンプルな「〜してくださる」の使用を検討してください。' },
      { message: '全体を通して専門用語が多用されています。ターゲット読者が不明な場合、より平易な言葉への言い換えを推奨します。' },
      { message: '文書の末尾に日付と担当者名の記載が見当たりません。必要に応じて追記してください。' }
    ]
  };
  
  // Simulate a random error for demonstration purposes
  // if (Math.random() > 0.8) {
  //   throw new Error('サーバーで予期せぬエラーが発生しました。');
  // }

  return mockResult;
};
