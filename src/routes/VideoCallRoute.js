import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import VideoChat from '../components/Backoffice/video-chat';

export default function VideoCallRoute({
  exact,
  path,
  props,
  ...rest
}) {
  return (
    <Route
      exact={exact}
      path={path} {...rest}
      render={(contentProps) => (
        <>
          <Navbar/>
          <VideoChat {...contentProps}/>
        </>
      )}
    />
  );
}
