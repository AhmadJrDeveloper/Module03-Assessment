import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';



export default function ManageArticle() {
  
    const [articleData, setArticleData] = useState([])
    const [refreshPage, setRefreshPage] = useState(false);
  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/articles/article');
        console.log(response.data);
        setArticleData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refreshPage]);
    //fetching data


    

  return (
    <>
      <h1>Articles</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Body</TableCell>
            
          </TableHead>
          <TableBody>
      {articleData.map((article) => (
        article ? (
          console.log(article),
          <TableRow key={article.id}>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.author}</TableCell>
            <TableCell>{article.category}</TableCell>
            <TableCell>{article.body}</TableCell>
          </TableRow>
        ) : null
      ))}
    </TableBody>
        </Table>
      </TableContainer>


    </>
  );
}