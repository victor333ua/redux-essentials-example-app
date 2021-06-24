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

function App() {
  return (
    <Router>
      <Header />
      <Container maxW="container.lg">
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
            <Redirect to="/" />
          </Switch>
      </Container>
    </Router>
  )
};

export default App
