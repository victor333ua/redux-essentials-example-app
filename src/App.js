import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Container } from '@chakra-ui/layout'
import { Header } from './features/Header'
import { PostsList } from './features/posts/PostsList'
import { NewPost } from './features/posts/NewPost'
import {ExPost} from "./features/posts/ExPost";
import { UsersList } from './features/users/UsersList.js'
import { PostsForUser } from './features/posts/PostsForUser.js'
import { NotificationsList } from './features/notifications/NotificationsList.js'

function App() {
  return (
    <Router>
      <Header />
      <Container maxW="container.sm">
          <Switch>
            <Route exact path="/">
              <PostsList />
            </Route>
            <Route exact path="/newPost" >
              <NewPost />
            </Route>
            <Route path="/exPost/:postId" >
                <ExPost />
            </Route>
            <Route exact path="/users">
              <UsersList/>
            </Route>
            <Route path="/posts/:userId">
              <PostsForUser/>
            </Route>
            <Route exact path="/notifications">
              <NotificationsList/>
            </Route>
            <Redirect to="/" />
          </Switch>
      </Container>
    </Router>
  )
};

export default App
