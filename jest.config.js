module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios)" // axios와 같은 ESM 패키지 처리
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom"
  };