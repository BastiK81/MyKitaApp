import React from 'react';
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./theme/globalStyles";
import {BaseOptionChartStyle} from "./forRefactoring/components/charts/BaseOptionChart";

import Router from "./Router";
import BackendProvider from "./services/BackendProvider";
import UserProvider from "./services/UserProvider";
import KitaProvider from "./services/KitaProvider";
import ChildrenProvider from "./services/psChildProvider";
import GroupProvider from "./services/GrouopProvider";
import ConnectorProvider from "./services/ConnectorProvider";
import NotificationProfider from "./services/NotificationProfider";

function App() {

    return (
        <ThemeConfig>
            <ScrollToTop/>
            <GlobalStyles/>
            <BaseOptionChartStyle/>
            <BackendProvider>
                <UserProvider>
                    <KitaProvider>
                        <GroupProvider>
                            <ChildrenProvider>
                                <ConnectorProvider>
                                    <NotificationProfider>
                                        <Router/>
                                    </NotificationProfider>
                                </ConnectorProvider>
                            </ChildrenProvider>
                        </GroupProvider>
                    </KitaProvider>
                </UserProvider>
            </BackendProvider>
        </ThemeConfig>
    );
}

export default App;
