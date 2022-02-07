import React from 'react';
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./theme/globalStyles";
import {BaseOptionChartStyle} from "./forRefactoring/components/charts/BaseOptionChart";

import Router from "./Router";
import BackendProvider from "./services/BackendProvider";
import UserProvider from "./services/UserProvider";
import PlaySchoolProvider from "./services/PlaySchoolProvider";
import ChildrenProvider from "./services/psChildProvider";
import GroupProvider from "./services/GrouopProvider";

function App() {
    return (
        <ThemeConfig>
            <ScrollToTop/>
            <GlobalStyles/>
            <BaseOptionChartStyle/>
            <BackendProvider>
                <UserProvider>
                    <PlaySchoolProvider>
                        <GroupProvider>
                            <ChildrenProvider>
                                <Router/>
                            </ChildrenProvider>
                        </GroupProvider>
                    </PlaySchoolProvider>
                </UserProvider>
            </BackendProvider>
        </ThemeConfig>
    );
}

export default App;
