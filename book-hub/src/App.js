import {Component} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'

import './App.css'

class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shelf" element={<Bookshelves />} />
        <Route exact path="/books/:id" element={<BookDetails />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route element={<Navigate to="not-found" />} />
      </Routes>
    )
  }
}

export default App