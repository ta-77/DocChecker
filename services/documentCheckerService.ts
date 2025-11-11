
import { CheckResult } from '../types';

// This is a mock service to simulate a backend API call.
// In a real application, this would use fetch() or axios to send the file
// to a server endpoint and receive the JSON result.

export const checkDocument = (file: File): Promise<CheckResult> => {
  console.log(`Simulating check for file: ${file.name}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a potential error for demonstration
      if (file.name.toLowerCase().includes('error')) {
        reject(new Error('サーバー側で模擬エラーが発生しました。'));
        return;
      }

      const mockResult: CheckResult = {
        "documentStructure": [
          {
            "type": "paragraph",
            "text": "1. 本文のサンプルです。",
            "style": "本文",
            "errors": [
              { "type": "IndentError", "message": "1行目のインデントが指定（1.0文字）と異なります（0.0文字）。" }
            ],
            "runs": [
              { "text": "1.", "font": "Century", "errors": [] },
              { "text": " 本文のサンプルです。", "font": "MS明朝", "errors": [] }
            ]
          },
          {
            "type": "paragraph",
            "text": "これは半角数字12345です。",
            "style": "標準",
            "errors": [],
            "runs": [
              { "text": "これは半角数字", "font": "MS明朝", "errors": [] },
              {
                "text": "12345",
                "font": "ＭＳ 明朝",
                "errors": [
                  { "type": "FontError", "message": "フォントが'Century'ではありません ('ＭＳ 明朝'になっています)。" }
                ]
              },
              { "text": "です。", "font": "MS明朝", "errors": [] }
            ]
          },
           {
            "type": "paragraph",
            "text": "お客様にご確認していただく必要があります。",
            "style": "本文",
            "errors": [],
            "runs": [
              { "text": "お客様にご確認していただく必要があります。", "font": "MS明朝", "errors": [] }
            ]
          }
        ],
        "aiSuggestions": [
          { "message": "段落3の敬語表現「〜していただく」は、二重敬語の可能性があります。「ご確認いただく」または「ご確認くださいますようお願い申し上げます」などが適切です。" },
          { "message": "必須項目「日付」の記載が見つかりません。" }
        ]
      };
      
      resolve(mockResult);
    }, 1500); // Simulate a 1.5 second network delay
  });
};
