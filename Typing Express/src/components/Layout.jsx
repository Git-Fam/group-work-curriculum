import React from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/global.scss';
import RandomTextAnimation from '../components/RandomTextAnimation';

import { AuthHeader } from '../components/AuthHeader.jsx';

const Layout = ({ children }) => {
  const location = useLocation(); //現在のlocationを取得
  //AuthHeaderを表示させないパスのリスト
  const noAuthHeaderPaths = ['/'];
  const shouldShowAuthHeader = !noAuthHeaderPaths.includes(location.pathname);

  //RandomTextAnimationを表示させないパスのリスト
  const noAnimationPaths = ['/practice', '/practice-start', '/practice-result'];
  const shouldShowAnimation = !noAnimationPaths.includes(location.pathname);
  return (
    <div className="layout-wrap">
      <div className="background-image-container">
        {shouldShowAnimation && (
          <div className="animation-container">
            <RandomTextAnimation />
          </div>
        )}
      </div>
      <div className="content">
        {shouldShowAuthHeader && <AuthHeader />}
        <div className="page-container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
