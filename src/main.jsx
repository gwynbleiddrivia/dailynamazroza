import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


import Home from './components/Home'
import Main from './layout/Main'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main> ,
    children: [
	{
		path: "/",
		element: <Home></Home>,
	}
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<div className="max-w-7xl mx-auto">
      		<RouterProvider router={router} />
		</div>
	</QueryClientProvider>

  </React.StrictMode>,
)
