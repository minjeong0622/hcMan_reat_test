// src/services/NotificationService.js
let notifier = null;

// NotificationProvider에서 notify 함수를 등록할 때 호출
export const setNotifier = (fn) => {
  notifier = fn;
};

// axios 인터셉터나 다른 곳에서 알림을 요청할 때 사용
export const notify = (message, severity = "error") => {
  if (notifier) {
    notifier(message, severity);
  }
};
