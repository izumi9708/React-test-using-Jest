import { render, screen } from '@testing-library/react';
import App from './App';

// // テストする内容を記述、何をテストするのか
// // 例）reactのlinkがrenderされているのかどうか
// test('renders learn react link', () => {
//   // Appコンポーネントをテストする
//   render(<App />);
//   // lean reactという文字列の要素がドキュメントに存在しているかどうか
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders learn react link', () => {
  // Appコンポーネントをテストする
  render(<App />);
  const linkElement = screen.getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});