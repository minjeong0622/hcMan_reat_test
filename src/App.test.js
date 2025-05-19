import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 외근 신청 조회 text', () => {
  render(<App />);
  const headingElement = screen.getByText(/외근 신청 조회/i); // "외근 신청 조회" 텍스트를 찾음
  expect(headingElement).toBeInTheDocument();
});
