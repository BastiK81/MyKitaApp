import React from 'react';
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./theme/globalStyles";
import {BaseOptionChartStyle} from "./forRefactoring/components/charts/BaseOptionChart";

import Router from "./Router";

function App() {
  return (
      <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
      </ThemeConfig>
  );
}

export default App;
